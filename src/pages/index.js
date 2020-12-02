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
import { FaTruckLoading } from 'react-icons/fa';
import Stock from '../components/StockSection/Stock';

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

export { Home, Substock, Post, SubmitPost, EditPost }
