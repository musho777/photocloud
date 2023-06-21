import { forwardRef, useEffect, useState } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import styled from "styled-components";

export const PasswordRecoveryForm = forwardRef((props, ref) => {
    const [data,setData] = useState()
    useEffect(()=>{
        console.log(props.data)
        let data = [...props.data]
        data[0].value =''
        data[1].value =''
        setData(data)
    },[])
    const handelChage = (e,i) =>{
        let item = [...data]
        item[i].value = e
        setData(item)
    }
    const handelEye = (i) =>{
        let item = [...data]
        item[i].type = !item[i].type
        setData(item)
    }
    return (<BackDiv {...props}>
        <MainBlock ref={ref}>
        <Close onClick={()=>props.close()}>X</Close>
            <RecoveryCodeContent>
                <RecoveryPassText>Восстановление <br />
                    аккаунта</RecoveryPassText>
                <RecoverySubText>
                    Придумайте сложный пароль,содержащий
                    строчные и прописные буквы,а так же цифры
                    и символы
                </RecoverySubText>
                {data?.map((elm,i)=>{
                    return <Input  
                        width = {'100%'}  
                        onEye = {()=>handelEye(i)}  
                        password={elm.password} 
                        errorText = {elm.error}
                        t = {elm.type} 
                        value={elm.value} 
                        error = {elm.error} 
                        key = {i} 
                        onChange = {(e)=>handelChage(e,i)} 
                        inputName={elm.lable}
                     />
                })

                }
                <Button loading = {props.loading} onClick={()=>props.handelNewPassword(data)} mt={'25px'} bgColor={'#4F6688'} text={'Подтвердить'} />
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
height: 495px;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 15px;
position: relative;
@media (max-width: 768px) {
    width:50%;
    box-sizing: border-box;
    padding: 0 20px;
}
@media (max-width: 425px) {
    width:90%;
}
`
const RecoveryCodeContent = styled.div`
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
@media (max-width: 425px) {
    font-size: 25px;
    line-height: 25px;
}
`
const RecoverySubText = styled.p`
margin-top: 0px;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-align: center;
padding: 0 120px;
@media (max-width: 768px) {
    padding: 0;
}
`
const Close = styled.p`
position: absolute;
    right: 15px;
    top:10px;
    margin: 0;
    display: none;
    @media (max-width: 768px) {
        display: block;

    }
`