import { useRef } from "react";
import styled from "styled-components";
import { ValidationException } from "../../../types/validation-exception";
import InputValidation from "../input-validation";

const DivRoot = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const DivLabel = styled.div`
    font-size: 1rem;
`

const Label = styled.label`
    
`

const DivInput = styled.div`
    flex: 1;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    box-shadow:  0px 0px 50px #cccccc07;
    border: 1px solid #cccccc1f;
    background-color: #ffffff00;
    color: ${props => props.theme.palette.primary.contrastText};
    padding: 10px;
    font-size: 1rem;
`

const InputSecondary = styled(Input)`
    color: ${props => props.theme.palette.secondary.contrastText};
`

interface InputTextProps {
    onChangeValue: (value: string) => void;
    caption: string;
    name?: string;
    value?: string;
    required?: boolean;
    autoFocus?: boolean;
    inputType: 'text' | 'number' | 'email' | 'password';
    theme?: 'primary' | 'secondary';
    validationErro?: ValidationException;
}

function InputText(props: InputTextProps) {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    return (
        <DivRoot>
            <DivLabel>
                <Label
                    onClick={() => {
                        if (inputRef && inputRef.current) {
                            inputRef.current.focus();
                        }
                    }}
                >
                    {props.caption}
                </Label>
            </DivLabel>
            <DivInput>
                {props.theme === 'secondary' ?
                    <InputSecondary
                        value={props.value}
                        name={props.name}
                        type={props.inputType}
                        ref={inputRef}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        onChange={e => props.onChangeValue(e.target.value)}
                        step="0.01"
                    />
                    :
                    <Input
                        value={props.value}
                        name={props.name}
                        type={props.inputType}
                        ref={inputRef}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        onChange={e => props.onChangeValue(e.target.value)}
                        step="0.01"
                    />
                }

                <InputValidation
                    validationErro={props.validationErro}
                />



            </DivInput>

        </DivRoot>
    )
}

export default InputText