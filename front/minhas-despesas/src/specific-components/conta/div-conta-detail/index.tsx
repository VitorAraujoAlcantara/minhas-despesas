import { useEffect } from "react";
import styled from "styled-components";
import Box from "../../../components/box";
import BtnIcon from "../../../components/buttons/btn-icon";
import FormHeader from "../../../components/forms/form-header";
import { GroupBox } from "../../../components/group-box";
import LabelBold from "../../../components/labels/label-bold";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTheme, setThemeToLocalStorage } from "../../../store/reducers/app";

const DivRoot = styled(Box)`
    display: flex;    
    background-color: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.contrastText};
    flex-direction: column;
    max-width: 270px;
`

const DivBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;
    font-size: 0.9rem;
    text-transform: none;
`

const DivRow = styled.div`
    display: flex;
    gap: 10px;
    margin: 2.5px 0px;
`
interface DivContaDetailProps {

}

const DivContaDetail = (props: DivContaDetailProps) => {
    const dispach = useAppDispatch();
    const { currentUser } = useAppSelector(state => state.userLogin);
    const { theme } = useAppSelector(state => state.app);

    useEffect(() => {
        if (!theme) {
            return;
        }
        dispach(setThemeToLocalStorage())
    }, [theme])

    const changeAppTheme = (theme: string) => {
        dispach(setTheme(theme))
    }

    return (
        <DivRoot>
            <FormHeader>
                Detalhes do usuário
            </FormHeader>
            <DivBody>
                <DivRow>
                    <LabelBold>Nome:</LabelBold>
                    {currentUser?.user?.name}
                </DivRow>

                <DivRow>
                    <LabelBold>E-mail:</LabelBold>
                    {currentUser?.user?.email}
                </DivRow>
            </DivBody>

            <FormHeader>
                Aparência
            </FormHeader>
            <DivBody>
                <GroupBox>
                    <legend>Tema</legend>
                    <label>
                        Padrão
                        <input type='radio' checked={theme === 'default'} onClick={e => changeAppTheme('default')} />
                    </label>
                    <label>
                        Verde
                        <input type='radio' checked={theme === 'green'} onClick={e => changeAppTheme('green')} />
                    </label>
                    <label>
                        Royal
                        <input type='radio' checked={theme === 'royal'} onClick={e => changeAppTheme('royal')} />
                    </label>
                    <label>
                        Dark
                        <input type='radio' checked={theme === 'dark'} onClick={e => changeAppTheme('dark')} />
                    </label>
                    <label>
                        Noite
                        <input type='radio' checked={theme === 'night'} onClick={e => changeAppTheme('night')} />
                    </label>
                    <label>
                        Café
                        <input type='radio' checked={theme === 'coffe'} onClick={e => changeAppTheme('coffe')} />
                    </label>
                    <label>
                        Oceano
                        <input type='radio' checked={theme === 'sea'} onClick={e => changeAppTheme('sea')} />
                    </label>
                    <label>
                        Vintage
                        <input type='radio' checked={theme === 'vintage'} onClick={e => changeAppTheme('vintage')} />
                    </label>
                    <label>
                        Neon
                        <input type='radio' checked={theme === 'neon'} onClick={e => changeAppTheme('neon')} />
                    </label>
                </GroupBox>
            </DivBody>

            <FormHeader>
                Ações
            </FormHeader>
            <DivBody>
                <DivRow>
                    <BtnIcon
                        to="/login"
                        icon="signOut"
                        size="normal"
                        caption="Sair"
                    />
                </DivRow>
            </DivBody>

        </DivRoot>
    )
}

export default DivContaDetail