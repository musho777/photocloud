import styled from "styled-components"
import { ReactComponent as UserIcon } from '../../assets/UserIcon.svg';
import { ReactComponent as UsericoneMobil } from '../../assets/UsericoneMobil.svg';
import { Button } from "../../ui/Button";
import { Registration } from "../registration/Registration";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Login } from "../login/Login";
import { PasswordRecovery } from "../passwordRecovery/PasswordRecovery";
import { RecoveryCode } from "../recoveryCode/RecoveryCode";
import { PasswordRecoveryForm } from "../passwordRecoveryForm/PasswordRecoveryForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear_forgot_password_code, clear_forgot_password_error, clear_login_error, clear_register_error, close_login_popUp, create_new_password, forgot_password_api, forgot_password_code, register_action, verify_email } from "../../store/action/action";
import { VerefayEmail } from "../verefayEmail";

export const Header = () => {
    const [regToggle, setRegToggle] = useState(false)
    const [loginToggle, setLoginToggle] = useState(false)
    const [recoveryToggle, setRecoveryToggle] = useState(false)
    const [recoveryPasswordFormToggle, setRecoveryPasswordFormToggle] = useState(false)
    const [recoveryPasswordForm, setRecoveryPasswordForm] = useState(false)
    const [verefayEmail,setVerefayEmail] = useState(false)
    const [forgotPaswordMail,setForgotPasswordMail] = useState('')
    const [newPassword,setNewPassword] = useState([
        {value:'',lable:'Новый пароль',error:'',password:true,type:true},
        {value:'',lable:'Повтор пароля',error:'',password:true,type:true},
    ])
    const [noteMail,setNotMail] = useState('')
    const [code,setCode] = useState('')

    
    const dispatch = useDispatch()
    const refReg = useRef();
    const logRef = useRef();
    const recRef = useRef();
    const recpasfor = useRef()
    const recpasref = useRef()
    const verRef = useRef();
    const [registerData,setRegisterData] = useState([])
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);
    const {reg} = useSelector(st=>st)
    const {forgotPassword} = useSelector(st=>st)
    const {login} = useSelector((st=>st))
    useOnClickOutside(refReg, () => closeReg());
    useOnClickOutside(logRef, () => closeLogin());
    useOnClickOutside(recRef, () =>closeRecoverPassword());
    useOnClickOutside(recpasfor, () => closeRecoverCode());
    useOnClickOutside(recpasref, () => setRecoveryPasswordForm(false));
    useOnClickOutside(verRef, () => closeVerfeyEmail());

    
      
    // useOnClickOutside(recpasfor, () => setRecoveryPasswordFormToggle(false));
    const closeReg = () =>{
        dispatch(clear_register_error())
        setRegToggle(false)
    }
    const  closeVerfeyEmail = () =>{
        dispatch(clear_register_error())
        setVerefayEmail(false)
    }
    const handleRegToggle = () => {
        dispatch(clear_register_error())
        setRegToggle(!regToggle)
    }
    const closeLogin = () =>{
        setLoginToggle(false)
        dispatch(close_login_popUp())
        dispatch(clear_login_error())
    }
    const closeRecoverPassword =() =>{
        setRecoveryToggle(false)
        dispatch(clear_register_error())
        dispatch(clear_forgot_password_error())
    }
    const closeRecoverCode = () =>{
        dispatch(clear_forgot_password_code())
        setRecoveryPasswordFormToggle(false)
        dispatch(clear_register_error())
    }

    const handleLoginToggle = () => {
        dispatch(clear_register_error())
        setLoginToggle(!loginToggle)
        dispatch(close_login_popUp())

    }

    const handleForgotModal = () => {
        dispatch(clear_register_error())
        setLoginToggle(!loginToggle)
        setRecoveryToggle(!recoveryToggle)
        dispatch(close_login_popUp())

    }
    const openCloseRegisterOpenLogin = () =>{
        dispatch(clear_register_error())
        setRegToggle(false)
        setLoginToggle(true)
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    const handleLoginClick = (item) => {
        let temp =[...item]
        temp.map((elm,i)=>{
            if(elm.lable === 'Имя'){
                if(elm.value === ''){
                    elm.error = 'invalid' 
                }
                else {
                    elm.error = '' 
                }
            }
            if(elm.lable === 'Эл. почта'){
                if(elm.value === ''){
                    elm.error = 'invalid'
                }
                else if(!isValidEmail(elm.value)){
                    elm.error = 'Введите корректный адрес эл. почты' 
                }
                else {
                    elm.error = ''
                }
            }
            if(elm.lable === 'Пароль'){
                if(elm.value === ''){
                    elm.error = 'invalid'
                } 
                else if(elm.value.length<=7){
                    elm.error = 'Пароль должен содержать не менее 8-ти символов'
                }
                else if(elm.value === ''){
                    elm.error = ''
                }
                else {
                    elm.error = ''
                }
            }
            if(elm.lable === 'Юзернейм'){
                if(elm.value === ''){
                    elm.error = 'invalid'
                }
                else {
                    elm.error = ''
                }
            }
            if(elm.lable === 'Повтор пароля'){
                if(elm.value ===''){
                    elm.error = 'invalid'
                }
                else if(elm.value !=='' && elm.value !== temp[3].value){
                    elm.error = 'Пароли не совпадают'
                }
                else {
                    elm.error = ''
                }
            }
            
       
        })
        let error = true
        temp.map((elm,i)=>{                
            if(elm.error){
                error = false
            }
    })
    if(error){
        dispatch(register_action({
            name:temp[0].value,
            username:temp[1].value,
            email:temp[2].value,
            password:temp[3].value,
            password_confirmation:temp[4].value
        }))
    }
        setRegisterData(temp)
        // setRegToggle(!regToggle)
        // setLoginToggle(false)
        // dispatch(register_action())
    }

    const handleRegFromLogin = () => {
        setLoginToggle(false)
        dispatch(close_login_popUp())

        setRegToggle(true)
    }
    const handelRecoveryForm = (e) =>{
        setForgotPasswordMail(e)
        //////////////////////////
        if(!isValidEmail(e)){
            setNotMail('Неправильная эл. почта')
        }
        else {
            setNotMail('')
            dispatch(forgot_password_api({email:e}))

        }
    }
    const handleCloseLoginModal = () => {
        setLoginToggle(false)
        dispatch(close_login_popUp())
        setRegToggle(false)
    }
    const handelRecoveryPassForm = (e) =>{
        setCode(e)
        dispatch(forgot_password_code({email:forgotPaswordMail,code:e}))
    }
   
    const handelNewPassword = (value) =>{
        let item = [...value]
        console.log(item[0].value.length)
        if((item[0].value !== item[1].value )|| item[0].value === '' || item[1].value === '' ||item[0].value.length<8||item[1].value.length<8){
            item[0].error = true
            item[1].error = true
            if(item[0].value.length<8){
                item[0].error = 'Пароль должен содержать не менее 8-ти символов'
            }
            if(item[1].value.length<8){
                item[1].error = 'Пароль должен содержать не менее 8-ти символов'
            }
            if(item[0].value !== item[1].value){
                item[1].error = 'Пароли не совпадают'
            }
        }
        else  {
            item[0].error = false
            item[1].error = false
        }
        setNewPassword(item)
        if(!item[0].error && !item[1].error){
            dispatch(create_new_password({
                email:forgotPaswordMail,
                code:code,
                password:item[0].value,
                password_confirmation:item[1].value
            }))
        }
        // setRecoveryPasswordForm(false)
    }

    const handelVerefyForm = (value) =>{
        dispatch(verify_email({email:registerData[2].value,code:value}))
    }


      useEffect(()=>{
        if(reg.status){
            setLoginToggle(false)
            dispatch(close_login_popUp())
            setRegToggle(false)
            setVerefayEmail(true)
        }
    },[reg.status])

    useEffect(()=>{
        if(reg.status_verif){
            setVerefayEmail(false)
            window.location = '/userProfile'
            setLoginToggle(false)
            dispatch(close_login_popUp())
        }
    },[reg.status_verif])

    useEffect(()=>{
        if(forgotPassword.status){{
        setRecoveryToggle(false)
        setRecoveryPasswordFormToggle(true)
        }}
    },[forgotPassword.status])

    useEffect(()=>{
        if(forgotPassword.statusCode){
            setRecoveryPasswordFormToggle(false)
            setRecoveryPasswordForm(true)
        }
    },[forgotPassword.statusCode])

    useEffect(()=>{
        if(forgotPassword.statusNew){
            setRecoveryPasswordForm(false) 
            setLoginToggle(true)
        }
    },[forgotPassword.statusNew])

    useEffect(()=>{
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
          };
      
          window.addEventListener('resize', handleWindowResize);
      
          return () => {
            window.removeEventListener('resize', handleWindowResize);
          };
    },[])
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(login.open){
            setLoginToggle(true)
        }
    },[login.open])
    const closeModal = () =>{
        closeLogin()
        closeReg()
        closeRecoverPassword()
        closeRecoverCode()
        setRecoveryPasswordForm(false)
        closeVerfeyEmail()
    }
    return (<>
        <HeaderBlock >
            <MainBlock>
                <LogoBlock>
                    <Link style={{ textDecoration: 'none' }} to={token ?'/userProfile':'/'}><LogoTitle>
                        PhotoHosting
                    </LogoTitle></Link>
                </LogoBlock>
                {(token) ? <UserProfileBlock>
                    <UserName>
                        {reg.user.username}
                    </UserName>
                    <UserIconWrapper>
                        {windowSize[0] >= 768 ? <UserIcon /> : <UsericoneMobil />}
                    </UserIconWrapper>
                </UserProfileBlock> : 
                <LoginBlock>
                    <ButtonWrapperLogin><Button onClick={handleLoginToggle} text={'Войти'} txColor={'#4F6688'} width={'230px'}  /></ButtonWrapperLogin>
                    <ButtonWrapperMobile><Button onClick={handleLoginToggle} text={'Войти'} txColor={'#4F6688'} width={'100px'} height ={'35px'} font = {'14px'} /></ButtonWrapperMobile>
                    <ButtonWrapper><Button onClick={handleRegToggle} text={'Зарегистрироваться'} bgColor={'#4F6688'} width={'230px'} ml={'10px'} /></ButtonWrapper>
                </LoginBlock>}
            </MainBlock>
        </HeaderBlock>
        {regToggle && <Registration close = {()=>closeModal()} openLogin = {()=>openCloseRegisterOpenLogin()} error = {reg.error} loading = {reg.loading} registerData = {registerData} ref={refReg} loginBtnCB={(e)=>handleLoginClick(e)} />}
        {loginToggle && <Login close = {()=>closeModal()} ref={logRef} forgotPassCB={handleForgotModal} regCB={handleRegFromLogin} loginCloseCB={handleCloseLoginModal}  />}
        {recoveryToggle && <PasswordRecovery close = {()=>closeModal()} loading = {forgotPassword.loading} error = {noteMail ? noteMail:forgotPassword.error} handelRecoveryForm = {(e)=>handelRecoveryForm(e)} ref={recRef}  />}
        {recoveryPasswordFormToggle  && <RecoveryCode  close = {()=>closeModal()}  forgotPaswordMail = {forgotPaswordMail} error = {forgotPassword.errorCode} loading = {forgotPassword.loadingCode} handelRecoveryPassForm = {(e)=>handelRecoveryPassForm(e)} ref = {recpasfor} />}
        {recoveryPasswordForm && <PasswordRecoveryForm  close = {()=>closeModal()} loading = {forgotPassword.loadingNew} data = {newPassword} handelNewPassword = {(e)=>handelNewPassword(e)} ref = {recpasref}/>}
        {verefayEmail && <VerefayEmail  close = {()=>closeModal()} error = {reg.error_verify_email} email = {registerData[2].value} loading = {reg.loading_verify} click = {(value)=>handelVerefyForm(value)} ref = {verRef}  /> }
    </>
    )
}

const HeaderBlock = styled.div`
height: 100px;
display: flex;
justify-content: center;
align-items: center;
background: #FFFFFF;
border-bottom: 1px solid #BEBEBE;
@media (max-width: 768px) {
    height: 60px;
  }
`
const MainBlock = styled.div`
display:flex;
max-width: 1170px;
align-items: center;
width: 95%;
justify-content: space-between;
`
const LogoBlock = styled.div`

`
const LogoTitle = styled.span`
text-decoration: none;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 35px;
color: #4F6688;
cursor: pointer;
@media (max-width: 768px) {
    font-size: 20px;
  }
`
const UserProfileBlock = styled.div`
display: flex;
align-items: center;
`
const UserName = styled.span`
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 21px;
text-align: right;
font-feature-settings: 'pnum' on, 'lnum' on;
color: #333333;
margin-right: 13px;
cursor: pointer;
display:block;
@media (max-width: 768px) {
    display: none;
  }

`
const UserIconWrapper = styled.div`
cursor: pointer;
`

const LoginBlock = styled.div`
display: flex;
`
const ButtonWrapper = styled.div `
@media (max-width: 768px) {
    display: none;
  }
`
const ButtonWrapperMobile = styled.div`
display: none;
@media (max-width: 768px) {
    display: block;
  }
`
const ButtonWrapperLogin = styled.div `
display: block;
@media (max-width: 768px) {
    display: none;
  }
`