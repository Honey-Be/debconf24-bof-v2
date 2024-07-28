import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import ViewContainer from "~/components/the-revised-landlords-game/ViewContainer";
import { useSession } from "~/routes/plugin@auth";


export default component$(() => {
    const gameId = useLocation().params.gameId

    const session = useSession()
    return (
        <>
            <ViewContainer>
                <div q:slot="left-side">
                    <div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 lg:justify-start lg:m-0 lg:max-w-7xl">
                        <div class="flex w-full sm:w-auto">
                            <a class="btn btn-primary sm:mb-0 w-full"
                                href={`https://debconf24-bof.newsniper.org/game/${gameId}/watch`}
                                target="_blank"
                                rel="noopener">Watch this game</a>
                        </div>
                    </div>
                </div>
                <div q:slot="right-side" style={{height: 616, width: 473.92}}>
                    <div class="flex w-full sm:w-auto">
                        {session.value?.user?.email ? <a class="btn btn-primary sm:mb-0 w-full"
                            href={`https://debconf24-bof.newsniper.org/game/${gameId}/play`}
                            target="_blank"
                            rel="noopener">Join this game</a> : <p>You should login to join the game</p>}
                    </div>
                </div>
            </ViewContainer>
        </>
    );
});
