import styled from "styled-components"
import { useAppSelector } from "../../store/hooks"

const DivRoot = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 0.9rem;
`

const A = styled.a`
    text-decoration: none;
    color: ${props => props.theme.palette.secondary.contrastText};
`

const Hr = styled.hr`
    border: 1px solid ${props => props.theme.palette.secondary.main};
    width: 100%;
`

const Footer = styled.footer`
    padding: 10px;
    display: flex;
    justify-content: center;
`

const Home = () => {
    const appData = useAppSelector(state => state.app)
    return (
        <DivRoot>
            <strong>Minhas Despesas – Versão {appData.version}</strong>
            <p>
                O Minhas Despesas é um sistema que originou-se a partir de uma planilha de Excel de controle mensal de despesas pessoais.
            </p>
            <p>
                O Minhas Despesas é um controle financeiro simples, de fácil utilização.
            </p>
            <p>
                É com grande satisfação que compartilhamos o código fonte, um exemplo prático de dois sistemas, sendo o back em C# .Net Core e o front em TypeScript React JS.
            </p>
            <p>
                Esperamos sinceramente que esse aplicativo consiga ajuda-lo de alguma forma, seja pelo compartilhamento do conhecimento de programação ou provendo um simples controle financeiro.
            </p>
            <Hr />
            <strong>Um pouco da minha história</strong>
            <p>
                Me chamo Vitor Araújo Alcântara.
            </p>
            <p>
                Adquiri experiência ao longo de mais de quinze anos, no qual exerci várias atividades no ramo da tecnologia da informação, prestando serviços a terceiros. Iniciei minhas atividades de forma autodidata, tendo evoluído para a formação acadêmica em análise e desenvolvimento de sistemas além de cursos nas áreas técnicas de eletrônica e servidores.
            </p>
            <p>
                Realizei várias consultorias no ramo de desenvolvimento de software de automação comercial já cheguei a realizar alguns projetos envolvendo eletrônica como terminais de consulta de preço, monitoramento de data center e coleta de dados em chão de fábrica (IOT web 4.0).
            </p>
            <p>
                Tenho uma boa experiência em desenvolvimento de softwares onde já́ realizei trabalhos utilizando as seguintes linguagens de programação: Object Pascal (Delphi e Lazarus), C (Desenvolvimento para dispositivos embarcados), C# (MVC5 .Net com WCF), PHP (Zend Framework), Javascript (ReactJs), Java (Desenvolvimento Android).
            </p>
            <p>
                Tenho conhecimento em bancos de dados onde já́ trabalhei desde bancos de dados flats (Paradox, Dbf, Xml) a banco de dados relacionais (mysql, firebird, sql server, postgresql, access).
            </p>
            <p>
                Tenho conhecimentos em sistemas operacionais Linux baseados em Debian e Windows.
                Enquanto trabalhava como autônomo cheguei a realizar serviços de manutenção em hardware.
                Tenho conhecimentos em ETL Pentaho.
            </p>
            <p>
                Possuo experiência tanto em front (React-Js), mobile (React-native) como em back (C#).
            </p>
            <p>
                Conhecimentos em ferramenta de versionamento GIT, testes unitários em c# com Nunit,
                MsTest ou Xunit, conhecimentos sólidos em POO, e em padrões de projetos.
            </p>

            <Hr />
            <strong>Código fonte</strong>
            <p>
                <A href="https://github.com/VitorAraujoAlcantara/minhas-despesas/tree/main/front/minhas-despesas" target='_blank'>Link</A> para o código fonte.
            </p>
            <Hr />
            <strong>Meus contatos</strong>
            <p>
                Meu <A href="https://github.com/VitorAraujoAlcantara" target='_blank'>GitHub</A>.
            </p>
            <p>
                Meu <A href="https://www.linkedin.com/in/vitor-araujo-alcantara" target='_blank'>Linkedin</A>.
            </p>
            <p>
                Canal do <A href="https://www.youtube.com/@vitoraraujoalcantara" target='_blank'>YouTube</A>.
            </p>
            <p>
                E-mail <A href="malito:vitoraalcantara@gmail.com">vitoraalcantara@gmail.com</A>.
            </p>
            <Hr />
            <Footer>
                Copyright (c) ParacuruTec. V. ARAUJO ALCANTARA. All rights reserved.
            </Footer>
        </DivRoot>
    )
}

export default Home