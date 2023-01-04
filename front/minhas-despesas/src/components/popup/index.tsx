import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const flip = keyframes`
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to{
        opacity: 1;
        transform: scale(1);
    }
`

const DivRoot = styled.div`
    z-index    : 10;
    display: flex;
    position: absolute;        
    transition: 0.5s;
    animation: ${flip} 0.2s linear;
    box-shadow: 2px 2px 10px ${props => props.theme.palette.primary.main};
`

interface PopupProps {
    children: any
    show: boolean
    anchor?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

const Popup = (props: PopupProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!props.show && visible) {
            setTimeout(() => {
                setVisible(false);
            }, 500);
            return;
        }

        if (!visible && props.show) {
            setVisible(true);
        }

    }, [props.show])

    if (!visible) {
        return null;
    }

    const divStyle: React.CSSProperties = {
        opacity: props.show ? 1 : 0,
        transform: props.show ? 'scale(1)' : 'scale(0.5)'
    }

    switch (props.anchor) {
        case 'bottom-right':
            divStyle.top = 'calc( 100% + 3px)';
            divStyle.right = '0px';
            break;
        case 'bottom-left':
            divStyle.top = 'calc( 100% + 3px)';
            divStyle.left = '0px';
            break;
        case 'top-right':
            divStyle.bottom = 'calc( 100% + 3px)';
            divStyle.right = '0px';
            break;
        case 'top-left':
            divStyle.bottom = 'calc( 100% + 3px)';
            divStyle.left = '0px';
            break;
        default:
            divStyle.top = 'calc( 100% + 3px)';
            divStyle.right = '0px';
            break;

    }

    return (
        <DivRoot style={divStyle} >
            {props.children}
        </DivRoot>
    )
}

export default Popup