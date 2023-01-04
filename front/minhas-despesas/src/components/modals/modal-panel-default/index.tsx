import styled from "styled-components";
import Box from "../../box";
import ModalBack from "../modal-back";

const DivRoot = styled.div`
    max-width: calc( 100vw * 0.75 );
    max-height: calc( 100vh * 0.75 );
    background-color: ${ props => props.theme.palette.primary.main};
    box-shadow: 2px 2px 10px ${ props => props.theme.palette.primary.main};
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