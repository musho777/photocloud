import { forwardRef, useState } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import styled from "styled-components";

export const ChangeEmailForm = forwardRef((props, ref) => {
    const [value,setValue] = useState('')
    return (<BackDiv {...props}>
        <MainBlock ref={ref}>
            <RecoveryContent>
                <RecoveryPassText>код для подтверждения  <br />новый эл. почты
                    </RecoveryPassText>
                <RecoverySubText>
                    Мы отправим 4-х значный код на вашу эл.почту для подтверждения личности
                </RecoverySubText>
                <Input value={value} onChange = {(e)=>setValue(e)} inputName={'Эл. почта'} />
                <ErrorText>{props.error}</ErrorText>
                <Button loading = {props.loading} onClick={()=>props.handelRecoveryForm(value)} mt={'20px'} bgColor={'#4F6688'} text={'Отправить код'} />
            </RecoveryContent>
        </MainBlock>
    </BackDiv>)
});

const MainBlock = styled.div`
left: 0px;
top: 0px;
z-index: 999;
width: 570px;
height: 400px;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 15px;
@media (max-width: 768px) {
    width:90%;
    box-sizing: border-box;
    padding: 0 20px;
}

`
const RecoveryContent = styled.div`
padding-top: 38px;
`
const RecoveryPassText = styled.p`
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 35px;
line-height: 41px;
text-align: center;
color: #333333;
margin-bottom: 9px;
margin-top: 0px;

`
const RecoverySubText = styled.p`
margin-top: 0px;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-align: center;
color: #333333;
margin: 15px 50px;
@media (max-width: 768px) {
    margin: 15px 0;

}
`
const BackDiv = styled.div`
background: rgba(255, 255, 255, 0.25);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 8px 18px rgba(24, 39, 75, 0.12);
backdrop-filter: blur(20px);
position:absolute;
top:0px;
right:0px;
bottom:0px;
left:0px;
z-index: 9989;
display: flex;
justify-content: center;
align-items: center;
`
const ErrorText = styled.p`
    margin: 0;
    font-size: 14px;
    color: red;
    height: 20px;
`