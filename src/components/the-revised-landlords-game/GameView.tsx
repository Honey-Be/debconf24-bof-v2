import { component$, useContext } from "@builder.io/qwik";
import type { SerializedLandProperties } from "~/lib/trlg-client/component-utils";
import { mapQuadruplet, type SerializedGameContext } from "~/lib/trlg-client/types";
import { GameBoard } from "./GameBoard";
import { TRLGSocketContext } from "~/context/socket/TRLGSocketContext";
import StatusDisplay from "./StatusDisplay";
import ViewContainer from "./ViewContainer";

export default component$(() => {
    const context = useContext(TRLGSocketContext)
    const isOnline = context.isOnline.value
    const gameContext = context.gameContext.value
    const {
        mainStatuses: {
            players,
            govIncome,
            landProperties
        },
        fund,
    } = gameContext
    const pls = mapQuadruplet(players,(player) => player.location)

    const nowPlayerAccount = context.nowPlayerAccount.value

    return <ViewContainer>
        <div q:slot="left-side">
            <GameBoard 
                p0={pls[0]}
                p1={pls[1]}
                p2={pls[2]}
                p3={pls[3]}
                govIncome={govIncome}
                fund={fund}
                landProperties={landProperties}
                isOnline={isOnline} />
        </div>
        <div q:slot="right-side">
            <StatusDisplay
                gameContext={gameContext}
                nowPlayerAccount={nowPlayerAccount}
                isOnline={isOnline} />
        </div>
    </ViewContainer>
})