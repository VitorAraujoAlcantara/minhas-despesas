import styled from "styled-components";
import { BoxBottom } from "../box";
import Button from "../buttons/button";
import ModalPanelDefault from "../modals/modal-panel-default";

const DivRoot = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const DivTitle = styled.div`
    background-color: ${props => props.theme.palette.primary.main};
    color:  ${props => props.theme.palette.primary.contrastText};
    padding: 10px;
`

const DivTitleErro = styled(DivTitle)`
    background-color: ${props => props.theme.palette.danger.main};
    color:  ${props => props.theme.palette.danger.contrastText};
`

const DivBody = styled(BoxBottom)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

const DivFooter = styled.div`
    display: flex;
    padding: 10px;
    justify-content: flex-end;
`


interface AlertProps {
    title: string;
    text: string;
    type: 'erro' | 'info';
    show?: boolean;
    onOk: () => void;
}

const Alert = (props: AlertProps) => {
    return (
        <ModalPanelDefault
            show={props.show}
        >
            <DivRoot>
                {props.type === 'info' &&
                    <DivTitle>
                        {props.title}
                    </DivTitle>
                }
                {props.type === 'erro' &&
                    <DivTitleErro>
                        {props.title}
                    </DivTitleErro>
                }
                <DivBody>
                    {props.text}
                </DivBody>

                <DivFooter>
                    <Button
                        onClick={() => props.onOk()}
                    >
                        OK
                    </Button>
                </DivFooter>
            </DivRoot>
        </ModalPanelDefault>
    )
}

export default Alert;