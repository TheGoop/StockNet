import React, {useState, useEffect} from 'react';
import {FaBars} from 'react-icons/fa';
import { animateScroll as scroll} from 'react-scroll';
import { useHistory } from 'react-router-dom'

import { 
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,  
    NavLinks,
    NavButton,
    NavButtonLink,
    SearchBar
} from './NavbarElements';

const Navbar = ({ toggle }) => {
    const [input, setInput] = useState('');
    const [scrollNav, setScrollNav] = useState(false)
    const [userSignedIn, setUserSignedIn] = useState(false)
    let history = useHistory()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setUserSignedIn(true)
        }
      }, []);

    const handleLogout = () => {
        setUserSignedIn(false)
        localStorage.clear();
    };

    //ScrollNav makes the nav bar transparent when you scroll down
    const changeNav = ()=> {
        if(window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(true)
        }
    }

    const updateInput = (e) => {
        setInput(e.target.value);
     }

    const Submit = (e) => {
        console.log(e.key == "Enter")
        if (e.key === "Enter" && input !== ''){
            history.push(`/${input.toUpperCase()}`)
        }

    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to='/' onClick={toggleHome
                    }>StockNet</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to='about'
                            smooth={true} duration={500} spy={true}
                            exact='true' offset={0}
                            >About</NavLinks>
                        </NavItem>   
                        <NavItem>
                            <NavLinks to='discover'
                            smooth={true} duration={500} spy={true}
                            exact='true' offset={0}>Discover</NavLinks>
                        </NavItem> 
                        <NavItem>
                            <NavLinks to='connect'
                            smooth={true} duration={500} spy={true}
                            exact='true' offset={0}>Connect</NavLinks>
                        </NavItem> 
                        <NavItem>
                            <NavLinks to='signup'
                            smooth={true} duration={500} spy={true}
                            exact='true' offset={0}>Sign Up</NavLinks>
                        </NavItem> 
                    </NavMenu>

                    <SearchBar 
                    placeholder="Input Stock Ticker"
                    value={input} 
                    onChange={updateInput}
                    onKeyPress={Submit}
                    />
                    { userSignedIn &&                     
                    <NavButton>
                        <NavButtonLink onClick={handleLogout}>Sign Out</NavButtonLink>
                    </NavButton>
                    }
                    { !userSignedIn &&                     
                    <NavButton>
                        <NavButtonLink to='/signin'>Sign In</NavButtonLink>
                    </NavButton>
                    }
                </NavbarContainer>
            </Nav>
        </>
    );
};

export default Navbar;
