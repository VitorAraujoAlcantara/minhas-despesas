import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faFolderPlus,
    faHome,
    IconDefinition,
    faPlus,
    faMinus,
    faEdit,
    faTrash,
    faMoneyCheckDollar,
    faCopy,
    faSignOut
} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { CSSProperties } from "react";

interface BtnIconProps {
    caption?: string
    icon: 'home' | 'folderPlus' | 'coins' | 'plus' | 'minus' | 'edit' | 'trash' | 'moneyCheckDollar' | 'copy' | 'signOut'
    to?: string
    size?: 'large' | 'normal' | 'small'
    onClick?: () => void
    disabled?: boolean
}

const Btn = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    padding: 10px;   
    text-decoration: none;
    color: #fff;
    font-size: 2rem;
    transition: 3s;
    border-radius: 10px;
    &:hover{
        background-color: #ccc;
        opacity: 0.7;
        color: #000;
    }
`

const DivCaption = styled.div`
    font-size: 0.7rem;
    padding: 5px 0px;
`

const BtnIcon = (props: BtnIconProps) => {

    let icon: IconDefinition;

    switch (props.icon) {
        case 'home':
            icon = faHome;
            break;
        case 'folderPlus':
            icon = faFolderPlus;
            break;
        case 'coins':
            icon = faCoins;
            break;
        case 'plus':
            icon = faPlus;
            break;
        case 'minus':
            icon = faMinus;
            break;
        case 'edit':
            icon = faEdit;
            break;
        case 'trash':
            icon = faTrash;
            break;
        case 'moneyCheckDollar':
            icon = faMoneyCheckDollar;
            break;
        case 'copy':
            icon = faCopy;
            break;
        case 'signOut': 
            icon = faSignOut;
            break;
    }
    let style: CSSProperties = {

    }

    if (props.size && props.size === 'normal') {
        style.fontSize = '1rem';
    }

    if (props.size && props.size === 'small') {
        style.fontSize = '0.7rem';
    }

    if (props.disabled && props.disabled === true) {
        style.pointerEvents = 'none';
        style.color = '#ccc';
        style.filter = 'opacity(0.3)';
    }

    return (
        <Btn
            to={props.to ?? ''}
            style={style}
            onClick={e => {
                if (props.onClick) {
                    props.onClick();
                }
            }}
        >
            <FontAwesomeIcon icon={icon} />
            {props.caption &&
                <DivCaption>
                    {props.caption}
                </DivCaption>
            }
        </Btn>
    )
}

export default BtnIcon