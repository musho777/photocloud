import { ClipLoader } from "react-spinners"
import FadeLoader from "react-spinners/FadeLoader"
import styled from "styled-components"

export const Button = ({
    onClick,
    text,
    bgColor,
    txColor,
    width,
    height,
    mt,
    ml,
    mb,
    font,
    loading = false,
    disabled
}) => {
    return (<>
        <UIbutton disabled = {loading||disabled} font = {font} onClick={onClick} height={height} mt={mt} ml={ml} bgColor={bgColor} txColor={txColor} width={width} mb={mb}>{text}
        <div style={{position:'absolute', top:'16px',button:'0',margin:'auto',right: '15px'}}>
            <ClipLoader
                color={'white'}
                loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
        </UIbutton>
    </>)
}

export const UIbutton = styled.button`
position:relative;
border: 2px solid #4F6688;
margin-left: ${props => props.ml ? props.ml : '0px'};
margin-bottom: ${props => props.mb ? props.mb : '0px'};
margin-top: ${props => props.mt ? props.mt : '0px'};
background: ${props => props.bgColor ? props.bgColor : 'none'};
border-radius: 8px;
width: ${props => props.width ? props.width : '260px'};
height: ${props => props.height ? props.height : '50px'};
color: ${props => props.txColor ? props.txColor : '#FFFFFF'};
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size:${props => props.font ? props.font : '17px'};
line-height: 20px;
cursor: pointer;
:hover{
    background: rgb(90 112 145);
    border:rgb(90 112 145);
    color:white;
}
@media (max-width: 425px) {
    width:100%;
}
`
