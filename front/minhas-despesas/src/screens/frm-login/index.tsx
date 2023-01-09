import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Box, { BoxBottom } from "../../components/box";
import BtnSubmit from "../../components/buttons/btn-submit";
import Button from "../../components/buttons/button";
import FormHeader from "../../components/forms/form-header";
import InputText from "../../components/inputs/input-text";
import ModalPanelDefault from "../../components/modals/modal-panel-default";
import { LoginDto } from "../../models/login-dto";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearContaId, setContaId } from "../../store/reducers/app";
import { clearData, clearLocalStorage, login, setLoginToLocalStorage } from "../../store/reducers/user-login";

const DivRoot = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;    
`

const Frm = styled.form`
    flex: 1;
    display: flex;
    flex-direction: column;    
`

const FrmBody = styled(BoxBottom)`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const DivRow = styled.div`
    display: flex;
    flex-direction: column;
`

const Fieldset = styled.fieldset`
    display: flex; 
    flex: 1;
    flex-direction: column;
    border: none;
`

const ErroText = styled(DivRow)`
    background-color: ${props => props.theme.palette.danger.main};
    color:  ${props => props.theme.palette.danger.contrastText};
    padding: 10px;
    margin: 10px;
`

const LinkAdd = styled(Link)`
    color: ${props => props.theme.palette.primary.contrastText};
    text-decoration: none;
    padding: 10px;
    box-shadow:  0px 0px 50px #cccccc07;
    border: 1px solid #cccccc1f;
    text-align: center;
    &:hover{
        filter: opacity(0.5);
    }
`

const FrmLogin = () => {

    const dispatch = useAppDispatch();
    const { logged, loging, erro, currentUser } = useAppSelector(state => state.userLogin)

    const [loginData, setLoginData] = useState<LoginDto>({
        email: '',
        password: ''
    })

    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        dispatch(clearData());
        dispatch(clearLocalStorage());
        dispatch(clearContaId());
    }, [])

    useEffect(() => {
        if (!logged) {
            return;
        }

        if (!currentUser) {
            return;
        }

        if (!currentUser.user || !currentUser.user.userId) {
            return;
        }

        dispatch(setLoginToLocalStorage(currentUser));
        dispatch(setContaId(currentUser.user.userId))

        setRedirect(true);

    }, [logged, currentUser])

    const handleFormSubmit = () => {
        dispatch(login(loginData))
    }

    if (redirect) {
        return (
            <Navigate to='/' />
        )
    }

    return (
        <ModalPanelDefault
            show={true}
        >
            <DivRoot>
                <FormHeader>
                    LOGIN
                </FormHeader>
                <Frm
                    onSubmit={e => {
                        e.preventDefault();
                        handleFormSubmit();
                    }}

                >
                    <Fieldset
                        disabled={loging}
                    >
                        <FrmBody>
                            <DivRow>
                                <InputText
                                    caption="E-mail:"
                                    inputType="email"
                                    required={true}
                                    onChangeValue={v => setLoginData({ ...loginData, email: v })}
                                    value={loginData.email}
                                    autoFocus={true}
                                    theme='secondary'
                                />
                            </DivRow>

                            <DivRow>
                                <InputText
                                    caption="Senha:"
                                    inputType="password"
                                    required={true}
                                    onChangeValue={v => setLoginData({ ...loginData, password: v })}
                                    value={loginData.password}
                                    theme='secondary'
                                />
                            </DivRow>
                        </FrmBody>
                        {erro &&
                            <ErroText>
                                {erro}
                            </ErroText>

                        }
                        <DivRow>
                            <BtnSubmit
                                caption="LOGAR"
                            />
                        </DivRow>
                    </Fieldset>
                </Frm>
                <DivRow>
                    <LinkAdd
                        to='/user/add'
                    >
                        Cadastrar novo usuário
                    </LinkAdd>
                </DivRow>

            </DivRoot>
        </ModalPanelDefault>
    )
}

export default FrmLogin