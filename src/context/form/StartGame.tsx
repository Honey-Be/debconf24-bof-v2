import { $, component$, QRL } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { formAction$, InitialValues, SubmitHandler, useForm, validate, valiForm$ } from "@modular-forms/qwik";

import * as v from "valibot"
import UpstashRedisAdapter from "~/lib/trlg-server/storage-adapters/upstash-redis";



export const StartGameSchema = v.object({
    host:v.pipe(
        v.string(),
        v.nonEmpty(`Please enter guest 1's email.`),
        v.email('The email address is badly formatted.'),
    ),   
    guest1: v.pipe(
        v.string(),
        v.nonEmpty(`Please enter guest 1's email.`),
        v.email('The email address is badly formatted.'),
    ),   
    guest2: v.pipe(
        v.string(),
        v.nonEmpty(`Please enter guest 1's email.`),
        v.email('The email address is badly formatted.'),
    ),   
    guest3: v.pipe(
        v.string(),
        v.nonEmpty(`Please enter guest 1's email.`),
        v.email('The email address is badly formatted.'),
    ),
    gameId: v.pipe(
        v.string(),
        v.regex(new RegExp(/(([a-z0-9])(([a-z0-9]|-)*([a-z0-9]))?)/)),
    )
})

export type StartGameForm = v.InferInput<typeof StartGameSchema>

const SHUFFLE_LUT = {
    0: [0,1,2,3] as const,
    1: [0,1,3,2] as const,
    2: [0,2,1,3] as const,
    3: [0,2,3,1] as const,
    4: [0,3,2,1] as const,
    5: [0,3,1,2] as const,

    6: [1,0,2,3] as const,
    7: [1,0,3,2] as const,
    8: [1,2,0,3] as const,
    9: [1,2,3,0] as const,
    10: [1,3,2,0] as const,
    11: [1,3,0,2] as const,

    12: [2,0,1,3] as const,
    13: [2,0,3,1] as const,
    14: [2,1,0,3] as const,
    15: [2,1,3,0] as const,
    16: [2,3,1,0] as const,
    17: [2,3,0,1] as const,
    
    18: [3,0,1,2] as const,
    19: [3,0,2,1] as const,
    20: [3,1,0,2] as const,
    21: [3,1,2,0] as const,
    22: [3,2,1,0] as const,
    23: [3,2,0,1] as const,
}

type ShuffleLUTIdxType = keyof typeof SHUFFLE_LUT

function shufflePlayers(playerAccounts: [string, string, string, string]): typeof playerAccounts {
    const rnd = crypto.getRandomValues(new Uint8Array(1))[0] % 24 as ShuffleLUTIdxType
    const picked = SHUFFLE_LUT[rnd]
    return [playerAccounts[picked[0]], playerAccounts[picked[1]], playerAccounts[picked[2]], playerAccounts[picked[3]]]
}


export const randomGenerateGameId = routeAction$(async () => {
    const generated: string = await UpstashRedisAdapter.randgenGameId()
    return {
        generated
    }
})


export const startGameAction = formAction$<StartGameForm>(async (values) => {
    // Runs on server
    const {host, guest1,guest2,guest3} = values
    const gameId = values.gameId
    const [p0, p1, p2, p3] = shufflePlayers([host,guest1,guest2,guest3])
    UpstashRedisAdapter.tryPreInit(gameId,p0,p1,p2,p3)
}, valiForm$(StartGameSchema));


export const startGameFormLoader = routeLoader$<InitialValues<StartGameForm>>(() => ({
    host: "",
    guest1: "",
    guest2: "",
    guest3: "",
    gameId: ""
}))

export default component$(({hostEmail}: {hostEmail: string}) => {
    const [startGameForm, {Form, Field}] = useForm<StartGameForm>({
        loader: startGameFormLoader(),
        action: startGameAction(),
        validate: valiForm$(StartGameSchema)
    })

    const handleSubmit: QRL<SubmitHandler<StartGameForm>> = $((values, _) => {
        // Runs on client
        console.log(values);
    })

    const rndGenGid = randomGenerateGameId()

    const generatedGid = rndGenGid.value?.generated

    return (generatedGid) ? (
        <Form onSubmit$={handleSubmit}>
            <Field name="host">
                {(field, props) => <>
                    <label>Host email: </label>
                    <div>
                        <input {...props} type="email" value={hostEmail} readOnly />
                        {field.error && <div>{field.error}</div>}
                    </div>
                </>}
            </Field>
            <Field name="guest1">
                {(field, props) => <>
                    <label>Guest 1 email: </label>
                    <div>
                        <input {...props} type="email" value={field.value} />
                        {field.error && <div>{field.error}</div>}
                    </div>
                </>}
            </Field>
            <Field name="guest2">
                {(field, props) => <>
                    <label>Guest 2 email: </label>
                    <div>
                        <input {...props} type="email" value={field.value} />
                        {field.error && <div>{field.error}</div>}
                    </div>
                </>}
            </Field>
            <Field name="guest3">
                {(field, props) => <>
                    <label>Guest 3 email: </label>
                    <div>
                        <input {...props} type="email" value={field.value} />
                        {field.error && <div>{field.error}</div>}
                    </div>
                </>}
            </Field>
            <Field name="gameId">
                {(_, props) => <>
                    <input {...props} type="text" value={generatedGid} readOnly />
                </>}
            </Field>
        </Form>
    ) : <></>
})