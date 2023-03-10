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
    faSignOut,
    faFilter
} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { CSSProperties } from "react";

interface BtnIconProps {
    caption?: string
    icon: 'filter' | 'home' | 'folderPlus' | 'coins' | 'plus' | 'minus' | 'edit' | 'trash' | 'moneyCheckDollar' | 'copy' | 'signOut'
    to?: string
    size?: 'large' | 'normal' | 'small'
    onClick?: () => void
    disabled?: boolean
    shadow?: boolean
}

const Btn = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    padding: 10px;   
    text-decoration: none;    
    color: inherit;
    font-size: 2rem;
    transition: 1s;
    border-radius: 10px;
    &:hover{
        background-color: ${props => props.theme.palette.common.white};
        opacity: 0.7;
        color: ${props => props.theme.palette.common.black};        
    }    
`

const BtnShadow = styled(Btn)`
    filter: drop-shadow(1px 1px 10px ${props => props.theme.palette.primary.main});
    &:hover{
        filter: drop-shadow(1px 1px 10px ${props => props.theme.palette.primary.contrastText})
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
        case 'filter':
            icon = faFilter;
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

    if (props.shadow === true) {
        return (
            <BtnShadow
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
            </BtnShadow>
        )
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