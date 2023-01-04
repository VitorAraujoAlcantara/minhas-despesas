import styled from "styled-components";

const Button = styled.button`
    background-color: #ffffff00;
    color: #fff;
    box-shadow:  0px 0px 50px #cccccc07;
    border: 1px solid #cccccc1f;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
        background-color: ${props => props.theme.palette.common.white};
        opacity: 0.7;
        color: ${props => props.theme.palette.common.black};
    }
`

export default Button