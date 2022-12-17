export interface ValidationError<T> {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: T;
}
