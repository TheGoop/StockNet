import React, { useState, useEffect } from 'react'
// import Post from './Post' //EVENTUALLY NEED A SEPARATE SECTION FOR POSTS
import {
    BrowserRouter as Router,
    // Switch,
    Link,
    // Route,
    useParams
} from "react-router-dom";
// import ApexCharts from 'apexcharts'
import ChartComponent from './Chart'
import dayjs from "dayjs"
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = 'bul520v48v6p6i26q6kg' // Replace this
// const finnhubClient = new finnhub.DefaultApi()

const apiKey = 'bul520v48v6p6i26q6kg'

//IDEA: have S&P 500 loaded in for common stocks when searching

function Stock() {
    const [stockData, setStock] = useState([])
    const [loadedBool, setBool] = useState(null)
    let { ticker } = useParams()

    //useEffect analagous to component did mount and component did update

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setStock(data) // new
                setBool(true)
            })
        // finnhubClient.quote(`${ticker}`, (error, data, response) => {
        //     setStock(data)
        //     setBool(true)
        // })
    }, [])

    if (!loadedBool) {
        return <div />
    }

    //put onclick button into chart component from here
    return (
        <div>
            <h1>{`${ticker}`}</h1>
            <h2>{`Current Price: ${stockData.c}`}</h2>
            <h2>{`High: ${stockData.h}`}</h2>
            <h2>{`Low: ${stockData.l}`}</h2>
            <h2>{`Open: ${stockData.o}`}</h2>
            <h2>{`Previous Close: ${stockData.pc}`}</h2>
            <ChartComponent tick={ticker} pc={stockData.pc} />

            {/* <Route exact path={`/${ticker}/:postID`} component={Post}/>  */}

            {/* This works because it links back to a path established in app.js for routing */}
            {/* <Link to={`/${ticker}/1`}>
                <button>
                    Post 1
            </button>
            </Link>

            <Link to={`/${ticker}/2`}>
                <button>
                    Post 2
            </button>
            </Link> */}
        </div>
    )

}

export default Stock