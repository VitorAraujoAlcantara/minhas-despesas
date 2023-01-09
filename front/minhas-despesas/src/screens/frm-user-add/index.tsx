import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { BoxBottom } from "../../components/box";
import BtnSubmit from "../../components/buttons/btn-submit";
import FormHeader from "../../components/forms/form-header";
import Hr from "../../components/hr";
import InputText from "../../components/inputs/input-text";
import { ContaCreateDto } from "../../models/conta-create-dto";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { contaCrudSlice } from "../../store/reducers/conta";
import { ValidationException } from "../../types/validation-exception";

const DivRoot = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const DivBody = styled(BoxBottom)`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
`

const Form = styled.form`
    display: flex;
    flex: 1;
    flex-direction: column;    
`

const DivSubmit = styled.div`
    padding: 10px;
    box-shadow:  0px 0px 10px #cccccc07;
    border-top: 1px solid #cccccc1f;
`

const Fieldset = styled.fieldset`
    border: none;
    display: flex;
    flex: 1;
    flex-direction: column;
`

const FrmUserAdd = () => {
    const dispatch = useAppDispatch();
    const { created, erro, loading, entityErros } = useAppSelector(state => state.conta);
    const [conta, setConta] = useState<ContaCreateDto>({
        ativa: true,
        codigo: '',
        contaId: undefined,
        email: '',
        nome: '',
        password: '',
        passwordConfirm: ''
    })

    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        dispatch(contaCrudSlice.clearData())
    }, [])

    useEffect(() => {
        console.log({ entityErros })
    }, [entityErros])

    useEffect(() => {
        if (!created) {
            return;
        }

        dispatch(contaCrudSlice.clearData())

        setRedirect(true);

    }, [created])

    const handleSubmit = () => {
        dispatch(contaCrudSlice.create(conta));
    }

    const getInputErro = (propertyName: string): ValidationException | undefined => (entityErros ?? []).find(x => x.propertyName === propertyName);

    if (redirect) {
        return (
            <Navigate to='/login' />
        )
    }

    return (
        <DivRoot>
            <FormHeader>
                Cadastro de novo usuário
            </FormHeader>
            {erro}
            <DivBody>
                <Form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Fieldset
                        disabled={loading}
                    >
                        <InputText
                            inputType="email"
                            caption="E-mail:"
                            onChangeValue={(v) => setConta({ ...conta, email: v })}
                            theme='secondary'
                            required={true}
                            value={conta.email}
                            validationErro={getInputErro('Conta')}
                        />
                        <InputText
                            inputType="text"
                            caption="Nome do usuário:"
                            onChangeValue={(v) => setConta({ ...conta, nome: v })}
                            theme='secondary'
                            required={true}
                            value={conta.nome}
                            validationErro={getInputErro('Nome')}
                        />

                        <InputText
                            inputType="password"
                            caption="Senha:"
                            onChangeValue={(v) => setConta({ ...conta, password: v })}
                            theme='secondary'
                            required={true}
                            value={conta.password}
                            validationErro={getInputErro('Password')}
                        />

                        <InputText
                            inputType="password"
                            caption="Confirmação da senha:"
                            onChangeValue={(v) => setConta({ ...conta, passwordConfirm: v })}
                            theme='secondary'
                            required={true}
                            value={conta.passwordConfirm}
                            validationErro={getInputErro('PasswordConfirm')}
                        />


                        <DivSubmit>
                            <BtnSubmit
                                caption="CADASTRAR"
                            />
                        </DivSubmit>
                    </Fieldset>
                </Form>
            </DivBody>
        </DivRoot>
    )
}

export default FrmUserAdd