import styled from "styled-components";
import { BoxBottom } from "../../box";

const FormHeader = styled(BoxBottom)`
    display: flex;
    font-size: 1rem;    
    padding: 10px;    
    background-color: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.secondary.contrastText};
`

export const FormHeaderDanger = styled(FormHeader)`     
    background-color: ${props => props.theme.palette.danger.main};
    color: ${props => props.theme.palette.danger.contrastText};
`

export default FormHeader