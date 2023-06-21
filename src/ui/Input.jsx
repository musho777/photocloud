import styled from "styled-components"
import { ReactComponent as Eye } from '../assets/eye.svg';

export const Input = ({
    inputName,
    width,
    value,
    onChange,
    error,
    max,
    errorText,
    password,
    disabled,
    onEye,
    t,
    maxlength,
    onKeyDown = ()=>{},
}) => {
    return (
        <>  
            <InputProvider   max = {max} width = {width}>
                <UIInput  
                    onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                            onKeyDown()
                        }
                    }}
                    disabled = {disabled}
                    type = {t==='number'?'number':(t?"password":"text")} 
                    max = {max} 
                    error = {error}  
                    onChange ={(e)=>onChange ?onChange(e.target.value):{}} 
                    value = {value} 
                    width = {width}  
                    placeholder={inputName} 
                    />
                <EyeProvider>
                    {password && <Eye onClick={onEye}/>}
                </EyeProvider>
            <ErrorText max = {max} width = {width} >{errorText !== 'invalid' ?errorText:''}</ErrorText>
            </InputProvider>
        </>
    )
}

export const UIInput = styled.input`
width: ${props => props.width ? props.width : '350px'};
max-width: ${props => props.max ? props.max : '350px'};
padding:15px 15px;
margin: 12px 0;
box-sizing: border-box;
padding-right: ${props => props.type === 'password' ? '35px':'15px'};
border: ${props =>props.error ? '1px solid red':'1px solid #BEBEBE'} ;
border-radius: 8px;
color: black;
::-webkit-input-placeholder {
    color: black;
  }
@media (max-width: 768px) {
    max-width:350px;
    width:100%;
}
`
export const ErrorText = styled.p`
    margin: 0;
    font-size: 14px;
    color: red;
    width: ${props => props.width ? props.width : '350px'};
    max-width: ${props => props.max ? props.max : '350px'};
    margin: auto;
    height: 10px;
    margin-top: -10px;
    margin-bottom: 10px;
    text-align: left; 
    @media (max-width: 768px) {
        max-width:350px;
        width:100%;
    }
    @media (max-width: 425px) {
        font-size: 10px;
        line-height: 10px;
    }
`
export const EyeProvider = styled.div `
position: absolute;
    top: 25px;
    margin: auto;
    right: 12px;
    cursor: pointer;
`
export const InputProvider = styled.div`
    position: relative;
    width: ${props => props.width ? props.width : '350px'};
    max-width: ${props => props.max ? props.max : '350px'};
    margin: auto;
    @media (max-width: 768px) {
        max-width:350px;
        margin: 0;
    }
`