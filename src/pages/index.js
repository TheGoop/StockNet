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

import '../App.css';

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
                <InfoSection {...homeObjOne}/>
                <InfoSection {...homeObjTwo}/>
                <InfoSection {...homeObjThree}/>
                <InfoSection {...homeObjFour}/>
                <Footer />
            </div>
        </>
    );
};

const Substock = () => {
    return (
        <>
        <SubstockNavbar/>
        <StockSection />
        <Footer />
        </>
    )
}

const Post = () => {
    return (
        <>
        <SubstockNavbar/>
        <PostSection/>
        <Footer />
        </>
    )
}

export {Home, Substock, Post}
