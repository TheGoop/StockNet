
import React, { useState, useEffect } from 'react'
import './post.css'
import { Link, useHistory } from 'react-router-dom'
import {
    useParams
} from "react-router-dom";
import { NORMALIZE_TIME } from '../../../CONSTANTS'
import axios from 'axios'
import { PORT } from '../../../CONSTANTS'

const Post = ({ post: { user, title, content, flair, upvotes, postID, time, ticker }, modifyUpvote, username }) => {
    // let { ticker } = useParams()
    const [clicked, setClicked] = useState(null)
    const [clickedUpvote, setClickedUpvote] = useState(null)
    const [upvoteState, setUpvoteState] = useState(false)

    let history = useHistory()

    let statcolor = "statsClick"
    let stattext = "upvotes"
    if (upvotes < 0) {
        statcolor = "stats2Click"
        stattext = "upvotes"
    }

    if (upvotes.toString().length > 3) {
        upvotes = `${(upvotes / 1000).toFixed(1)}k`
    }

    useEffect(() => {
        async function deletePost() {

            axios
                .delete(`${PORT}/singlepost?postID=${postID}&stock=${ticker}`)
                .then(function (response) {
                    console.log(response.data);
                    history.push(`/${ticker}`)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (clicked !== null) {
            deletePost()
        }
    }, [clicked])

    const handleDelete = (e) => {
        e.preventDefault()
        setClicked(true)
    }

    //CHECK USERNAME 
    //SHOULD ONLY UPVOTE IF USERNAME HAS NOT ALREADY

    useEffect(() => {
        let tempCount = upvoteState === true ? -1 : 1

        async function upVoteChange() {
            //set true -> 1 as you already clicked it

            axios
                .put(`${PORT}/upvotePost?postID=${postID}&upvote=${tempCount}`)
                .then(function (response) {
                    console.log(response.data);
                    setClickedUpvote(null)
                    setUpvoteState(!upvoteState)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (clickedUpvote !== null) {
            modifyUpvote(tempCount)
            upVoteChange()
        }
    }, [clickedUpvote])

    const handleUpvote = (e) => {
        e.preventDefault()
        setClickedUpvote(true)
    }
    console.log(username, user)

    return (
        <div id="expanded-post-preview-container">
            <div className={statcolor} onClick={handleUpvote}>
                <h1>{`${upvotes}`}</h1>
                <h3>{`${stattext}`}</h3>
            </div>

            <summary>
                <div id="titlebar">
                    <div id="flair">{`${flair}`}</div>
                    <Link to={`/${ticker}`}>
                        <div id="stockflair">{`${ticker}`}</div>
                    </Link>
                    <h1 id="title">{`${title}`}</h1>
                </div>

                <div id="content">{`${content}`}</div>

                <div id="lower">
                </div>


                <div id="timeuser">{`Posted by ${user} on ${NORMALIZE_TIME(time)}.`}</div>

                {/* CHECK HERE IF YOU HAVE USERNAME TO EDIT OR DELETE POST 
                THIS IS FOR THE LINK TO EDIT AND LINK TO DELETE
                */}
                {
                    ((username !== user) || username === "Anonymous")  ? <div></div> : 
                <div id="lowerbuttonbox">
                    <Link to={`/${ticker}/${postID}/edit`} style={{ textDecoration: 'none' }}>
                        <div id="loweredit">
                            Edit
                    </div>
                    </Link>

                    <div id="loweredit" onClick={handleDelete}>
                        Delete
                    </div>
                </div>
                }

            </summary>
        </div>
    )

}

export default Post