import styled from "styled-components";

const DivRoot = styled.div`
    display: flex;
    margin: 0px 10px;    
    justify-content: flex-end;
    align-items: center;
    flex: 1;
`

const Circle = styled.div`    
    background-color: ${props => props.theme.palette.primary.main};
    border-radius: 50%;
    padding: 5px;
    font-size: 0.8rem;
    color: ${props => props.theme.palette.primary.contrastText};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
        filter: opacity(0.5);
    }
    filter: drop-shadow(1px 1px 3px ${props => props.theme.palette.primary.main});
`

interface UserIconProps {
    userName: string;
    onClick?: () => void;
}

const UserIcon = (props: UserIconProps) => {
    const firstLetter = props.userName.length ? props.userName.charAt(0) : '';
    return (
        <DivRoot>
            <Circle
                onClick={
                    e => {
                        if (!props.onClick) {
                            return;
                        }

                        props.onClick();
                    }
                }
            >
                {firstLetter}
            </Circle>
        </DivRoot>
    )
}

export default UserIcon