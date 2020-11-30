import React, { useState, useEffect } from 'react'
import dayjs from "dayjs"
import ApexCharts from "react-apexcharts"
import './StockStyling.css'
import '../Multibutton/Multibutton.css'
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

const apiKey = 'bv0ve6n48v6u4eacgpmg'

function ChartComponent(props) {
    const [mdata, setmdata] = useState(null)
    const [moptions, setmoptions] = useState(null)
    const [timescale, setTimescale] = useState(1)
    const [res, setRes] = useState(1)
    const [loading, setloading] = useState(false)
    const [daydata, setdaydata] = useState(false)
    const [weekdata, setweekdata] = useState(false)
    const [monthdata, setmonthdata] = useState(false)

    let tick = props.tick
    let pc = props.pc
    console.log(loading)
    useEffect(() => {

        async function fetchChart() {
            if (daydata !== false && timescale === 1)
                return daydata

            if (weekdata !== false && timescale === 7)
                return weekdata
            if (monthdata !== false && timescale === 31)
                return monthdata

            //UNIX time 2:30 PM to 9 PM for NYSE
            let date = new Date()
            let UTCDate = date - date.getTimezoneOffset() * 60000

            console.log('OFFSET', Math.abs(date.getTimezoneOffset()) % 60)
            // let OFFSET = (Math.abs(date.getTimezoneOffset()) % 100) * 60000
            // let tmp = UTCDate - OFFSET
            // console.log(tmp)
            // console.log('OFF',OFFSET)

            UTCDate = new Date(UTCDate)
            // console.log(UTCDate)

            let normalize = UTCDate.getUTCHours() * 3600 + UTCDate.getUTCMinutes() * 60 + UTCDate.getUTCSeconds()
            if (UTCDate.getUTCHours() + UTCDate.getUTCMinutes() / 60 < 14.5) { //Accounts for market not open yet
                normalize += 24 * 3600
            }

            let open = Math.floor(UTCDate / 1000) - normalize + (3600 * 14.5) //Sets to opening time of 9:30 NYSE
            console.log(open)



            // finnhubClient.stockCandles(ticker, "5", open, open + (3600 * 10.5), {}, (error, data, response) => {
            //     console.log(data)
            // });

            let TIMEDIFF = timescale//3600 * 24 * 7 
            //timescale is the amount of time we want to look back in (1 day or 7 days)
            let t1 = []
            let t2 = []


            for (let i = TIMEDIFF - 1; i >= 0; i--) {
                t1.push(open - (3600 * 24) * i)
                t2.push(open + (3600 * 10.5) - (3600 * 24) * i)
            }

            let fullchart = []
            for (let i = 0; i < t1.length; i++) {
                const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${tick}&resolution=${res}&from=${t1[i]}&to=${t2[i]}&token=${apiKey}`)
                const chart = await response.json();
                await fullchart.push(chart)
            }

            while (TIMEDIFF === 1 && fullchart[0]['s'] === 'no_data') { //Accounts for holidays or weekends
                fullchart = []
                t1[0] -= (3600 * 24)
                t2[0] += (3600 * 10.5) - (3600 * 24)
                const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${tick}&resolution=${res}&from=${t1[0]}&to=${t2[0]}&token=${apiKey}`)
                const chart = await response.json();
                await fullchart.push(chart)
            }

            if (timescale === 1)
                setdaydata(fullchart)
            else if (timescale === 7)
                setweekdata(fullchart)
            else
                setmonthdata(fullchart)

            return fullchart;
        }

        // use a candle to create a graph


        fetchChart().then(data => {
            // const charts = [];
            // charts.push(<Chart data={chart} />);
            //console.log(data)

            let tmpdate = new Date()
            console.log(tmpdate.getTimezoneOffset())
            console.log('OFFSET', Math.abs(tmpdate.getTimezoneOffset()) % 60)
            let OFFSET = Math.abs(tmpdate.getTimezoneOffset()) % 60;

            let timefix = 0;
            if (OFFSET === 30){
                timefix = -60000 * 30;
            }
            else if (OFFSET === 45){
                timefix = 60000 * 15;
            }

            let newchart = []
            for (let dates = 0; dates < data.length; dates++) {
                if (data[dates]['s'] === "no_data") {
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
                            x: new Date(data[dates]['t'][i] * 1000 + timefix), //Passing in time in UTC that gets converted to own user timezone
                            y: [Math.round(data[dates]['o'][i] * 1000) / 1000, Math.round(data[dates]['h'][i] * 1000) / 1000, Math.round(data[dates]['l'][i] * 1000) / 1000, Math.round(data[dates]['c'][i] * 1000) / 1000]
                        }
                    )
                }
            }

            // //
            // let date = new Date()
            // let UTCDate = date - date.getTimezoneOffset() * 60000
            // UTCDate = new Date(UTCDate)

            // let normalize = UTCDate.getUTCHours() * 3600 + UTCDate.getUTCMinutes() * 60 + UTCDate.getUTCSeconds()
            // if (UTCDate.getUTCHours() + UTCDate.getUTCMinutes() / 60 < 14.5) {
            //     normalize += 24 * 3600
            // }

            // let open = Math.floor(UTCDate / 1000) - normalize + (3600 * 14.5) //Sets to opening time of 9:30 NYSE
            // console.log(open, 'OPEN1')
            // //

            //console.log(newchart, 'NEWCHART')
            let options = {
                chart: {
                    background: '#ffffff',
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
                    // text: tick,
                    align: 'left'
                },
                xaxis: {
                    type: 'category',
                    labels: {
                        rotate: 0,
                        formatter: function (val) {
                            val = new Date(val)

                            // console.log(val)
                            let hr = val.getUTCHours() - 5
                            let min = val.getUTCMinutes()

                            let str2 = ""
                            let str3 = " PM"

                            if (hr < 12 && !(hr >= 12 && min >= 0)) {
                                str3 = " AM"
                            }
 
                            if(hr === 12){
                                str2 += ` 12:` + dayjs(val).format('mm') + str3
                            }
                            else{
                                str2 += ` ${hr % 12}:` + dayjs(val).format('mm') + str3
                            }

                            if (timescale !== 1) {
                                return dayjs(val).format('MMM DD')
                            }
                            else return str2
                        },
                    },
                    tickAmount: 5
                },
                yaxis: {
                    decimalsInFloat: 2,
                    tooltip: {
                        enabled: true
                    },
                    tickAmount: 6
                },
                annotations: {
                    yaxis: [
                        (timescale === 1 ?
                            {
                                y: pc,
                                strokeDashArray: 2,
                                borderColor: '#464646',
                                label: {
                                    //borderColor: '#00E396',
                                    // style: {
                                    //   color: '#fff',
                                    //   background: '#00E396'
                                    // },
                                    text: `Previous Close ${pc}`
                                }
                            }
                            :
                            {}
                        )

                    ]
                }
            };

            let series = [{
                data: newchart
            }]

            // let chart = new ApexCharts(document.querySelector("#chart"), options);
            // chart.render();
            // if (timescale == 1){
            //     // console.log(open, 'OPEN2')
            //     // console.log(new Date(open), 'OPEN')
            //     options['annotations']['xaxis'].x = open * 1000
            //     options['annotations']['xaxis'].x2 = open * 1000 + (3600 * 10.5) * 1000
            //     options['annotations']['xaxis'].fillColor = '#B3F7CA'
            //     options['annotations']['xaxis'].label = {text: 'X-axis range'}
            //     console.log(options['annotations'])
            //     console.log(options['annotations']['xaxis'])
            //     setmoptions(options)
            // }
            // else{
            //     delete options['annotations']['xaxis'].x
            //     delete options['annotations']['xaxis'].x2
            //     delete options['annotations']['xaxis'].fillColor
            //     delete options['annotations']['xaxis'].label
            //     setmoptions(options)
            // }
            //console.log(options)
            setmoptions(options)
            setmdata(series);
            setloading(false)
        })
    }, [timescale])

    const dayUpdate = (event) => {
        if (!loading && timescale !== 1) {
            event.preventDefault()
            setTimescale(1)
            setRes(1)
            setloading(true)
        }
    }

    const weekUpdate = (event) => {
        if (!loading && timescale !== 7) {
            event.preventDefault()
            setTimescale(7)
            setRes(15)
            setloading(true)
        }
    }

    const monthUpdate = (event) => {
        if (!loading && timescale !== 31) {
            event.preventDefault()
            setTimescale(31)
            setRes(60)
            setloading(true)
        }
    }

    if (mdata == null || moptions == null) {
        return <div></div>
    }
    else {
        return (
            <div>
                <ApexCharts
                    options={moptions}
                    series={mdata}
                    type={"candlestick"}
                    // width={450}
                    // height={300}
                    width={"1000px"}
                    height={"300px"}
                />
                <div class="multi-button">
                    <button onClick={dayUpdate}> 1 Day </button>
                    <button onClick={weekUpdate}> 5 Days </button>
                    <button onClick={monthUpdate}>  1 Month </button>
                </div>
                {/* <button onClick={monthUpdate}> Month </button> */}
            </div>
            // <div/>
        )
    }
}

export default ChartComponent;