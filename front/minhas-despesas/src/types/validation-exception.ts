export interface ValidationException {
    propertyName: string;
    errorMessages: Array<string>;
}