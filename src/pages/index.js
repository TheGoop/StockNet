import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SubstockNavbar from '../components/SubStockNavBar'
import HeroSection from '../components/HeroSection';
import StockSection from '../components/StockSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/InfoSection/Data';
import Footer from '../components/Footer';
import PostSection from '../components/PostSection/index.js'
import SubmitPostLayout from '../components/WritePost/SubmitPost/SubmitPost';
import EditPostLayout from '../components/WritePost/EditPost/EditPost';
import vader from '../images/Vader.png'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import { FaTruckLoading } from 'react-icons/fa';
import Stock from '../components/StockSection/Stock';

const PageSetup = styled.div`
    background: #dae0e6;
    display: flex;
    flex-direction: column;
    padding: 50px 30px;
    align-items: center;
    justify-content: center;
    position: relative;
`

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return ( //IsOpen deals with the sidebar on mobile devices
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div id="page-container">
                <HeroSection />
                <InfoSection {...homeObjOne} />
                <InfoSection {...homeObjTwo} />
                <InfoSection {...homeObjThree} />
                <InfoSection {...homeObjFour} />
                <Footer />
            </div>
        </>
    );
};

const Substock = () => {
    return (
        <div>
            <div id="page-container">
                <SubstockNavbar />
                <StockSection />
            </div>
            <Footer />
        </div>
    )
}

const Post = () => {
    return (
        <div>
            <div id="page-container">
                <SubstockNavbar />
                <PostSection />
            </div>
            <Footer />
        </div>
    )
}

const SubmitPost = () => {
    return (
        <div>
            <div id="page-container">
                <SubstockNavbar />
                <SubmitPostLayout />
            </div>
            <Footer />
        </div>
    )
}

const EditPost = () => {
    return (
        <div>
            <div id="page-container">
                <SubstockNavbar />
                <EditPostLayout />
            </div>
            <Footer />
        </div>
    )
}

const Page404 = () => {
    return (
        <div>
            <div id="page-container">
                <SubstockNavbar />
                <PageSetup>
                    <Link to={`/AAPL`}>
                    <img src={vader} alt="Vader" />
                    </Link>
                    <h1 id="text404">The darkside of the search query is a pathway to many stocks</h1>
                    <h1 id="text404">some consider to be unnatural.</h1>
                    <br/>
                    <h1 id="text404">Click Vader to return to a real stock.</h1>
                </PageSetup>
            </div>
            <Footer />
        </div>
    )
}

export { Home, Substock, Post, SubmitPost, EditPost, Page404 }
