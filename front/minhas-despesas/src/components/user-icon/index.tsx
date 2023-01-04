import styled from "styled-components";

const DivRoot = styled.div`
    display: flex;
    margin: 0px 10px;    
    justify-content: flex-end;
    flex: 1;
`

const Circle = styled.div`    
    background-color: ${props => props.theme.palette.primary.main};
    border-radius: 50%;
    padding: 5px;
    font-size: 1rem;
    color: ${props => props.theme.palette.primary.contrastText};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
        filter: opacity(0.5);
    }
`

interface UserIconProps {
    userName: string;

}

const UserIcon = (props: UserIconProps) => {
    const firstLetter = props.userName.length ? props.userName.charAt(0) : '';
    return (
        <DivRoot>
            <Circle>
                {firstLetter}
            </Circle>
        </DivRoot>
    )
}

export default UserIcon