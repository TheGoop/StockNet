import React, { useEffect, useState } from 'react'
import Stock from './Stock'
import { PageSetup, PostSetup } from './StockStyling'
import './StockStyling.css'
import '../Multibutton/Multibutton2.css'
import Posts from './PostPreviews/posts'
import { useHistory, useLocation } from 'react-router-dom'
import { apiKey } from '../../CONSTANTS'

import {
    useParams
} from "react-router-dom";

const StockSection = () => {
    const [hover, setHover] = useState(false);
    const [postAmount, setPostAmount] = useState(0)
    const [tickerState, setTicker] = useState('')

    const [stockData, setStock] = useState([])
    const [validStock, setValid] = useState(false)
    const [stockData2, setStock2] = useState([])
    const [loadedBool, setBool] = useState(null)

    const location = useLocation()
    let { ticker } = useParams()
    let history = useHistory()

    const Submit = () => {
        history.push(`/${ticker.toUpperCase()}/submit`)
    }

    const Load = () => {
        setPostAmount(postAmount + 1)
    }
    //Need Fetch data here, then pass over props down to individual messages

    useEffect(() => {

        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&symbol=${ticker}&token=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setStock(data) // new
                setBool(true)
            })

        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&symbol=${ticker}&token=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    setValid(false)
                }
                else {
                    setStock2(data) // new
                    setValid(true)
                }
            })
    }, [location])

    if (!loadedBool) {
        return <div />
    }
    return (
        <div>
            {(validStock === true ?
                <PageSetup>
                    <div id="stockbox">
                        <Stock stockData={stockData} stockData2={stockData2} />
                    </div>

                    <PostSetup>
                        <div className="multi-button2">
                            <button onClick={Submit}> Submit New Post </button>
                            <button onClick={Load}> Load More Posts </button>
                        </div>
                        {/* Conditional rendering, shows buttons only when stock is valid */}
                        <Posts postAmount={postAmount} />
                    </PostSetup>

                </PageSetup>
                : <PageSetup>
                    <h1>Whoops! Looks like this is not a NYSE stock OR ERROR 429!</h1>
                    <div className="multi-button2">
                            <button onClick={Submit}> Submit New Post </button>
                            <button onClick={Load}> Load More Posts </button>
                        </div>
                        {/* Conditional rendering, shows buttons only when stock is valid */}
                        <Posts postAmount={postAmount} />
                </PageSetup>)}
        </div >
    )
}

export default StockSection
