import { FormAddItemHidedConfig } from "../../../types/form-add-item-config";

interface InputHiddenParams<CrudType>{
    config: FormAddItemHidedConfig<CrudType>;
    item: CrudType;
}

function InputHidden<CrudType>( props: InputHiddenParams<CrudType> ){
    return (
        <input 
            type={'hidden'} 
            value={props.config.hidedValue}
            name={props.config.fieldName}        
        />
    )
}

export default InputHidden