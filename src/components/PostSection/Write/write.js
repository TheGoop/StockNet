import React, { useState, useEffect } from 'react'
import './write.css'
import {
    useParams
} from "react-router-dom";

const Write = ({ comments, setComments, loggeduser }) => {
    const [commentInput, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    
//NEED TO CHECK HERE IF YOU HAVE USERNAME, OTHERWISE SUBMIT AS ANONYMOUS

    const handleSubmit = () => {
        if (commentInput !== '') {
            console.log(`Posted: ${commentInput}`)
            let newcomment = {
                user: loggeduser,
                time: new Date(),
                content: commentInput,
                upvotes: 0,
                commentID: 'null'
            }
            //POST TO DB THEN GET BACK THE ID OPTIMAL WAY
            //COMMENTS

            setComments([newcomment, ...comments])
            setInput('')
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