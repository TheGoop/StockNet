import React, {useState, useEffect} from 'react';
import {FaBars} from 'react-icons/fa';
import { animateScroll as scroll} from 'react-scroll';

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
                    }>StonksNet</NavLogo>
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
                    onKeyPress={event => event.key === 'Enter' ? window.location.href = `/${input}` : null}
                    />

                    <NavButton>
                        <NavButtonLink to='/signin'>Sign In</NavButtonLink>
                    </NavButton>
                </NavbarContainer>
            </Nav>
        </>
    );
};

export default Navbar;
