import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setContaId } from "../../store/reducers/app"
import { getLoginFromStorage } from "../../store/reducers/user-login"
import HeaderTemplate from "./header-template"
import LeftMenu from "./left-menu"

const DivRoot = styled.div`
    display: flex;    
    background-color: ${props => props.theme.palette.primary.main};    
    color: ${props => props.theme.palette.primary.contrastText};
    font-family: ${props => props.theme.font.family.sanSerif};    
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
    const dispach = useAppDispatch();
    const location = useLocation();
    const { currentUser } = useAppSelector(state => state.userLogin)
    const [appStarted, setAppStarted] = useState<boolean>(false);
    useEffect(() => {
        console.log('APLICAÇÃO INICIADA!');
        dispach(getLoginFromStorage())
        setAppStarted(true);
    }, [])

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        if (!currentUser.user || !currentUser.user.userId) {
            return;
        }
        dispach(setContaId(currentUser.user.userId))
    }, [currentUser])

    if (location.pathname !== '/login' && appStarted && !currentUser) {
        return <Navigate to='/login' />
    }


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