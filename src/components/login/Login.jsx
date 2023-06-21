import { forwardRef, useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_action } from "../../store/action/action";

export const Login = forwardRef(({close, forgotPassCB, regCB, loginCloseCB,register }, ref) => {
    const dispatch = useDispatch()
    const {login}= useSelector((st)=>st)
    const  [data,setData] = useState([
        {value:'',lable:'Юзернейм',error:false},
        {value:'',lable:'Пароль',error:false,password:true,type:true},
    ])
    const handleCloseModal = (data) => {
        let send = true
        let item = [...data]
        item.map((elm,i)=>{
            if(elm.value=== ''){
                elm.error = true
            }
            else {
                elm.error = false
            }
        })
        item.map((elm,i)=>{
            if(elm.error){
                send = false
            }
        })

        if(send){
            dispatch(login_action({username:data[0].value,password:data[1].value}))
        }
        setData(item)
    }
    const handelEye = (i) =>{
        let item = [...data]
        item[i].type = !item[i].type
        setData(item)
    }
    const handelChange = (e,i) =>{
        let item = [...data]
        item[i].value = e
        setData(item)
    }
    return (<BackDiv>
        <MainBlock ref={ref}>
            {/* <Content> */}
            <Close onClick={()=>close()}>X</Close>
                <RegistrationTitle>Вход</RegistrationTitle>
                {data.map((elm,i)=>(
                    <Input 
                        onKeyDown = {()=>handleCloseModal(data)}
                        password={elm.password} 
                        t = {elm.type} 
                        onEye={()=>handelEye(i)} 
                        error={elm.error} key={i} 
                        onChange={(e)=>handelChange(e,i)} 
                        width = {'100%'} 
                        inputName={elm.lable} 
                        value = {elm.value} />
                ))

                }
                <ForgotPasswordText onClick={forgotPassCB}>Забыли пароль</ForgotPasswordText>
                <ErrorText>{login.error}</ErrorText>
                <Button loading = {login.loading} onClick={()=>handleCloseModal(data)} mt={'5px'} bgColor={'#4F6688'} text={'Войти'} />
                <BtnSubText>Нет аккаунта ? <LoginText onClick={regCB} >Зарегистрироваться</LoginText></BtnSubText>
            {/* </Content> */}
        </MainBlock>
    </BackDiv>)
});

const BackDiv = styled.div`
background: rgba(255, 255, 255, 0.25);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 8px 18px rgba(24, 39, 75, 0.12);
backdrop-filter: blur(20px);
position:fixed;
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
height: 419px;
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
    box-sizing: border-box;
    padding: 0 20px;
}
`
const Content = styled.div`

`
const LoginText = styled.span`
color: #4F6688;
cursor: pointer;
`
const ForgotPasswordText = styled.p`
margin-top: 0px;
margin-right: 115px;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 13px;
line-height: 15px;
text-align: right;
text-decoration-line: underline;
color: #333333;
cursor: pointer;
@media (max-width: 768px) {
    margin-right: 0;
}
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
const RegistrationTitle = styled.div`
padding-top: 38px;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 47px;
text-align: center;
color: #333333;
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