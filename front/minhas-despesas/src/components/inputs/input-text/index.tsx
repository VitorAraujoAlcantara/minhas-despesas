import { useRef } from "react";
import styled from "styled-components";
import { FormAddItemConfig } from "../../../types/form-add-item-config";

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
`

const Input = styled.input`
    flex: 1;
    box-shadow:  0px 0px 50px #cccccc07;
    border: 1px solid #cccccc1f;
    background-color: #ffffff00;
    color: #fff;
    padding: 10px;
    font-size: 1rem;
`

interface InputTextProps{    
    onChangeValue: (value: string) => void;
    caption: string;    
    name?: string;
    value?: string;
    required?: boolean;
    autoFocus?: boolean;
    inputType: 'text' | 'number';
}

function InputText(props: InputTextProps){
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    return(
        <DivRoot>
            <DivLabel>
                <Label
                    onClick={() =>{
                        if ( inputRef && inputRef.current){
                            inputRef.current.focus();
                        }
                    }}
                >
                    {props.caption}
                </Label>
            </DivLabel>
            <DivInput>
                <Input
                    value={props.value}
                    name={props.name}
                    type={props.inputType}
                    ref={inputRef}
                    autoFocus={props.autoFocus}
                    required={props.required}    
                    onChange={ e => props.onChangeValue(e.target.value)}
                    step="0.01"
                />

            </DivInput>

        </DivRoot>
    )
}

export default InputText