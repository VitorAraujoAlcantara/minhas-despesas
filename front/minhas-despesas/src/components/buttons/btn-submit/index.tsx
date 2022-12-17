import Button from "../button";

interface BtnSubmitProps{
    caption: string;
    onClick?: () => void;
}

const BtnSubmit = (props: BtnSubmitProps) => {    
    return (
        <Button
            onClick={e => {
                if ( props.onClick ){
                    props.onClick();
                }
            }  }
            type={props.onClick?'button':'submit'}
        >
            {props.caption}
        </Button>
    )
}

export default BtnSubmit