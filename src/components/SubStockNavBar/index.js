import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

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

    const handleClick = () => {
        window.location.href = `/`;
    }

    return (
        <>
            <Nav2>
                <NavLogo2 onClick={handleClick}
                    >StockNet</NavLogo2>
                <NavbarContainer>

                    <SearchBar
                        placeholder="Input Stock Ticker"
                        
                        value={input}
                        onChange={updateInput}
                        onKeyPress={event => event.key === 'Enter' ? window.location.href = `/${input.toUpperCase()}` : null}
                    />

                    <NavButton>
                        <NavButtonLink to='/signin'>Sign In</NavButtonLink>
                    </NavButton>
                </NavbarContainer>
            </Nav2>
        </>
    );
};

export default SubstockNavbar;
