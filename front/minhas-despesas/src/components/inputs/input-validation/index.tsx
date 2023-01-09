import styled from "styled-components";
import { ValidationException } from "../../../types/validation-exception";

const DivRoot = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.palette.danger.main};
    color: ${props => props.theme.palette.danger.contrastText};
`

const DivItem = styled.div`
    padding: 10px;    
`

interface InputValidationProps {
    validationErro?: ValidationException;
}

const InputValidation = (props: InputValidationProps) => {
    if (!props.validationErro) {
        return null;
    }

    if (!props.validationErro.errorMessages || !props.validationErro.errorMessages.length) {
        return null;
    }

    return (
        <DivRoot>
            {props.validationErro.errorMessages.map((x, index) => (
                <DivItem key={index}>
                    {x}
                </DivItem>
            ))}
        </DivRoot>
    )
}

export default InputValidation