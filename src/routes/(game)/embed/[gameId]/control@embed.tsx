import { component$ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import WrappedGameControlView from "~/components/the-revised-landlords-game/WrappedGameControlView";
import { useSession, useSignIn } from "~/routes/plugin@auth";


export default component$(() => {
    const gameId = useLocation().params.gameId
    const session = useSession()
    const signIn = useSignIn()

    if(session.value) {
        <WrappedGameControlView gameId={gameId} session={session.value}/>
    } else {
        return <>
            <p>You need to login first.</p>
            <Form action={signIn}>
                <input type="hidden" name="providerId" value="github" />
                <button>Sign In</button>
            </Form>
        </>
    }
});
