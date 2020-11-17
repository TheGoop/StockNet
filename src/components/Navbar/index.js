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
    NavButtonLink
} from './NavbarElements';

const Navbar = ({ toggle }) => {
    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = ()=> {
        if(window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
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
                    <NavButton>
                        <NavButtonLink to='/signin'>Sign In</NavButtonLink>
                    </NavButton>
                </NavbarContainer>
            </Nav>
        </>
    );
};

export default Navbar;
