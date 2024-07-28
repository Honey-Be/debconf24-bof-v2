import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
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

            <Form action={signOut}>
                <input type="hidden" name="redirectTo" value="/" />
                <button class="btn btn-primary ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto">Logout</button>
            </Form>
        </>
    } else {
        return <>
            <Form action={signIn}>
                <input type="hidden" name="providerId" value="debian-salsa" />
                <button class="btn btn-primary ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto">Login</button>
            </Form>
        </>
    }
    
})