import { component$, useSignal } from "@builder.io/qwik";
import { getOwnerStyle } from "~/lib/trlg-client/component-utils";

export const Industrial = component$<{status: {amount: number, operatorId: 0|1|2|3}, transform?: string}>(({status: {amount, operatorId}, transform}) => {
    return (<g style={getOwnerStyle(operatorId)} transform={transform}>
        <rect
            style="stroke-width:2.42698;stroke-linejoin:round;stroke-dasharray:4.85399, 4.85399"
            id="rect12211-8-1-4-4"
            width="25.802689"
            height="10.30269"
            x="601.68872"
            y="794.77301" visibility={(amount >= 1 ? "visible" : "hidden")}/>
    </g>)
})