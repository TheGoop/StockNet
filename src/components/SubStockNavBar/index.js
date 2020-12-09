import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


import {
    NavbarContainer,
    // NavLogo,
    // MobileIcon,
    // NavMenu,
    // NavItem,
    // NavLinks,
    Nav2,
    NavLogo2,
    NavButton,
    NavButtonLink,
    // NavButtonLink2,
    SearchBar
} from '../Navbar/NavbarElements';

const SubstockNavbar = () => {
    const [input, setInput] = useState('');

    const updateInput = (e) => {
        setInput(e.target.value);
    }
    let history = useHistory()

    const [userSignedIn, setUserSignedIn] = useState(false)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setUserSignedIn(true)
        }
      }, []);

    const Submit = (e) => {
        console.log(e.key == "Enter")
        if (e.key === "Enter" && input !== ''){
            history.push(`/${input.toUpperCase()}`)
        }

    }

    return (
        <>
            <Nav2>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <NavLogo2>
                        StockNet
                    </NavLogo2>
                </Link>
                <NavbarContainer>

                    <SearchBar
                        placeholder="Input Stock Ticker"

                        value={input}
                        onChange={updateInput}
                        onKeyPress={Submit}
                    />

                    { userSignedIn &&                     
                    <NavButton>
                        <NavButtonLink to='/signin'>Sign Out</NavButtonLink>
                    </NavButton>
                    }
                    { !userSignedIn &&                     
                    <NavButton>
                        <NavButtonLink to='/signin'>Sign In</NavButtonLink>
                    </NavButton>
                    }
                </NavbarContainer>
            </Nav2>
        </>
    );
};

export default SubstockNavbar;
