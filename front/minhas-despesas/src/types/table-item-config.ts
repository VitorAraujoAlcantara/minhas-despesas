interface RenderTableItemConfig<CrudType> {
    (value: CrudType): string | number | undefined;
}
export interface TableItemConfig<CrudType> {
    fieldName: string;
    fieldCaption: string;
    renderValue: string|RenderTableItemConfig<CrudType>;
    alignment?: 'left'|'center'|'right';    
}