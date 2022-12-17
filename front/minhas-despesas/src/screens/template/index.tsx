import { Outlet } from "react-router-dom"
import styled from "styled-components"
import HeaderTemplate from "./header-template"
import LeftMenu from "./left-menu"

const DivRoot = styled.div`
    display: flex;
    background-color: #011627;    
    color: #fff;
    flex: 1;    
    flex-direction: column;
    overflow: auto;
`

const DivContainer = styled.div`
    display: flex;
    flex: 1;
    overflow: auto;
`

const DivBody = styled.div`
    flex: 1;
    padding: 10px;
    display: flex;
    overflow: auto;
`

const Template = () => {
    return (
        <DivRoot>
            <HeaderTemplate />
            <DivContainer>
                <LeftMenu />
                <DivBody>
                    <Outlet />
                </DivBody>
            </DivContainer>
        </DivRoot>
    )
}

export default Template