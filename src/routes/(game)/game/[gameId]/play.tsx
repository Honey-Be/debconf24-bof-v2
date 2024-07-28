import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import WrappedGameControlView from "~/components/the-revised-landlords-game/WrappedGameControlView";
import { useSession } from "~/routes/plugin@auth";


export default component$(() => {
    const gameId = useLocation().params.gameId
    const session = useSession()
    
    if(session.value) {
        <WrappedGameControlView gameId={gameId} session={session.value}/>
    } else {
        return <p>You need to login first.</p>
    }
});
