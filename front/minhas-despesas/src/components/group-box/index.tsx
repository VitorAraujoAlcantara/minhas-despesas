import styled from "styled-components";

export const GroupBox = styled.fieldset`
    border: 1px solid ${props => props.theme.palette.secondary.main};
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`