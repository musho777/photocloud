import { forwardRef, useEffect, useState } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {resend_verify_mail} from '../../store/action/action'
export const VerefayEmail = forwardRef((props, ref) => {
    const [value,setValue] = useState('')
    const dispatch = useDispatch()
    const [counter, setCounter] = useState(60);
    const [active,setActive] = useState(false)
    const handelChange = (e) =>{
        if(e.length<7){
            setValue(e)
        }
    }
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
        if(timer){
            setActive(true)
        }
        else {
            setActive(false)
        }
        return () => clearInterval(timer)
    }, [counter])
    return (<BackDiv {...props}>
        <MainBlock ref={ref}>
            <RecoveryCodeContent>
                <RecoveryPassText>Подтверждения<br />
                    аккаунта</RecoveryPassText>
                <RecoverySubText>
                    Введите код подтверждения
                </RecoverySubText>
                <Input error={props.error} errorText = {props.error} maxlength ={999999} t = 'number' value={value} onChange ={(e)=>handelChange(e)} inputName={'Код подтверждения'} />
                {/* <ErrorText>{props.error}</ErrorText> */}
                {!active?<Text onClick={()=>{setValue('')
                    setCounter(60)
                    dispatch(resend_verify_mail({email:props.email}))}
                    }>Отправить код повторно</Text>:
                <Text1> Отправить код повторно : {counter}</Text1>}
                <Button loading = {props.loading} onClick={()=>props.click(value)} mt={'0px'} bgColor={'#4F6688'} text={'Подтвердить'} />
            </RecoveryCodeContent>
        </MainBlock>
    </BackDiv>)
});

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
const MainBlock = styled.div`
left: 0px;
top: 0px;
z-index: 999;
width: 570px;
height: 370px;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 15px;
@media (max-width: 768px) {
    width:90%;
    box-sizing: border-box;
    padding: 0 20px;
}
`
const RecoveryCodeContent = styled.div`
padding-top: 38px;
position: relative;
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
`
const Text = styled.p`
    margin:10px, 0;
    cursor: pointer;
    font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 15px;
text-align: center;
color:#4F6688
`
const Text1 = styled.p`
margin:10px, 0;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 15px;
text-align: center;
color:#4F6688
`
const ErrorText = styled.p`
    margin: 0;
    font-size: 14px;
    color: red;
    height: 20px;
`