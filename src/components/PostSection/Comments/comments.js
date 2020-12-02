
import React from 'react'
import './comments.css'
import {
    useParams
} from "react-router-dom";

//

const Comments = ({comments}) => (
    <>
    {comments.map((comment, i) => <div key={i}><Comment comment={comment}/></div>)}
    </>
)

// const Comment = ({comment: {user, time, content, upvotes, commentID}}) => {
const Comment = ({comment: {user, content}}) => {
    // let { ticker } = useParams()
    // let { postID } = useParams()

    let upvotes = 0

    let statcolor = "stats"
    let stattext = "upvotes"
    if (upvotes < 0){
        statcolor = "stats2"
        stattext = "upvotes"
    }

    if (upvotes.toString().length > 3){
        upvotes = `${(upvotes / 1000).toFixed(1)}k`
    }

    
    return(
        <div id="comment-preview-container">
            <div id={statcolor}>
                <h1>{`${upvotes}`}</h1>
                <h3>{`${stattext}`}</h3>
            </div>

            <summary>
                <div id="user">{`${user}`}</div>
                {/* <div id="time">{` - ${time}`}</div> */}
                <div id="content">{`${content}`}</div>
            </summary>
        </div>
    )

}

export default Comments