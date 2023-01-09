export interface ContaCreateDto {
    contaId?: string;
    codigo?: string;
    nome?: string;
    email?: string;
    ativa: boolean;
    password?: string;
    passwordConfirm?: string;
}