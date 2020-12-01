import React, { useState } from 'react'
import Stock from './Stock'
import { PageSetup, PostSetup } from './StockStyling'
import './StockStyling.css'
import '../Multibutton/Multibutton2.css'
import Posts from './PostPreviews/posts'

import {
    useParams
} from "react-router-dom";

const StockSection = () => {
    const [hover, setHover] = useState(false);
    const [postAmount, setPostAmount] = useState(0)
    let { ticker } = useParams()

    const Submit = () => {
        window.location.href = `/${ticker}/submit`
    }

    const Load = () => {
        setPostAmount(postAmount + 1)
    }
    //Need Fetch data here, then pass over props down to individual messages

    return (
        <div>
            <PageSetup>
                {/* <HeroBg>
            </HeroBg> */}
                <div id="stockbox">
                    <Stock />
                </div>
            
                <PostSetup>
                <div className="multi-button2">
                    <button onClick={Submit}> Submit New Post </button>
                    <button onClick={Load}> Load More Posts </button>
                </div>
                <Posts postAmount={postAmount}/>
                </PostSetup>

                {/*Fetch posts IN REACT STATE
                <Posts s
                user={} 
                title={}
                content={} 
                flair={}
                upvotes={}
                postID={}
                time={}/> */}

            </PageSetup>
            {/* We need to include the messages here */}
        </div>
    )
}

export default StockSection
