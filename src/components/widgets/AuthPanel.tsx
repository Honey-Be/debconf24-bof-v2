import { component$ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import WrappedGameControlView from "~/components/the-revised-landlords-game/WrappedGameControlView";
import { useSession, useSignIn, useSignOut } from "~/routes/plugin@auth";

export default component$(() => {
    const session = useSession()
    const signIn = useSignIn()
    const signOut = useSignOut()

    if(session.value) {
        return <>
            <div class="hover:text-link dark:hover:text-white px-4 py-3 flex items-centers">
                {session.value.user?.email}
            </div>
            <button
                class="btn btn-primary ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto"
                onClick$={() => {signOut.submit({})}}>
                Logout
            </button>
        </>
    } else {
        return <>
            <button
                class="btn btn-primary ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto"
                onClick$={() => {signIn.submit({providerId: "github"})}}>
                Login
            </button>
        </>
    }
    
})