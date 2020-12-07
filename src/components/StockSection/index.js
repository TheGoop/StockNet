import React, { useEffect, useState } from 'react'
import Stock from './Stock'
import { PageSetup, PostSetup } from './StockStyling'
import './StockStyling.css'
import '../Multibutton/Multibutton2.css'
import Posts from './PostPreviews/posts'
import { useHistory, useLocation } from 'react-router-dom'
import { apiKey } from '../../CONSTANTS'
import vader from '../../images/Vader.png'
import {PORT} from '../../CONSTANTS'

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

    const [posts, setPosts] = useState([])
    const [loadStatus, setLoadStatus] = useState(null)

    const location = useLocation()
    let { ticker } = useParams()
    let history = useHistory()

    const Submit = () => {
        history.push(`/${ticker.toUpperCase()}/submit`)
    }

    const LoadOld = () => {
        if (loadStatus !== true)
            setLoadStatus(true)
            setPostAmount(postAmount + 1)
    }

    const LoadRecent = () => {
        if (loadStatus !== true){
            if (postAmount !== 0){
                setLoadStatus(true)
                setPostAmount(postAmount - 1)
            }
        }
    }
    //Need Fetch data here, then pass over props down to individual messages

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setStock(data) // new
                setBool(true)
                // if (data.c === 0 && data.t === 0)
                //     setUnknown(1)
                // else
                //     setUnknown(0)
            })
            // .catch(function() {
            //     setUnknown(1)
            // });

        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`) //Loads faster
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    setValid(false)
                    setUnknown(1)
                }
                else {
                    setStock2(data) // new
                    setValid(true)
                    setBool2(true)
                    setUnknown(0)
                }
            })
            .catch(function() {
                setUnknown(1)
            });

    }, [location])

    useEffect(() => {
        fetch(`${PORT}/postpreview?stock=${ticker}&num=${postAmount}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length === 0){
                setPostAmount(postAmount - 1)
            }
            else{
                setPosts(data)
                // console.log(data)
            }
            setLoadStatus(null)
        })
        .catch(function (error) {
            setPosts([]) //If cannot find any posts
            setLoadStatus(null)
        });
    }, [postAmount])

    useEffect(() => {
        fetch(`${PORT}/postpreview?stock=${ticker}&num=0`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length === 0){
                setPostAmount(postAmount - 1)
            }
            else{
                setPosts(data)
                // console.log(data)
            }
            setLoadStatus(null)
        })
        .catch(function (error) {
            setPosts([]) //If cannot find any posts
            setLoadStatus(null)
        });
    }, [ticker]) //Needed to return to initial, most recent when navigating between stocks
    
    
    if (unknown === 1) {
        return (<PageSetup>
            <img src={vader} alt="Vader" />
            <h1 id="text404">The darkside of the search query is a pathway to many stocks</h1>
            <h1 id="text404">some consider to be unnatural.</h1>
            <br />
            <h1 id="text404">But if our stock API is down momentarily, you can still make a post.</h1>
            
            <PostSetup>
            <div className="multi-button2">
                <button onClick={Submit}> Submit New Post </button>
                <button onClick={LoadRecent}> Load More Recent Posts </button>
                <button onClick={LoadOld}> Load Older Posts </button>
            </div>
            <Posts posts={posts} />
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
                        <button onClick={LoadRecent}> Load More Recent Posts </button>
                        <button onClick={LoadOld}> Load Older Posts </button>
                    </div>
                    {/* Conditional rendering, shows buttons only when stock is valid */}
                    <Posts posts={posts} />
                </PostSetup>

            </PageSetup>

        </div >
    )
}

export default StockSection
