import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import ViewContainer from "~/components/the-revised-landlords-game/ViewContainer";
import WrappedGameView from "~/components/the-revised-landlords-game/WrappedGameView";


export default component$(() => {
    const gameId = useLocation().params.gameId
    return (
        <>
            <WrappedGameView gameId={gameId}/>
        </>
    );
});
