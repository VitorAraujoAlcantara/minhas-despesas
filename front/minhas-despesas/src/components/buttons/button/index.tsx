import styled from "styled-components";

const Button = styled.button`
    background-color: #ffffff00;
    color: #fff;
    box-shadow:  0px 0px 50px #cccccc07;
    border: 1px solid #cccccc1f;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: 1s;
    &:hover{
        background-color: #ccc;
        opacity: 0.7;
        color: #000;
    }
`

export default Button