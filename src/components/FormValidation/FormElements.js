import styled from 'styled-components'
import {Link} from 'react-router-dom';

export const FormButton = styled.button`
    background: #01bf71;
    padding: 12px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 auto;
    display: block
`;

export const FormButtonLink = styled(Link)`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 12px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &.hover {
        transition: all 0.2s ease-in-out;
        background: white;
        color: #010606;
    }
`;