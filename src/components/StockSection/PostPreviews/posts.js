import React, { useState, useEffect } from 'react'
import './posts.css'
import {
    useParams
} from "react-router-dom";

let TEMPPOSTTEST = [
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
    },
    {
        user: 'Neil Vaishamshayasmapayn',
        title: 'Donec ultrices nisl in ligula euismod lobortis?',
        content: 'In in volutpat nisl. Etiam id sem non nisl tincidunt rutrum in hendrerit sapien. Aliquam finibus ante id sapien dictum, et sodales est ultrices. Integer lacinia lobortis nibh, non posuere diam pretium',
        flair: 'Lmao you think this is a flair',
        upvotes: 1284,
        postID: 'X86',
        time: 'Dec 8888, 12:19 PM'
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

const Posts = () => {
    let { ticker } = useParams()
    const [posts, setPosts] = useState(null)
    const [loadedpost, load2] = useState(null)

    useEffect(() => {
        //FETCH POSTS HERE BASED ON TICKER
        setPosts(TEMPPOSTTEST)
        load2(true)
    }, [])

    if (!loadedpost)
        return(<div></div>)

    return(
    <>
    {posts.map((post, i) => <div key={i}><Post post={post}/></div>)}
    </>
    )
}

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