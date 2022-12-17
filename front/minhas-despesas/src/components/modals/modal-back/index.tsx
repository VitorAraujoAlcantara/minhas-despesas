import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

const DivRoot = styled.div`
    display: flex;    
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: #ffffff30;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
`

interface ModalBackProps {
    show?: boolean;
    children?: any;
    onHide?: ()=>void
}

const ModalBack = (props: ModalBackProps) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showBack, setShowBack] = useState<boolean>(false);

    useEffect(() => {
        if (showModal) {
            setTimeout(() => {
                setShowBack(true);
            }, 300);
            return;
        }

        if ( props.onHide){
            props.onHide();
        }
        
    }, [showModal])

    useEffect(() => {
        if (props.show) {
            setShowModal(true);
            return;
        }

        setShowBack(false);
        setTimeout(() => {
            setShowModal(false);
        },300)

    }, [props.show])



    if (!showModal) {
        return null;
    }

    const style: CSSProperties = {
        opacity: 0.0
    }

    if (showBack) {
        style.opacity = 1;
    }


    return (
        <DivRoot style={style}>
            {props.children}
        </DivRoot>
    )
}

export default ModalBack