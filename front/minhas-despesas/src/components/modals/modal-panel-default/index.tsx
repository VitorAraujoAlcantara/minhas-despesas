import styled from "styled-components";
import Box from "../../box";
import ModalBack from "../modal-back";

const DivRoot = styled.div`
    max-width: calc( 100vw * 0.75 );
    max-height: calc( 100vh * 0.75 );
    background-color: #011627;
    box-shadow: 2px 2px 10px #011627;
`

interface ModalPanelDefaultProps{
    show?: boolean;
    children?: any;
    onHide?: ()=>void
}



const ModalPanelDefault = (props: ModalPanelDefaultProps) => {
    return(
        <ModalBack
            show={props.show}
            onHide={props.onHide}
        >
            <DivRoot>
                <Box>
                    {props.children}
                </Box>
            </DivRoot>
        </ModalBack>
    )
}

export default ModalPanelDefault;