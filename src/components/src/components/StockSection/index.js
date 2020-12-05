import React, { useEffect, useState } from 'react'
import Stock from './Stock'
import { PageSetup, PostSetup } from './StockStyling'
import './StockStyling.css'
import '../Multibutton/Multibutton2.css'
import Posts from './PostPreviews/posts'
import { useHistory, useLocation } from 'react-router-dom'
import { apiKey } from '../../CONSTANTS'
import vader from '../../images/Vader.png'

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
    const [loadedBool2, setBool2] = useState(null)

    const [unknown, setUnknown] = useState(null)

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
                if (data.c === 0 && data.t === 0)
                    setUnknown(1)
                else
                    setUnknown(0)
            })
            .catch(function() {
                setUnknown(true)
            });

        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&symbol=${ticker}&token=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    setValid(false)
                }
                else {
                    setStock2(data) // new
                    setValid(true)
                    setBool2(true)
                }
            })

    }, [location])

    if (unknown == 1) {
        return (<PageSetup>
            <img src={vader} alt="Vader" />
            <h1 id="text404">The darkside of the search query is a pathway to many stocks</h1>
            <h1 id="text404">some consider to be unnatural.</h1>
            <br />
            <h1 id="text404">But if our stock API is down momentarily, you can still make a post.</h1>
            
            <PostSetup>
            <div className="multi-button2">
                <button onClick={Submit}> Submit New Post </button>
                <button onClick={Load}> Load More Posts </button>
            </div>
            <Posts postAmount={postAmount} />
            </PostSetup>
        </PageSetup>)
    }
    else if (!loadedBool || !loadedBool2) {
        return <div />
    }
    return (
        <div>
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

        </div >
    )
}

export default StockSection
