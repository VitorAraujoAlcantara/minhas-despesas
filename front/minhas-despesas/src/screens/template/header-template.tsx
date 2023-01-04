import styled from "styled-components";
import UserIcon from "../../components/user-icon";
import { useAppSelector } from "../../store/hooks";

const DivRoot = styled.div`
    border: 1px solid #cccccc1f;
    box-shadow:  0px 0px 10px #cccccc07;
    display: flex;
    padding: 10px;    
    background-color: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.secondary.contrastText};
    text-transform: uppercase;    
`

const DivTitle = styled.div`
    display: flex;
    align-items: center;    
    font-size: 1rem;
`

const HeaderTemplate = () => {
    const appData = useAppSelector(state => state.app)
    const { currentUser } = useAppSelector(state => state.userLogin)
    return (
        <DivRoot>
            <DivTitle>
                {appData.name} - {appData.version}
            </DivTitle>
            {currentUser &&
                <UserIcon
                    userName={currentUser.user?.name ?? ''}
                />
            }
        </DivRoot>
    )
}

export default HeaderTemplate