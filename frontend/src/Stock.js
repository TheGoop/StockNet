import React, { useState, useEffect} from 'react'
import Post from './Post'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useParams
  } from "react-router-dom";
const finnhub = require('finnhub');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'bul520v48v6p6i26q6kg' // Replace this
const finnhubClient = new finnhub.DefaultApi()

//IDEA: have S&P 500 loaded in for common stocks when searching

function Stock() {
    const [stockChartX, setX] = useState('')
    const [stockChartY, setY] = useState('')
    const [stockData, setStock] = useState([])
    let { ticker } = useParams()

    //useEffect analagous to component did mount and component did update
    
    useEffect(() => {
        // fetch(`https://finnhub.io/api/v1/quote?symbol=FB&token=${API_KEY}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setStock(data) // new
        //     })
        finnhubClient.quote(`${ticker}`, (error, data, response) => {
            setStock(data)
        })

        // finnhubClient.stockCandles(ticker, "D", 1590988249, 1591852249, {}, (error, data, response) => {
        //     console.log(data)
        // });

        // use a candle to create a graph
      }, [])

    return (
        <div>
            <h1>{`${ticker}`}</h1>
            <h2>{`Current Price: ${stockData.c}`}</h2>
            <h2>{`High: ${stockData.h}`}</h2>
            <h2>{`Low: ${stockData.l}`}</h2>
            <h2>{`Open: ${stockData.o}`}</h2>
            <h2>{`Previous Close: ${stockData.pc}`}</h2>

            {/* <Route exact path={`/${ticker}/:postID`} component={Post}/>  */}
            
            {/* This works because it links back to a path established in app.js for routing */}
            <Link to={`/${ticker}/1`}>
            <button>
                Post 1
            </button>
            </Link>

            <Link to={`/${ticker}/2`}>
            <button>
                Post 2
            </button>
            </Link>
        </div>
    )

}

export default Stock