import React, { useState, useEffect } from 'react'
import './write.css'
import {
    useParams
} from "react-router-dom";
import axios from 'axios'
import { PORT } from '../../../CONSTANTS'

const Write = ({ comments, setComments, loggeduser }) => {
    const [commentInput, setInput] = useState('')
    const [clicked, setClicked] = useState(null)

    // const [NEWCOMMENT, setNEWCOMMENT] = useState(null)
    let { postID } = useParams()

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        async function makePost() {

            //NEED TO CHECK HERE IF YOU HAVE USERNAME, OTHERWISE SUBMIT AS ANONYMOUS WHERE EGGERT IS
            //THIS IS FOR POSTING COMMENTS
            //THIS IS ALL MENTIONS OF LOGGEDUSER AND EGGERT ON THIS PAGE

            let tempnewcomment = {
                user: "Eggert",
                content: commentInput,
                // upvotes: 0,
                // commentID: 'null'
            }

            axios
                .post(`${PORT}/comment?postID=${postID}`, tempnewcomment)
                .then(function (response) {
                    //console.log(response.data);
                    // console.log(response.data);
                    tempnewcomment.time = response.data.time
                    setClicked(null)

                    setInput('')
                    setComments([tempnewcomment, ...comments])
                    //makes it so page is dynamic, get back comment ID later
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (clicked !== null) {
            makePost()
        }
    }, [clicked])


    const handleSubmit = () => {
        if (commentInput !== '') {
            console.log(`Posted: ${commentInput}`)
            //POST TO DB THEN GET BACK THE ID OPTIMAL WAY
            //COMMENTS

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
            <button className="submit" onClick={handleSubmit}> Submit </button>
        </div>
    )
}

export default Write;