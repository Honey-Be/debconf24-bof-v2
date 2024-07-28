import { component$ } from "@builder.io/qwik";
import type { ChanceCardKindType } from "~/lib/trlg-client/types";
import { CHANCE_CARD_DISPLAY_CONTENTS } from '~/lib/trlg-client/chance-card-defs';

export interface ChanceCardDisplayProps {
    chanceKind: ChanceCardKindType | null
}
export default component$<ChanceCardDisplayProps>(({chanceKind}) => {
    if(chanceKind == null) {
        return (
            <svg width="127mm" height="71.438mm" version="1.1" viewBox="0 0 127 71.438" xmlns="http://www.w3.org/2000/svg" filter="grayscale(100%)">
                <g transform="translate(-25 -113.65)" stroke-linejoin="round">
                    <g>
                        <rect x="25" y="113.65" width="127" height="71.438" fill="#cf6547" stroke-width=".69244"/>
                        <rect x="25" y="113.65" width="127" height="18.884" fill="#f0dfac" stroke-width=".35601"/>
                        
                        <rect x="42.93" y="151.3" width="91.14" height="1.3805" fill="#8f2d34" stroke-width=".081544"/>
                        <rect x="25" y="172.1" width="127" height="12.992" fill="#f0dfac" stroke-width=".2953"/>
                    </g>
                    <rect x="27.559" y="116.31" width="121.88" height="66.121" fill="none" stroke="#8f2d34" stroke-width=".52917"/>
                    
                </g>
            </svg>
        )
    }
    const {
        head, exerpt, detail, additional
    } = CHANCE_CARD_DISPLAY_CONTENTS[chanceKind]

    return (
        <svg width="127mm" height="71.438mm" version="1.1" viewBox="0 0 127 71.438" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-25 -113.65)" stroke-linejoin="round">
                <g>
                    <rect x="25" y="113.65" width="127" height="71.438" fill="#cf6547" stroke-width=".69244"/>
                    <rect x="25" y="113.65" width="127" height="18.884" fill="#f0dfac" stroke-width=".35601"/>
                    <g font-family="'Noto Sans'" text-anchor="middle">
                        <text x="88.955093" y="126.87325" fill="#c44b4a" font-size="8.4667px" font-weight="bold" stroke-width=".24095" text-align="center" style="line-height:0.833334px" xml:space="preserve">
                            <tspan x="88.955093" y="126.87325" fill="#c44b4a" font-size="8.4667px" stroke-width=".24095">{head}</tspan>
                        </text>
                        <text x="88.820251" y="138.68816" fill="#ffffff" font-size="4.2333px" stroke-width=".13626" text-align="center" style="line-height:4.87563px" xml:space="preserve">
                            {(exerpt.length > 0) && <tspan x="88.820251" y="138.68816">{exerpt[0]}</tspan>}
                            {(exerpt.length > 1) && <tspan x="88.820251" y="143.62781">{exerpt[1]}</tspan>}
                            {(exerpt.length > 2) && <tspan x="88.820251" y="148.56747">{exerpt[2]}</tspan>}
                        </text>
                        <text x="88.820251" y="158.9072" fill="#ffffff" font-size="4.2333px" stroke-width=".13626" text-align="center" style="line-height:4.87563px" xml:space="preserve">
                            {(detail.length > 0) && <tspan x="88.820251" y="158.9072">{detail[0]}</tspan>}
                            {(detail.length > 1) && <tspan x="88.820251" y="163.84685">{detail[1]}</tspan>}
                            {(detail.length > 2) && <tspan x="88.820251" y="168.78651">{detail[2]}</tspan>}
                        </text>
                    </g>
                    <rect x="42.93" y="151.3" width="91.14" height="1.3805" fill="#8f2d34" stroke-width=".081544"/>
                    <rect x="25" y="172.1" width="127" height="12.992" fill="#f0dfac" stroke-width=".2953"/>
                </g>
                <rect x="27.559" y="116.31" width="121.88" height="66.121" fill="none" stroke="#8f2d34" stroke-width=".52917"/>
                {(additional !== undefined) && <text x="88.820251" y="175.82492" fill="#000000" font-family="'Noto Sans'" font-size="3" stroke-width=".13626" text-align="center" text-anchor="middle" style="line-height:4.87563px" xml:space="preserve">
                    {(additional.length > 0) && <tspan x="88.820251" y="175.82492">{additional[0]}</tspan>}
                    {(additional.length > 1) && <tspan x="88.820251" y="180.76457">{additional[1]}</tspan>}
                </text>}
                
            </g>
        </svg>
    )
})