import { PluginOption } from "vite";


import * as TRLG from "~/lib/trlg-server/exports"
import UpstashRedisAdapter from '~/lib/trlg-server/storage-adapters/upstash-redis'
import { EventType } from '~/lib/trlg-server/machine'

import {Server, Socket} from "socket.io"


const storagePool: {
    [gameId: string]: TRLG.AsyncActorStorage<UpstashRedisAdapter>
} = {}

export function loadStoragePool(gameId: string, storage: TRLG.AsyncActorStorage<UpstashRedisAdapter>) {
    storagePool[gameId] = storage
}


function getGameContext(gameId: string) {
    let st: string, gc: TRLG.SerializedGameContext, npa: string
    if(storagePool[gameId] !== undefined) {
      const serialized = storagePool[gameId].serializedGameContext
      st = serialized.state
      gc = serialized.gameContext
      npa = serialized.nowPlayerAccount
    } else {
      return null
    }
    return {st,gc,npa}
}
  
async function onCommand(io: Server, gameId: string, event: EventType, socket: Socket) {
    if(storagePool[gameId] !== undefined) {
      await storagePool[gameId].trigger(event)
      
      io.of("/trlg").to(`${gameId}`).emit("refresh", storagePool[gameId].serializedGameContext)
    }
}


const trlgClientsInfo: {[id: string]: TRLG.ClientInfoEntry} = {}

  
function attachGrantedSocket(io: Server, socket: Socket) {
    const clientInfo = trlgClientsInfo[socket.id]
    if(clientInfo === undefined) {
        return
    }
    const {gameId} = clientInfo
  
    socket.on("pickTargetGroup", async ({targetGroup}: {targetGroup: TRLG.CityGroupType}) => {
        await onCommand(io, gameId,{type: "pickTargetGroup", targetGroup: targetGroup},socket)
    })
  
    socket.on("pickTargetLocation", async ({targetLocation}: {targetLocation: number}) => {
        await onCommand(io, gameId,{type: "pickTargetLocation", targetLocation} ,socket)
    })
  
    socket.on("thanksToLawyer", async () => {
        await onCommand(io, gameId,{type: "thanksToLawyer"} ,socket)
    })
  
    socket.on("showMeTheMONEY", async () => {
        await onCommand(io, gameId,{type: "showMeTheMONEY"} ,socket)
    })
  
    socket.on("rollDice", async () => {
        await onCommand(io, gameId,{type: "rollDice"} ,socket)
    })
  
    socket.on("tryLotto", async ({choice}: {choice: TRLG.LottoChoiceType}) => {
        await onCommand(io, gameId,{type: "tryLotto", choice} ,socket)
    })
  
    socket.on("stopLotto", async () => {
        await onCommand(io, gameId,{type: "stopLotto"} ,socket)
    })
  
    socket.on("sell", async ({targets}: {targets: {location: number, amount: number}[]}) => {
        await onCommand(io, gameId,{type: "sell", targets} ,socket)
    })
  
    socket.on("startlotto", async ({useDoubleLottoTicket}: {useDoubleLottoTicket: boolean}) => {
        await onCommand(io, gameId,{type: "startLotto", useDoubleLottoTicket} ,socket)
    })
  
    socket.on("nop", async () => {
        await onCommand(io, gameId,{type: "nop"} ,socket)
    })
  
    socket.on("purchase", async ({amount}: {amount: number}) => {
        await onCommand(io, gameId,{type: "purchase", value: {amount}} ,socket)
    })
  
    socket.on("pickTargetPlayer", async () => {
        await onCommand(io, gameId,{type: "pickTargetPlayer"} ,socket)
    })
  
    socket.on("useTicket", async () => {
        await onCommand(io, gameId,{type: "useTicket"} ,socket)
    })
  
    socket.on("noticeChecked", async () => {
        await onCommand(io, gameId,{type: "noticeChecked"} ,socket)
    })
}
  
function onTRLGConnection(io: Server, socket: Socket) {
    console.log(`${socket.id} is connected.`)
    socket.on("joinRoom", ({gameId}: {gameId: string}) => {
        if(gameId in storagePool && storagePool[gameId].jsonLoaded) {
            socket.emit("joinSucceed")
        } else {
            socket.emit("joinFailed", {msg: `room ${gameId} not found :(`})
            return
        }
        socket.join(`${gameId}`)
        trlgClientsInfo[socket.id] = { account: null, gameId, grant: null }
        console.log(`socket ${socket.id} has connected to ${gameId}`)
    })
  
    socket.on("requestRefresh", async ({gameId}: {gameId: string}) => {
        const context = await getGameContext(gameId)
        if(context !== null) {
            socket.emit("refresh", {state: context.st, gameContext: context.gc, nowPlayerAccount: context.npa})
        }
    })
  
    socket.on("grant", ({gameId, account}: {gameId: string, account: string}) => {
        const tmp = storagePool[gameId].findPid(account)
        if(tmp === null) {
            socket.emit("playNotGranted")
        } else {
            trlgClientsInfo[socket.id].grant = tmp
            attachGrantedSocket(io, socket)
            socket.emit("playGranted", {pid: tmp})
        }
    })
}

import {vitePluginSocketIO} from "./vite-plugin-socket-io"

export default vitePluginSocketIO({
    serverEvents: (io, socketEvents) => {
        io.of("/trlg").on("connection",(socket) => {socketEvents})
    },
    socketEvents: (io, socket) => {
        onTRLGConnection(io, socket)
    }
})