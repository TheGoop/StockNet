import React, { useState } from 'react'
import { Button } from '../ButtonElements'
import Stock from './Stock'
import { PageSetup, PostSetup } from './StockStyling'
import './StockStyling.css'
import Posts from '../PostPreviews/posts'

let temptest = [
    {
        user: 'Brandon',
        title: 'CS ROCKS!!!',
        content: 'Switch to CS rn!!!',
        flair: 'Discussion',
        upvotes: -69,
        postID: 'X86',
        time: 'Dec 4 2020, 12:19 PM'
    },
    {
        user: 'Taylor',
        title: 'OMG filthy CS MAJORS',
        content: 'Switch to EE rn!!!',
        flair: 'News',
        upvotes: 420,
        postID: 'X86',
        time: 'Dec 4 2020, 12:19 PM'
    },
    {
        user: 'Neil Vaishamshayasmapayn',
        title: 'Donec ultrices nisl in ligula euismod lobortis?',
        content: 'In in volutpat nisl. Etiam id sem non nisl tincidunt rutrum in hendrerit sapien. Aliquam finibus ante id sapien dictum, et sodales est ultrices. Integer lacinia lobortis nibh, non posuere diam pretium',
        flair: 'Lmao you think this is a flair',
        upvotes: 1284,
        postID: 'X86',
        time: 'Dec 8888, 12:19 PM'
    }
]

const StockSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
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
                <Posts posts={temptest}/>
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
