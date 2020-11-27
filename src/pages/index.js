import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection';
import StockSection from '../components/StockSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/InfoSection/Data';
import Footer from '../components/Footer';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return ( //IsOpen deals with the sidebar on mobile devices
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <HeroSection />
            <InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
            <InfoSection {...homeObjThree}/>
            <InfoSection {...homeObjFour}/>
            <Footer />
        </>
    );
};

const Substock = () => {
    return (
        <>
        <Navbar/>
        <StockSection />
        <Footer />
        </>
    )
}

const Post = () => {
    return (
        <Navbar/>
    )
}

export {Home, Substock, Post}
