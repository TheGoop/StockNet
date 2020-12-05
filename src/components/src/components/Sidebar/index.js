import React from 'react'
import { 
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideButtonWrap,
    SidebarRoute
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to='about' isOpen={isOpen} onClick={toggle}>
                        About
                    </SidebarLink>
                    <SidebarLink to='discover' isOpen={isOpen} onClick={toggle}>
                        Discover
                    </SidebarLink>
                    <SidebarLink to='connect' isOpen={isOpen} onClick={toggle}>
                        Connect
                    </SidebarLink>
                    <SidebarLink to='signup' isOpen={isOpen} onClick={toggle}>
                        Sign Up
                    </SidebarLink>
                </SidebarMenu>
                <SideButtonWrap>
                    <SidebarRoute to='/signin'>Sign In</SidebarRoute>
                </SideButtonWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
