import { component$ } from "@builder.io/qwik";
import { Form, Link, useLocation } from "@builder.io/qwik-city";
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
            <Link
                class="btn btn-primary ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto"
                onClick$={() => {signIn.submit({providerId: "debian-salsa"})}}>
                Login
            </Link>
        </>
    }
});
