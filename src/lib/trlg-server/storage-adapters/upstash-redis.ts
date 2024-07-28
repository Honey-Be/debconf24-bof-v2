import { Redis } from "@upstash/redis"
import type { ActorStorageJSON, StorageAdapter } from "../storage";
import { loadStoragePool } from "socketio.config";
import { AsyncActorStorage } from "../actors";


const jsonPool: {
    [gameId: string]: ActorStorageJSON
} = {}

const redis = new Redis({
    url: process.env.NEXT_UPSTASH_REDIS_REST_URL,
    token: process.env.NEXT_UPSTASH_REDIS_REST_TOKEN
})

export async function getGameIdList() {
    const id_list = await redis.json.get<string[]>("id", "$") ?? []
    return id_list
}



export default class UpstashRedisAdapter implements StorageAdapter<true> {
    private gameId: string
    private  constructor(gameId: string, initialJSON: ActorStorageJSON) {
        this.gameId = gameId
        jsonPool[gameId] = initialJSON
    }
    public async load(): Promise<"OK" | null> {
        const got = await redis.json.get<ActorStorageJSON>("session", `$.${this.gameId}`)
        if(got !== null) {
            jsonPool[this.gameId] = {
                initialized: got.initialized,
                snapshotJSON: got.snapshotJSON,
                playerAccounts: [...got.playerAccounts]
            }
            return "OK"
        } else {
            return await redis.json.set("session", `$.${this.gameId}`,jsonPool[this.gameId])
        }
    }

    public async persist(persistedSnapshot: string): Promise<"OK" | null> {
        jsonPool[this.gameId].snapshotJSON = persistedSnapshot
        if(!(jsonPool[this.gameId].initialized)) {
            jsonPool[this.gameId].initialized = true
        }
        return await redis.json.set("session", `$.${this.gameId}`,jsonPool[this.gameId])
    }

    public get json(): ActorStorageJSON {
        return {
            initialized: jsonPool[this.gameId].initialized,
            snapshotJSON: jsonPool[this.gameId].snapshotJSON,
            playerAccounts: [...jsonPool[this.gameId].playerAccounts]
        }
    }

    public get isInitialized() {
        return jsonPool[this.gameId].initialized
    }

    public get jsonLoaded() {
        return (this.gameId in jsonPool)
    }

    public static async loadStorage(gameId: string): Promise<void> {
        const adapter = await (async () => {
            const adp = new UpstashRedisAdapter(gameId, {
                initialized: false,
                playerAccounts: ["", "", "", ""],
                snapshotJSON: ""
            })
            await adp.load()
            return adp
        })()
        loadStoragePool(gameId,await AsyncActorStorage.assign(gameId, adapter))
    }

    public static async randgenGameId(): Promise<string> {
        const got = (await redis.json.get<string[]>("id", "$")) ?? []
        let generated: string
        do {
            generated = Array.from(crypto.getRandomValues(new Uint32Array(1))).map((item) => item.toString(36)).join("").toLowerCase()
        } while(got.includes(generated))
        return generated
    }

    public static async tryPreInit(gameId: string, p0: string, p1: string, p2: string, p3: string) {
        const got = (await redis.json.get<string[]>("id", "$")) ?? []
        if (got.length < 1) {
            await redis.json.set("id", "$",Array.from([gameId]))
        } else if (got.includes(gameId)) {
            return
        }
        await redis.json.arrappend("id", "$", gameId)

        const preInit: ActorStorageJSON = {
            initialized: false,
            snapshotJSON: "",
            playerAccounts: [p0 ,p1, p2, p3]
        }
        await redis.json.set("session", `$.${gameId}`, preInit)
    }
}