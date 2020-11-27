import React, { useState } from 'react'
import { Button } from '../ButtonElements'
import Stock from './Stock'
import {
    HeroContainer,
    HeroBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroButtonWrapper,
    ArrowForward,
    ArrowRight
} from './HeroElements'
import { PageSetup } from './StockStyling'

const StockSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
    }
    return (
        <PageSetup>
            {/* <HeroBg>
            </HeroBg> */}
            <Stock />
            {/* <HeroContent>
                <HeroP>
                    Sign up for a new account and connect with others to dive
                    into the stock market together!
                </HeroP>
            </HeroContent> */}
        </PageSetup>
    )
}

export default StockSection
