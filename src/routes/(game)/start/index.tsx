import { component$ } from "@builder.io/qwik";
import ViewContainer from "~/components/the-revised-landlords-game/ViewContainer";
import { Image } from "@unpic/qwik";
import { Form } from "@builder.io/qwik-city";
import StartGame from "~/context/form/startGame";
import { useSession } from "~/routes/plugin@auth";

const coverImage =
  "https://i.imgur.com/rOezOHI.png";




export default component$(() => {
    const session = useSession()
    if(session.value?.user?.email) {
        return (
            <>
                <ViewContainer>
                <div q:slot="left-side">
                    <StartGame hostEmail={session.value.user.email}/>
                </div>
                <div q:slot="right-side" style={{width:493, height: 616}}>
                    <Image
                        src={coverImage}
                        layout="constrained"
                        width={493}
                        height={616}
                        alt="Qwind Hero Image (Cool dog)"
                        class="mx-auto lg:mr-0 w-full drop-shadow-2xl rounded-md"
                        priority={true}
                        breakpoints={[320, 480, 640, 768, 1024]}
                        />
                </div>
                </ViewContainer>
            </>
        );
    } else {
        return <>
            <div>You need to login. If your email address is not open in Debian Salsa, open it before login.</div>
        </>
    }
});
