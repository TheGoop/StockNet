
import React from 'react'
import './post.css'
import {
    useParams
} from "react-router-dom";
import {NORMALIZE_TIME} from '../../../CONSTANTS'

const Post = ({post: {user, title, content, flair, upvotes, postID, time, ticker}}) => {
    // let { ticker } = useParams()

    let statcolor = "stats"
    let stattext = "upvotes"
    if (upvotes < 0){
        statcolor = "stats2"
        stattext = "upvotes"
    }

    // const handleClick = () => {
    //     window.location.href = `/${ticker}/${postID}`
    // }

    if (upvotes.toString().length > 3){
        upvotes = `${(upvotes / 1000).toFixed(1)}k`
    }
    
    return(
        <div id="expanded-post-preview-container">
            <div id={statcolor}>
                <h1>{`${upvotes}`}</h1>
                <h3>{`${stattext}`}</h3>
            </div>

            <summary>
                <div id="titlebar">
                    <div id="flair">{`${flair}`}</div>
                    <div id="stockflair">{`${ticker}`}</div>
                    <h1 id="title">{`${title}`}</h1>
                </div>

                <div id="content">{`${content}`}</div>

                <div id="lower">
                </div>

                <div id="timeuser">{`Posted by ${user} on ${NORMALIZE_TIME(time)}.`}</div>
            </summary>
        </div>
    )

}

export default Post