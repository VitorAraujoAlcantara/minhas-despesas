import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";

const DivRoot = styled.div`
    border: 1px solid #cccccc1f;
    box-shadow:  0px 0px 10px #cccccc07;
    display: flex;
    padding: 10px;
    font-size: 2rem;
`

const HeaderTemplate = () => {
    const appData = useAppSelector( state => state.app)
    return(
        <DivRoot>
            {appData.name} - {appData.version}
        </DivRoot>
    )
}

export default HeaderTemplate