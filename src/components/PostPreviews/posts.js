import React from 'react'
import './posts.css'

//

const Posts = ({posts}) => (
    <>
    {posts.map((post, i) => <div key={i}><Post post={post}/></div>)}
    </>
)

const Post = ({post: {user, title, content, flair, upvotes, postID, time}}) => {

    let statcolor = "stats"
    let stattext = "upvotes"
    if (upvotes < 0){
        statcolor = "stats2"
        stattext = "upvotes"
    }


    return(
        <div id="post-preview-container">
            <div id={statcolor}>
                <h1>{`${Math.abs(upvotes)}`}</h1>
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

                <div id="timeuser">{`Last updated by ${user} on ${time}.`}</div>
            </summary>
        </div>
    )

}

export default Posts