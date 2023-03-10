import { useState } from "react";
import styled from "styled-components";
import Popup from "../../components/popup";
import UserIcon from "../../components/user-icon";
import DivContaDetail from "../../specific-components/conta/div-conta-detail";
import { useAppSelector } from "../../store/hooks";
import imgIcon from '../../assets/imgs/favicon.png';

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

const DivUser = styled.div`
    display: flex;
    position: relative ;
    flex: 1;    
`

const ImgIcon = styled.img`
    width: 64px;
    height: 64px;
    margin: 0px 10px;
    filter: drop-shadow(1px 1px 10px ${props => props.theme.palette.primary.main})
`

const HeaderTemplate = () => {
    const appData = useAppSelector(state => state.app)
    const { currentUser } = useAppSelector(state => state.userLogin)
    const [showUserPopup, setShowUserPopup] = useState<boolean>(false);
    return (
        <DivRoot>
            <DivTitle>
                <ImgIcon src={imgIcon} alt='icone' />
                {appData.name} - {appData.version}
            </DivTitle>
            {currentUser && currentUser.user &&
                <DivUser>
                    <UserIcon
                        userName={currentUser.user?.name ?? ''}
                        onClick={() => setShowUserPopup(!showUserPopup)}
                    />

                    <Popup
                        show={showUserPopup}
                        anchor="bottom-right"
                    >
                        <DivContaDetail

                        />
                    </Popup>
                </DivUser>
            }
        </DivRoot>
    )
}

export default HeaderTemplate