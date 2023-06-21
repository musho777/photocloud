import styled from "styled-components"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const    Registration = forwardRef(({close, loginBtnCB,registerData,loading,error,openLogin }, ref) => {
    const [data,setData] = useState([
        {value:'',error:'',lable:'Имя'},
        {value:'',error:'',lable:'Юзернейм'},
        {value:'',error:'',lable:'Эл. почта'},
        {value:'',error:'',lable:'Пароль',password:true,type:true},
        {value:'',error:'',lable:'Повтор пароля',password:true,type:true},
    ])
    const {reg} = useSelector((st)=>st)

    const handelChange = (v,i) =>{
        let item = [...data]
        if(item[i].lable === 'Юзернейм'){
            if(item[i].value.length<20){
                item[i].value = v
            }
        }
        else {
            item[i].value = v
        }
        setData(item)
    }
    const handelEye = (i) => {
        let item = [...data]
        item[i].type =!item[i].type
        setData(item)
    }
    useEffect(()=>{
        if(error !==''){
            let item = [...data]
            console.log(error)
            if(error === 'Такой пользователь уже существует'){
                item[1].error = 'Такой пользователь уже существует'
            }
            else {
                item[1].error = ''
            }
            if(error !=='Такой пользователь уже существует') {
                item[2].error = 'Этот эл. адрес уже зарегистрирован.'
            }
            else {
                item[2].error = ''
            }
            setData(item)
        }
    },[loading])
    return (<BackDiv>
        <MainBlock ref={ref}>
            <Close onClick={()=>close()}>X</Close>
            <RegistrationTitle>Регистрация</RegistrationTitle>
            {
                data.map((elm,i)=>{
                    return <Input 
                        onKeyDown = {()=>loginBtnCB(data)}
                        onEye = {()=>handelEye(i)} 
                        password={elm.password} 
                        t = {elm.type} 
                        errorText ={elm.error } 
                        error = {elm.error !== ''} 
                        value={elm.value} 
                        key = {i} 
                        onChange={(e)=>handelChange(e,i)} 
                        width={'100%'} 
                        inputName={elm.lable} 
                    />
                })
            }
            {/* <ErrorText>{error}</ErrorText> */}
            <Button loading = {loading} mt={'10px'} bgColor={'#4F6688'} text={'Зарегистрироваться'} onClick={()=> loginBtnCB(data)}/>
            <BtnSubText>Уже зарегистрировались? <LoginText onClick={openLogin} >Войти</LoginText></BtnSubText> </MainBlock>
    </BackDiv>)
});
// userProfile

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

`
const MainBlock = styled.div`
left: 0px;
top: 0px;
z-index: 999;
width: 570px;
height: 623px;
background: #FFFFFF;
font-weight: 600;
position: relative;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 15px;
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
font-style: normal;
font-family: 'Raleway';
font-size: 40px;
line-height: 47px;
text-align: center;
color: #333333;
`
const BtnSubText = styled.p`
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 15px;
text-align: center;
color: #333333;

`
const LoginText = styled.span`
color: #4F6688;
cursor: pointer;
`
const ErrorText = styled.p`
    margin: 0;
    font-size: 14px;
    color: red;
    height: 20px;
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