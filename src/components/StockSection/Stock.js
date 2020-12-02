import React, { useState, useEffect } from 'react'
// import Post from './Post' //EVENTUALLY NEED A SEPARATE SECTION FOR POSTS
import {
    BrowserRouter as Router,
    // Switch,
    Link,
    // Route,
    useParams,
    useLocation
} from "react-router-dom";
// import ApexCharts from 'apexcharts'
import ChartComponent from './Chart'
import dayjs from "dayjs"
import './StockStyling.css'
import {apiKey} from '../../CONSTANTS'

let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = 'bul520v48v6p6i26q6kg' // Replace this
// const finnhubClient = new finnhub.DefaultApi()

//IDEA: have S&P 500 loaded in for common stocks when searching

function Stock({stockData, stockData2}) {
    // const [stockData, setStock] = useState([])
    // const [stockData2, setStock2] = useState([])
    // const [loadedBool, setBool] = useState(null)
    let { ticker } = useParams()
    // const location = useLocation()

    // const [validStock, setValid] = useState(false)

    //useEffect analagous to component did mount and component did update

    // useEffect(() => {
    //     fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&symbol=${ticker}&token=${apiKey}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setStock(data) // new
    //             setBool(true)
    //         })

        
    //     // finnhubClient.quote(`${ticker}`, (error, data, response) => {
    //     //     setStock(data)
    //     //     setBool(true)
    //     // })
    // }, [location])


    // if (!validStock){
    //     return <div id="smalltext"><h1>Whoops! Looks like this is not a NYSE stock!</h1></div>
    // }
    let cost;
    if (stockData.c - stockData.pc > 0) {
        cost = <h2 id="green">{`+${(stockData.c - stockData.pc).toFixed(2)} ${stockData2.currency} (${((stockData.c - stockData.pc)/stockData.pc*100).toFixed(2)}%)`}</h2>
      } else {
        cost = <h2 id="red">{`${(stockData.c - stockData.pc).toFixed(2)} ${stockData2.currency} (${((Math.abs(stockData.c - stockData.pc))/stockData.pc*100).toFixed(2)}%)`}</h2>
      }

    //put onclick button into chart component from here

    return (
        <>
            <div id="serif">
                <h1>{`${(ticker).toUpperCase()}`}</h1>

                <img src={`${stockData2.logo}`}/>

                <div id="smalltext">
                    <h2>{`${stockData2.name}`}</h2>
                    {cost}
                    <h3>{`Price: ${stockData.c}`}</h3>
                    <h3>{`High: ${stockData.h}`}</h3>
                    <h3>{`Low: ${stockData.l}`}</h3>
                    <h3>{`Open: ${stockData.o}`}</h3>
                    <h3>{`Previous: ${stockData.pc}`}</h3>
                </div>
            </div>

            <ChartComponent pc={stockData.pc} />

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
        </>
    )

}

export default Stock