import React, { useState, useEffect } from 'react'
import Post from './Post'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useParams
} from "react-router-dom";
// import ApexCharts from 'apexcharts'
import ApexCharts from "react-apexcharts"

import dayjs from "dayjs"
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)



const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'bul520v48v6p6i26q6kg' // Replace this
const finnhubClient = new finnhub.DefaultApi()

//IDEA: have S&P 500 loaded in for common stocks when searching


function ChartComponent(props) {
    const [mdata, setmdata] = useState(null)
    const [moptions, setmoptions] = useState(null)
    const [res, setres] = useState(5)

    console.log(props.t1)
    let t1 = props.t1
    let t2 = props.t2
    let tick = props.tick
    
    if (props.res !== props.res){
        setres(props.res)
    }

    useEffect(() => {

        async function fetchChart() {
            let fullchart = []
            for (let i = 0; i < t1.length; i++) {
                const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${tick}&resolution=${res}&from=${t1[i]}&to=${t2[i]}&token=${api_key.apiKey}`)
                const chart = await response.json();
                await fullchart.push(chart)
            }
            return fullchart;
        }

        fetchChart().then(data => {
            // const charts = [];
            // charts.push(<Chart data={chart} />);
            console.log(data)

            let newchart = []
            for (let dates = 0; dates < data.length; dates++) {
                if (data[dates]['s'] === "no_data"){
                    continue
                }
                for (let i = 0; i < data[dates]['c'].length; i++) {
                    //console.log(new Date(data['t'][i] * 1000))
                    newchart.push(
                        // date: new Date(chart['t'][i] * 1000),
                        // open: chart['o'][i],
                        // high: chart['h'][i],
                        // low: chart['l'][i],
                        // close: chart['c'][i],
                        // volume: chart['v'][i]
                        {
                            x: new Date(data[dates]['t'][i] * 1000),
                            y: [data[dates]['o'][i], data[dates]['h'][i], data[dates]['l'][i], data[dates]['c'][i]]
                        }
                    )
                }
            }
            console.log(newchart, 'NEWCHART')
            let options = {
                chart: {
                    height: 350,
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: false,
                            selection: true,
                            zoom: true,
                            zoomin: false,
                            zoomout: false,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        }
                    },
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'category',
                    labels: {
                        formatter: function (val) {
                            val = new Date(val)
                            let hr = val.getUTCHours() - 5
                            let min = val.getUTCMinutes()
                            if (hr <= 12 && hr >= 0) {
                                return dayjs(val).format('MMM DD') + ` ${hr}:` + dayjs(val).format('mm') + " AM"
                            }
                            else if (hr < 0) {
                                hr += 24
                            }
                            return dayjs(val).format('MMM DD') + ` ${hr % 12}:` + dayjs(val).format('mm') + " PM"
                        }
                    },
                    tickAmount: 10
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            };

            let series = [{
                data: newchart
            }]

            // let chart = new ApexCharts(document.querySelector("#chart"), options);
            // chart.render();
            setmoptions(options)
            setmdata(series);
        })
    }, [res])

    if (mdata == null || moptions == null) {
        return <div></div>
    }
    else {
        return (
            <ApexCharts
                options={moptions}
                series={mdata}
                type={"candlestick"}
                width={"500"}
            />
            // <div/>
        )
    }
}

function Stock() {
    const [stockData, setStock] = useState([])
    const [loadedBool, setBool] = useState(null)
    const [startTime, setStart] = useState(null)
    const [closeTime, setClose] = useState(null)
    const [timescale, setTimescale] = useState(1)
    const [res, setRes] = useState(5)
    let { ticker } = useParams()

    //useEffect analagous to component did mount and component did update

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${api_key.apiKey}`)
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

    useEffect(() => {
        //UNIX time 2:30 PM to 9 PM for NYSE
        let date = new Date()
        let UTCDate = date - date.getTimezoneOffset() * 60000
        UTCDate = new Date(UTCDate)

        let normalize = UTCDate.getUTCHours() * 3600 + UTCDate.getUTCMinutes() * 60 + UTCDate.getUTCSeconds()
        if (UTCDate.getUTCHours() + UTCDate.getUTCMinutes() / 60 < 9.5) {
            normalize += 24 * 3600
        }

        let open = Math.floor(UTCDate / 1000) - normalize + (3600 * 14.5) //Sets to opening time of 9:30 NYSE

        // finnhubClient.stockCandles(ticker, "5", open, open + (3600 * 10.5), {}, (error, data, response) => {
        //     console.log(data)
        // });

        let TIMEDIFF = timescale//3600 * 24 * 7
        let t1 = []
        let t2 = []
        for (let i = TIMEDIFF - 1; i >= 0; i--) {
            t1.push(open - (3600 * 24) * i)
            t2.push(open + (3600 * 10.5) - (3600 * 24) * i)
        }

        setStart(t1)
        setClose(t2)

        // use a candle to create a graph
    }, [timescale])

    if (!loadedBool) {
        return <div />
    }

    const dayUpdate = (event) => {
        event.preventDefault()
        setTimescale(1)
        setRes(5)
    }

    const weekUpdate = (event) => {
        event.preventDefault()
        setTimescale(7)
        setRes(30)
    }

    const monthUpdate = (event) => {
        event.preventDefault()
        setTimescale(31)
        setRes('D')
    }

    //put onclick button into chart component from here
    return (
        <div>
            <ChartComponent t1={startTime} t2={closeTime} tick={ticker} res={res}/>
            <button onClick={dayUpdate}> Day </button>
            <button onClick={weekUpdate}> Week </button>
            <button onClick={monthUpdate}> Month </button>
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