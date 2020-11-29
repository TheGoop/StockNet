import React from 'react'
import './posts.css'
import {
    useParams
} from "react-router-dom";

//

const Posts = ({posts}) => (
    <>
    {posts.map((post, i) => <div key={i}><Post post={post}/></div>)}
    </>
)

const Post = ({post: {user, title, content, flair, upvotes, postID, time}}) => {
    let { ticker } = useParams()

    let statcolor = "stats"
    let stattext = "upvotes"
    if (upvotes < 0){
        statcolor = "stats2"
        stattext = "upvotes"
    }

    const handleClick = () => {
        window.location.href = `/${ticker}/${postID}`
    }

    if (upvotes.toString().length > 3){
        upvotes = `${(upvotes / 1000).toFixed(1)}k`
    }

    
    return(
        <div id="post-preview-container" onClick={handleClick}>
            <div id={statcolor}>
                <h1>{`${upvotes}`}</h1>
                <h3>{`${stattext}`}</h3>
            </div>

            <summary>
                <div id="titlebar">
                    <div id="flair">{`${flair}`}</div>
                    <h1 id="title">{`${title}`}</h1>
                </div>

                <div id="content">{`${content}`}</div>

                <div id="lower">
                </div>

                <div id="timeuser">{`Posted by ${user} on ${time}.`}</div>
            </summary>
        </div>
    )

}

export default Posts