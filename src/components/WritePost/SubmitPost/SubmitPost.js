import React, { useState, useEffect } from 'react'
import '../WritePost.css'
import {
    useParams
} from "react-router-dom";
import axios from 'axios'
import {apiKey, PORT} from '../../../CONSTANTS'

const SubmitPostLayout = () => {
    const [postInput, setPostInput] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [flairInput, setFlairInput] = useState('')

    const [loadedBool, setBool] = useState(null)
    const [submitbool, setsubmitbool] = useState(null)
    const [stockname, setstockname] = useState('')

    const [NEWPOST, setNewPost] = useState(null)
    const [clickedSubmit, setSubmit] = useState(false)

    let { ticker } = useParams()

    const handlePostInput = (e) => {
        setPostInput(e.target.value)
    }

    const handleTitleInput = (e) => {
        setTitleInput(e.target.value)
    }

    const handleFlairInput = (e) => {
        setFlairInput(e.target.value)
    }

    useEffect(() => {
        console.log(NEWPOST)
        async function makePost() {
            axios
              .post(`${PORT}/singlepost`, NEWPOST)
              .then(function(response) {
                //console.log(response.data);
                window.location.href = `/${NEWPOST.ticker}/${response.data}`
              })
              .catch(function(error) {
                console.log(error);
              });
        }

        if (submitbool !== null && clickedSubmit !== true){ //Lock mechanism to prevent spam submit
            setSubmit(true)
            makePost()
        }

    },[NEWPOST]);

    const handleSubmit = () => {
        if (postInput !== '' && titleInput !== '' && flairInput !== '') {
            // console.log(`Posted: ${postInput}`)
            // let normalized = new Date()
            // normalized = normalized - normalized.getTimezoneOffset() * 60000 //later do + normalized.getTimezoneOffset() * 60000 to get back

            setNewPost({
                user: "Eggert",
                title: titleInput,
                // time: 1,
                content: postInput,
                flair: flairInput,
                upvotes: 0,
                comments: [],
                ticker: ticker.toUpperCase(),
            })

            setsubmitbool(true)
            //POST TO DB THEN GET BACK THE ID OPTIMAL WAY
        }
    }

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&symbol=${ticker}&token=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setstockname(data.name) // new
                setBool(true)
            })
    }, [])

    //NEED TO CHECK HERE IF YOU HAVE USERNAME, OTHERWISE SUBMIT AS ANONYMOUS
    //THIS IS ALL MENTIONS OF EGGERT ON THIS PAGE

    if (!loadedBool){
        return(<div></div>)
    }

    return (
        <div id="post-container">
            <div id="writepost-container">
                <label>
                    <div id="user"> Post as </div>
                    <div id="user2">{`Eggert to ${stockname}`}</div>
                </label>
                <input id="postinput" placeholder="Title" value={titleInput} onChange={handleTitleInput}/>
                <input id="postinput2" placeholder="Flair" value={flairInput} onChange={handleFlairInput}/>
                <textarea placeholder="What are your thoughts?" id="textbox" type="text" value={postInput} onChange={handlePostInput} />
                <button className="submit" onClick={handleSubmit}> Submit </button>
            </div>
        </div>
    )
}

export default SubmitPostLayout;