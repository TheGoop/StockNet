import React from 'react';
import {animateScroll as scroll} from 'react-scroll';
import {FooterContainer, FooterWrap, FooterLinksContainer,
FooterLinksWrapper, FooterLinkItems,FooterLinkTitle,FooterLink,
SocialMedia, SocialLogo, SocialMediaIcons, SocialMediaIconsLink,
SocialMediaWrap, WebsiteRights} from './FooterElements';
import {FaFacebook, FaInstagram, FaTwitter, FaLinkedin} from 'react-icons/fa';

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us</FooterLinkTitle>
                            <FooterLink to="/">Contact us</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Terms of Service</FooterLinkTitle>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' onClick={toggleHome}>
                            StockNet
                        </SocialLogo>
                        <WebsiteRights>
                            StockNet © {new Date().getFullYear()}
                        All rights reserved.</WebsiteRights>
                        <SocialMediaIcons>
                            <SocialMediaIconsLink href='//www.facebook.com' target='_blank'
                            aria-label='Facebook'>
                                <FaFacebook />
                            </SocialMediaIconsLink>
                            <SocialMediaIconsLink href='//www.instagram.com' target='_blank'
                            aria-label='Instagram'>
                                <FaInstagram />
                            </SocialMediaIconsLink>
                            <SocialMediaIconsLink href='//www.twitter.com/' target='_blank'
                            aria-label='Twitter'>
                                <FaTwitter />
                            </SocialMediaIconsLink>
                            <SocialMediaIconsLink href='//www.linkedin.com' target='_blank'
                            aria-label='Linkedin'>
                                <FaLinkedin />
                            </SocialMediaIconsLink>
                        </SocialMediaIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>         
        </FooterContainer>
    )
}

export default Footer
