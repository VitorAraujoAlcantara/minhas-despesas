import { ListItem } from "./list-item";

export interface FormAddItemConfig<CrudType> {
    fieldName: string;
    fieldCaption: string;
    inputType: 'text' | 'number';
    size?: number;
    autoFocus?: boolean;
    required?: boolean;
}

export interface FormAddItemHidedConfig<CrudType> {
    fieldName: string;
    hidedValue: string | number;
}

export interface FormAddItemErroConfig {
    erroMessage: string
}

export interface FormAddComboboxConfig {
    fieldName: string;
    comboCaption: string;
    listName: string;    
    comboEmptyValue?: ListItem;
}