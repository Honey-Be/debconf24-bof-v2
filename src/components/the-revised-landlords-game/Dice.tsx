import { component$ } from "@builder.io/qwik";
import type { ChanceCardKindType, DiceType } from "~/lib/trlg-client/types";

export interface DiceProps {
    value: DiceType | null
}
export default component$<DiceProps>(({value}) => {
    return (
        <svg width="25.959mm" height="25.959mm" version="1.1" viewBox="0 0 25.959 25.959" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-81.441 -144.2)" stroke-linecap="round" stroke-linejoin="round">
                <rect x="81.574" y="144.33" width="25.695" height="25.695" rx="2.187" ry="2.187" fill="#fff" stroke="#000" stroke-width=".26458"/>
                {(value !== null) && <g stroke="#6a6a6a" stroke-width=".52917">
                    {value === 1 ? <>
                        <ellipse cx="94.421" cy="157.18" rx="2.1839" ry="2.1839" stroke="#6a6a6a" stroke-width=".52917"/>
                    </> : value === 2 ? <>
                        <ellipse cx="94.421" cy="162.47" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="94.421" cy="151.88" rx="2.1839" ry="2.1839"/>
                    </> : value === 3 ? <>
                        <ellipse cx="94.421" cy="157.18" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="89.129" cy="162.47" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="151.88" rx="2.1839" ry="2.1839"/>
                    </> : value === 4 ? <>
                        <ellipse cx="89.129" cy="162.47" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="151.88" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="89.129" cy="151.88" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="162.47" rx="2.1839" ry="2.1839"/>
                    </> : value === 5 ? <>
                        <ellipse cx="94.421" cy="157.18" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="89.129" cy="162.47" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="151.88" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="89.129" cy="151.88" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="162.47" rx="2.1839" ry="2.1839"/>
                    </> : value === 6 ? <>
                        <ellipse cx="89.129" cy="162.47" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="89.129" cy="151.88" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="162.47" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="151.88" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="89.129" cy="157.18" rx="2.1839" ry="2.1839"/>
                        <ellipse cx="99.713" cy="157.18" rx="2.1839" ry="2.1839"/>
                    </> : <></>}
                </g>}
            </g>
        </svg>
    )
})