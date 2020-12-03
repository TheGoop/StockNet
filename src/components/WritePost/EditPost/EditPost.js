import React, { useState, useEffect } from 'react'
import '../WritePost.css'
import {
    useParams
} from "react-router-dom";
import axios from 'axios'
import { apiKey, PORT } from '../../../CONSTANTS'
import { useHistory } from 'react-router-dom'
import {Page404Element} from '../../../pages/index'

const EditPostLayout = () => {
    const [postInput, setPostInput] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [flairInput, setFlairInput] = useState('')
    const [STOREDticker, setTicker] = useState('')

    const [loadedBool, setBool] = useState(null)
    const [stockname, setstockname] = useState('')

    const [editedBool, seteditedBool] = useState(null)

    const [error, seterror] = useState(null)

    let history = useHistory()

    let { postID } = useParams()
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
        let EDITPOST = {
            title: titleInput,
            content: postInput,
            flair: flairInput,
        }

        async function editPost() {
            axios
                .put(`${PORT}/singlepost?postID=${postID}`, EDITPOST)
                .then(function (response) {
                    console.log(response.data);
                    history.push(`/${STOREDticker}/${postID}`)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (editedBool !== null) {
            editPost()
        }

    }, [editedBool]);

    const handleSubmit = () => {
        if (postInput !== '' && titleInput !== '' && flairInput !== '') {
            // console.log(`Posted: ${postInput}`)
            let normalized = new Date()
            normalized = normalized - normalized.getTimezoneOffset() * 60000 //later do + normalized.getTimezoneOffset() * 60000 to get back

            seteditedBool(true)
            //POST TO DB THEN GET BACK THE ID OPTIMAL WAY
        }
    }

    useEffect(() => {
        let tempticker = ''
        fetch(`${PORT}/singlepost?postID=${postID}`)
        .then((response) => response.json())
        .then((data) => {
            setPostInput(data.content)
            setTitleInput(data.title)
            setFlairInput(data.flair)
            setTicker(data.ticker)
            setBool(true)
            tempticker = data.ticker
        })
        .catch(function() {
            seterror(true)
        });

        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&symbol=${ticker}&token=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.name === undefined){
                    setstockname(ticker) //default
                }
                else{
                    setstockname(data.name) // new
                }
            })
            .catch(function() {
                setstockname(ticker) //default
            });
    }, [])

    //NEED TO CHECK HERE IF YOU HAVE USERNAME
    //THIS IS FOR EDITING A POST
    //CROSS VERIFY WITH THE FETCH FROM DB FOR SAME USER

    //FIX ALL MENTIONS OF EGGERT ON THIS PAGE

    if (error){
        return(<Page404Element/>)
    }
    else if (!loadedBool) {
        return (<div></div>)
    }

    return (
        <div id="post-container">
            <div id="writepost-container">
                <label>
                    <div id="user"> Edit as </div>
                    <div id="user2">{`Eggert to ${stockname}`}</div>
                </label>
                <input id="postinput" placeholder="Title" value={titleInput} onChange={handleTitleInput} />
                <input id="postinput2" placeholder="Flair" value={flairInput} onChange={handleFlairInput} />
                <textarea placeholder="What are your thoughts?" id="textbox" type="text" value={postInput} onChange={handlePostInput} />
                <button className="submit" onClick={handleSubmit}> Edit Post </button>
            </div>
        </div>
    )
}

export default EditPostLayout;