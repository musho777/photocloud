import styled from "styled-components"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { forwardRef, useEffect, useState } from "react";

export const ChangePasswordForm = forwardRef(({close,handelClick,changeData,error ,loading}, ref) => {
    console.log(close)
    const [data,setData] = useState([
        {value:'',lable:'Старый пароль',error:'',type:true,password:true},
        {value:'',lable:'Новый пароль',error:'',type:true,password:true},
        {value:'',lable:'Повтор пароля',error:'',type:true,password:true},
    ])
    const handelEye = (i) => {
        let item = [...data]
        item[i].type =!item[i].type
        setData(item)
    }
    useEffect(()=>{
        setData(changeData)
    },[data])
    const handelChange = (e,i) =>{
        let item = [...data]
        item[i].value=e
        setData(item) 
    }
    useEffect(()=>{
        let item = [...data]
        item[0].error = error
        setData(item)
    },[loading])
    return (<BackDiv>
        <MainBlock ref={ref}>
            <Close onClick={()=>close()}>X</Close>
            <RegistrationTitle>Cмена пароля</RegistrationTitle>
            <SubText>Придумайте сложный пароль,содержащий
                строчные и прописные буквы,а так же цифры
                и символы</SubText>
            {
                data.map((elm,i)=>{
                    return <Input errorText={elm.error} onEye={()=>handelEye(i)} password={elm.password} t = {elm.type} error={elm.error} onChange={(e)=>handelChange(e,i)} key={i} width={'100%'} inputName={elm.lable} />
                })
            }
                {/* <ErrorText>{error}</ErrorText> */}
            <Button loading ={loading} onClick={()=>handelClick(data)} mt={'10px'} bgColor={'#4F6688'} text={'Сохранить'} />
        </MainBlock>
    </BackDiv>)
});

const BackDiv = styled.div`
background: rgba(255, 255, 255, 0.25);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 8px 18px rgba(24, 39, 75, 0.12);
backdrop-filter: blur(20px);
position: fixed;
top:0px;
right:0px;
bottom:0px;
left:0px;
z-index: 9989;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;

`
const MainBlock = styled.div`
left: 0px;
top: 0px;
z-index: 999;
width: 570px;
height: 506px;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 15px;
position: relative;
@media (max-width: 768px) {
    width:50%;
    box-sizing: border-box;
    padding: 0 20px;
}
@media (max-width: 600px) {
    width:90%;
}
`
const RegistrationTitle = styled.div`
padding-top: 38px;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 47px;
text-align: center;
color: #333333;
@media (max-width: 768px) {
    font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 22px;
line-height: 26px;
}
`

const SubText = styled.p`
font-style: normal;
font-weight: 400;
padding: 0 120px;
font-size: 14px;
line-height: 16px;
text-align: center;
@media (max-width: 768px) {
    padding: 0px;
}
`
const ErrorText = styled.p`
    margin: 0;
    font-size: 12px;
    color: red;
    height: 20px;
`
const Close = styled.p`
position: absolute;
    right: 15px;
    top:10px;
    margin: 0;
`