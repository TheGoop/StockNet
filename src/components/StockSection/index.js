import React, {useState} from 'react'
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

const StockSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
    }
    return (
        <>
        <Stock/>
        <HeroContainer id='home'>
            <HeroBg>
            </HeroBg>
            <HeroContent>
                <HeroH1>Stocks. Friends. Networking. All in one place.</HeroH1>
                <HeroP>
                    Sign up for a new account and connect with others to dive
                    into the stock market together!
                </HeroP>
                <HeroButtonWrapper>
                    <Button 
                    to="signup" 
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary='true'
                    dark='true'
                    smooth={true} duration={500} spy={true}
                            exact='true' offset={0}>
                        Get started {hover ? <ArrowForward /> : <ArrowRight
                       />} 
                    </Button>
                </HeroButtonWrapper>
            </HeroContent>
        </HeroContainer>
        </>
    )
}

export default StockSection
