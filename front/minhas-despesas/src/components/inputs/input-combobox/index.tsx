import { useRef } from "react";
import styled from "styled-components";
import { ListItem } from "../../../types/list-item";

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

const Select = styled.select`
    flex: 1;
    box-shadow:  0px 0px 50px #cccccc07;
    border: 1px solid #cccccc1f;
    background-color: #ffffff00;
    color: #fff;
    padding: 10px;
    font-size: 1rem;
`

const Option = styled.option`
    background-color: #ffffff00;
    color: #000;
`

interface InputCombobobxProps {
    caption: string;
    value: string;
    name?:string;
    onChange: (value:string) => void;
    autoFocus?: boolean;
    required?: boolean;
    list: Array<ListItem>;
    emptyValue?: ListItem;
}

const InputCombobobx = (props: InputCombobobxProps) => {
    const inputRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
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
                <Select
                    value={props.value}
                    name={props.name}                    
                    ref={inputRef}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    onChange={e => props.onChange(e.target.value)}
                >
                    {props.emptyValue && 
                        <Option value={props.emptyValue.key}>{props.emptyValue.value}</Option>
                    }

                    {props.list.map( item => 
                        (
                            <Option key={item.key} value={item.key}>{item.value}</Option>
                        )
                    )}

                </Select>

            </DivInput>
        </DivRoot>
    )
}

export default InputCombobobx