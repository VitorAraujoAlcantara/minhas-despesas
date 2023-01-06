import styled from "styled-components";
import BtnIcon from "../../components/buttons/btn-icon";
import { useAppSelector } from "../../store/hooks";


const DivRoot = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;    
    box-shadow:  0px 0px 10px #cccccc07;
    border-right: 1px solid #cccccc1f;
    background-color: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.secondary.contrastText};
`

const LeftMenu = () => {
    const { currentUser } = useAppSelector(state => state.userLogin)
    return (
        <DivRoot>
            <BtnIcon
                icon="home"
                caption="Home"
                to="/"
                shadow={true}
            />

            <BtnIcon
                icon="folderPlus"
                caption="+ Grupo"
                to="/group"
                shadow={true}
            />

            <BtnIcon
                icon="coins"
                caption="Despesas"
                to="/expense"
                shadow={true}
            />

            {currentUser &&
                <BtnIcon
                    icon="signOut"
                    caption="Logout"
                    to="/login"
                    shadow={true}
                />
            }
        </DivRoot>
    )
}

export default LeftMenu