import React, { useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";

//IDEA: have S&P 500 loaded in for common stocks when searching

function Post() {
    let {ticker} = useParams()
    let {postID} = useParams()

    return (
        <div>
            <h2>{`I'm a post! From ${ticker} with ID ${postID}`}</h2>
        </div>
    )

}

export default Post