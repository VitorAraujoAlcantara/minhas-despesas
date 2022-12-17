import styled from "styled-components";
import BtnIcon from "../../components/buttons/btn-icon";


const DivRoot = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;    
    box-shadow:  0px 0px 10px #cccccc07;
    border-right: 1px solid #cccccc1f;
`
const LeftMenu = () => {
    return (
        <DivRoot>
            <BtnIcon 
                icon="home"
                caption="Home"
                to="/"
            />

            <BtnIcon 
                icon="folderPlus"
                caption="+ Grupo"
                to="/group"
            />

            <BtnIcon 
                icon="coins"
                caption="Despesas"
                to="/expense"
            />
        </DivRoot>
    )
}

export default LeftMenu