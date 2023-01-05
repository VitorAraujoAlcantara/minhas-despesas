import styled from "styled-components"
import { useAppSelector } from "../../store/hooks"

const DivRoot = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const A = styled.a`
    text-decoration: none;
    color: ${props => props.theme.palette.secondary.contrastText};
`
const Home = () => {
    const appData = useAppSelector(state => state.app)
    return (
        <DivRoot>
            <strong>Minhas Despesas – Versão {appData.version}</strong>
            <p>
                O sistema Minhas Despesas é um sistema de código fonte aberto, que se originou a partir de uma planilha onde eu vinha a controlar minhas despesas pessoais.
            </p>
            <p>
                Tem o intuito de compartilhar conhecimentos em React JS, assim como prover um simples controle financeiro de despesas.
            </p>
            <p>
                É com grande satisfação que estou compartilhando o código fonte, para que quem saiba ajude alguém que esteja na fase de aprendizado na programação.
            </p>
            <p>
                Espero sinceramente que esse aplicativo consiga ajudar alguma pessoa, seja pelo compartilhamento do conhecimento de programação como provendo um simples controle financeiro.
            </p>
            <p>
                <A href="https://github.com/VitorAraujoAlcantara/minhas-despesas/tree/main/front/minhas-despesas" target='_blank'>Link</A> para o código fonte.
            </p>

        </DivRoot>
    )
}

export default Home