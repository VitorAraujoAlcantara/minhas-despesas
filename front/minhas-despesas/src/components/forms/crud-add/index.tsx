import styled from "styled-components";
import { FormAddComboboxConfig, FormAddItemConfig, FormAddItemErroConfig, FormAddItemHidedConfig } from "../../../types/form-add-item-config";
import { ListItem } from "../../../types/list-item";
import BtnSubmit from "../../buttons/btn-submit";
import InputCombobobx from "../../inputs/input-combobox";
import InputHidden from "../../inputs/input-hidden";
import InputText from "../../inputs/input-text";
import LabelBold from "../../labels/label-bold";

const DivRoot = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;
`

const DivBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const DivFooter = styled.div`
    box-shadow:  0px 0px 10px #cccccc07;
    border-top: 1px solid #cccccc1f;
    padding: 10px;
    display: flex;
    gap: 10px;
`

const ErroText = styled.div`
    background-color: ${props => props.theme.palette.danger.main};
    color:  ${props => props.theme.palette.danger.contrastText};
    padding: 10px;
    margin: 10px;
`

interface CrudAddProps<CrudType> {
    title: string;
    formConfigs: Array<FormAddItemConfig<CrudType> | FormAddItemHidedConfig<CrudType> | FormAddItemErroConfig | FormAddComboboxConfig>;
    itemTemplate: CrudType;
    onSubmit: () => void;
    onUpdateTemplate: (item: CrudType) => void;
    onCancel: () => void;
    listItens?: { [key: string]: Array<ListItem> }
}
function CrudAdd<CrudType>(props: CrudAddProps<CrudType>) {

    const renderConfig = (config: FormAddItemConfig<CrudType> | FormAddItemHidedConfig<CrudType> | FormAddItemErroConfig | FormAddComboboxConfig, key: number) => {

        if ("erroMessage" in config) {
            return (
                <ErroText
                    key={key}
                >
                    {config.erroMessage}
                </ErroText>
            )
        }

        if ("hidedValue" in config) {
            return (
                <InputHidden<CrudType>
                    config={config}
                    item={props.itemTemplate}
                    key={key}
                />
            )
        }

        if ("fieldCaption" in config) {
            return (
                <InputText
                    value={(props.itemTemplate as any)[config.fieldName]}
                    caption={config.fieldCaption}
                    inputType={config.inputType}
                    autoFocus={config.autoFocus}
                    required={config.required}
                    key={key}
                    onChangeValue={v => {
                        (props.itemTemplate as any)[config.fieldName] = v;
                        props.onUpdateTemplate(props.itemTemplate);
                    }}
                    theme='secondary'
                />
            )
        }

        if ("comboCaption" in config && props.listItens) {
            return (
                <InputCombobobx
                    caption={config.comboCaption}
                    value={(props.itemTemplate as any)[config.fieldName]}
                    list={props.listItens[config.listName]}
                    onChange={v => {
                        (props.itemTemplate as any)[config.fieldName] = v;
                        props.onUpdateTemplate(props.itemTemplate);
                    }}
                    emptyValue={config.comboEmptyValue}
                />
            )
        }

        return null;
    }



    return (
        <DivRoot>
            <Form
                onSubmit={e => {
                    e.preventDefault();

                    props.onSubmit();
                }}
            >
                <DivBody>
                    {props.formConfigs.map((config, index) => {
                        return renderConfig(config, index)
                    })}
                </DivBody>
                <DivFooter>
                    <BtnSubmit
                        caption="SALVAR"
                    />
                    <BtnSubmit
                        caption="CANCELAR"
                        onClick={props.onCancel}
                    />
                </DivFooter>
            </Form>

        </DivRoot>
    )
}

export default CrudAdd