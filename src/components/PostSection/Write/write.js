import React, { useState, useEffect } from 'react'
import './write.css'
import {
    useParams
} from "react-router-dom";
import axios from 'axios'
import { PORT } from '../../../CONSTANTS'

const Write = ({ comments, setComments, loggeduser }) => {
    const [commentInput, setInput] = useState('')
    const [postingComment, setPosting] = useState(null)
    const [clicked, setClicked] = useState(null)
    
    const [NEWCOMMENT, setNEWCOMMENT] = useState(null)
    let { postID } = useParams()

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        async function makePost() {
            setPosting(true)

            axios
                .post(`${PORT}/comment?postID=${postID}`, NEWCOMMENT)
                .then(function (response) {
                    console.log(response.data);
                    setPosting(null)
                    setClicked(null)
                    setComments([NEWCOMMENT, ...comments])

                    //makes it so page is dynamic, get back comment ID later
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (clicked !== null && postingComment !== true) {
            makePost()
        }
    }, [clicked])


    //NEED TO CHECK HERE IF YOU HAVE USERNAME, OTHERWISE SUBMIT AS ANONYMOUS

    const handleSubmit = () => {
        if (commentInput !== '') {
            console.log(`Posted: ${commentInput}`)
            //POST TO DB THEN GET BACK THE ID OPTIMAL WAY
            //COMMENTS

            let tempnewcomment = {
                user: "Eggert",
                // time: new Date(),
                content: commentInput,
                // upvotes: 0,
                // commentID: 'null'
            }
            setNEWCOMMENT(tempnewcomment)
            setInput('')
            setClicked(true)
        }
    }

    return (
        <div id="write-container">
            <label>
                <div id="user"> Comment as </div>
                <div id="user2">{loggeduser}</div>
            </label>
            <textarea placeholder="What are your thoughts?" id="textbox" type="text" value={commentInput} onChange={handleChange} />
            <button class="submit" onClick={handleSubmit}> Submit </button>
        </div>
    )
}

export default Write;