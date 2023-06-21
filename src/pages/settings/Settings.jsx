import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ChangePasswordForm } from "../../components/changePasswordForm/ChangePasswordForm"
import { Button } from "../../ui/Button"
import { Input } from "../../ui/Input"
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useDispatch, useSelector } from "react-redux"
import { change_code, change_email, change_username_and_name, clear_success_chnage_date, open_popup_change_password, update_user_password } from "../../store/action/action"
import { ChangeEmailForm } from "../../components/changeEmailForm"
import { ReactComponent as Vectore } from '../../assets/Vectore.svg';
import { Slider } from "../../components/Slider"


export const Settings = () =>{
    const [changePasswordToggle, setChangePasswordToggle] = useState(false)
    const refReg = useRef()
    const refcode = useRef()
    const {reg} = useSelector((st)=>st)
    const {changeData} = useSelector(st=>st)
    const [changeMail,setChangeMail] = useState(false)
    const [succes,setSuccess] = useState('')
    const [windowSize, setWindowSize] = useState(getWindowSize())
    function getWindowSize() {
      const { innerWidth, innerHeight } = window
      return { innerWidth, innerHeight }
    }
    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize())
      }
      window.addEventListener('resize', handleWindowResize)
      return () => {
        window.removeEventListener('resize', handleWindowResize)
      }
    }, [])
    console.log(windowSize.innerWidth)
    useOnClickOutside(refReg, () => closeChangePassword());
    useOnClickOutside(refcode, () => setChangeMail(false));

    const dispatch = useDispatch()
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    const [data,setData] = useState([
        {value:'',lable:'Имя',error:''},
        {value:'',lable:'Юзернейм',error:''},
        {value:'',lable:'Эл. почта',error:''},
    ])
    const[prevData,setPrevData] = useState([
        {value:'',lable:'Имя',error:''},
        {value:'',lable:'Юзернейм',error:''},
        {value:'',lable:'Эл. почта',error:''},
    ])
    const [chnagePassword,setChnagePassword] = useState([
        {value:'',lable:'Старый пароль',error:'',password:true,type:true},
        {value:'',lable:'Новый пароль',error:'',password:true,type:true},
        {value:'',lable:'Повтор пароля',error:'',password:true,type:true},
    ])
    const closeChangePassword = () =>{
        setChnagePassword([
        {value:'',lable:'Старый пароль',error:'',password:true,type:true},
        {value:'',lable:'Новый пароль',error:'',password:true,type:true},
        {value:'',lable:'Повтор пароля',error:'',password:true,type:true},
        ])
        setChangePasswordToggle(false)
    }
    const sendCode = (value) =>{
        if(value.lenght !== ''){
            dispatch(change_code({code:value}))
        }
    }


    const handelClick = (value) =>{
        let item = [...value]
        if(item[0].value === ''){
            item[0].error = true
        }
        else {
            item[0].error = false
        }
        if((item[1].value !== item[2].value) || item[1].value === ''||item[2].value === '' ||item[1].value.length<8|| item[2].value.length<8 ){
            item[1].error = true
            item[2].error = true
            if(item[1].value.length<8 && item[1].value !==''){
                item[1].error = 'Пароль должен содержать не менее 8-ти символов'
            }
            if(item[2].value.length<8 && item[1].value !==''){
                item[2].error = 'Пароль должен содержать не менее 8-ти символов'
            }
            if(item[1].value !== item[2].value){
                item[2].error = 'Пароли не совпадают'
            }
        }
        else {
            item[1].error = false
            item[2].error = false
        }
        if(!item[1].error && !item[0].error && !item[2].error){
            dispatch(update_user_password({
                old_password:item[0].value,
                password:item[1].value,
                password_confirmation:item[2].value
            }))
        }
        setChnagePassword(item)
        // setChangePasswordToggle(false)
    }
    useEffect(()=>{
        let item = [...data]
        let item2 = [...prevData]
        item[0].value = reg.user.name
        item[1].value = reg.user.username
        item[2].value = reg.user.email
        item2[0].value = reg.user.name
        item2[1].value = reg.user.username
        item2[2].value = reg.user.email
        setData(item)
        setPrevData(item2)
    },[reg.user])
    const hadnelClick = (e,i) =>{
        let item =[...data]

        if(i === 1){
            if(e.length<20){
                item[i].value =  e
            }
        }
        else {
            item[i].value =  e
        }
        setData(item)
    }
    useEffect(()=>{
        if(changeData.changePasswordstatus){
            setChangePasswordToggle(false)
        }
    },[changeData.changePasswordstatus])
    useEffect(()=>{
        console.log(changeData.status)
        if(changeData.status){
            setSuccess('Ваши изменения успешно сохранены')
            const timer = setTimeout(() => {
                setSuccess('')       
              }, 1500);
              return () => clearTimeout(timer);
        }

    },[changeData.status])
    useEffect(()=>{
        dispatch(clear_success_chnage_date())
    },[])
    const handelClickSave = () =>{
        let send = false
        let item = [...data]
        if(item[0].value !==prevData[0].value || item[1].value !== prevData[1].value){
            if(item[0].value === ''){
                send = false
                item[0].error = true
            }
            else {
                item[0].error = false
            }
            if(item[1].value === ''){
                send = false
                item[1].error = true
            }
            else {
                item[1].error = false
            }
            if(item[0].value !=='' && item[1].value !==''){
                send = true
            }
        }
        if(send){
            dispatch(change_username_and_name({name:data[0].value,username:data[1].value}))
        }
        if(item[2].value !== prevData[2].value){
            // setChangeMail(true)
            if(!isValidEmail(item[2].value)){
                item[2].error = true
            }
            else {
                item[2].error = false
                dispatch(change_email({email:item[2].value}))
            }
        }
        setData(item)

    }
    useEffect(()=>{
        // dispatch(chan)
        if(changeData.changeEmailStatus){
            setChangeMail(true)
        }
    },[changeData.changeEmailStatus])
    useEffect(()=>{
        if(changeData.stautsCode){
            setChangeMail(false)
        }
    },[changeData.stautsCode])
    useEffect(()=>{
        setChangeMail(false)
    },[])
    return <>
        <Div>
            <Slider />
        </Div>
        <Title onClick = {()=>window.location = ('/userProfile')}><Vectore /> Настройки</Title>
        <MainBlock>
            <Block>
                <Content>
                    <InputWrapper>  
                        <Lable>Имя</Lable>
                        <Input  max = {windowSize.innerWidth>768?"500px":"100%"} width = {windowSize.innerWidth>768?"500px":"100%"} error={data[0].error} value={data[0].value} onChange ={(e)=>hadnelClick(e,0)}  inputName={'Имя'} />
                    </InputWrapper>
                    <InputWrapper>
                        <Lable>Юзернейм</Lable>
                        <Input max = {windowSize.innerWidth>768?"500px":"100%"} width = {windowSize.innerWidth>768?"500px":"100%"}  error={data[1].error} value={data[1].value} onChange ={(e)=>hadnelClick(e,1)}   inputName={'Username'} />
                    </InputWrapper>
                    <InputWrapper>
                        <Lable>Эл. почта</Lable>
                        <Input max = {windowSize.innerWidth>768?"500px":"100%"} width = {windowSize.innerWidth>768?"500px":"100%"} error={data[2].error} value={data[2].value} onChange ={(e)=>hadnelClick(e,2)}  inputName={'User@gmail.com'} />
                    </InputWrapper>
                    <TextMobile onClick={()=>{
                        dispatch(open_popup_change_password())
                        setChangePasswordToggle(true)

                    }
                    }>Сменить пароль</TextMobile>
                    <SuccessText>{succes}</SuccessText>
                    <ButtonWrapper>
                        <Button loading = {changeData.loading} onClick={(e)=>handelClickSave(e)}  text={'Сохранить'} bgColor={'#4F6688'} width={'230px'} ml={'10px'} />
                        <Text onClick={()=>{
                            dispatch(open_popup_change_password())
                            setChangePasswordToggle(true)}}
                        >Сменить пароль</Text>
                    </ButtonWrapper>
                </Content>
            </Block>
        </MainBlock>
        {changePasswordToggle && <ChangePasswordForm close = {()=>closeChangePassword()} error = {changeData.error} loading= {changeData.changePasswordLoading} changeData = {chnagePassword} handelClick = {(data)=>handelClick(data)} ref = {refReg} />}
        {changeMail && <ChangeEmailForm error = {changeData.errorCode} loading = {changeData.codeLoading} handelRecoveryForm = {(e)=>sendCode(e)} ref = {refcode}/>}
    </>
}
const MainBlock = styled.div`
display:flex;
max-width: 1170px;
min-height: 450px;
width: 95%;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 10px;
height: 100px;
margin: auto;
margin-top: 25px;
@media (max-width: 768px) {
    width: 50%;
  }
  @media (max-width: 425px) {
    width: 90%;
  }
`
const Block = styled.div`
    width: 50%;
    @media (max-width: 768px) {
        width: 100%;
      }
`
const Content = styled.div`
margin: 15px;
height: 100%;
`
const InputWrapper = styled.div`
display: flex;
flex-direction: column;
@media (max-width: 768px) {
    }
`
const Lable = styled.label `
color:#5B5B5B;
text-align: start;
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 18px;
margin-bottom: -5px;    
cursor: pointer;
`
const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-top: 20px;
width: 500px;
@media (max-width: 768px) {
    justify-content: center;
    width: 100%;

}
`
const Text = styled.p `
    cursor: pointer;
    color:#4F6688;
    font-style: normal;
    font-size: 16px;
    line-height: 19px;
    border-bottom: 1px solid #4F6688;
    display: block;
    @media (max-width: 768px) {
        display: none;
      }
`
const TextMobile = styled.p `
    display: none;

    @media (max-width: 768px) {
        display: block;
        text-align: end;
        color:#4F6688;
        font-style: normal;
        font-size: 16px;
        line-height: 19px;
        margin-bottom:0;
        text-decoration: underline;
        // width: 120px;

      }
`
const Br = styled.div `
    width: 120px;
    border-bottom: 1px solid #4F6688;
    position: absolute;
    right: 24px;
    display: none;
    @media (max-width: 768px) {
        display: block;
      }
`
const Title = styled.p `
    cursor: pointer;
    text-align: left;
    max-width: 1170px;
    width: 95%;
    margin: auto;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 35px;
    color: #333333;
    margin: 20px auto;
`
const SuccessText = styled.p `
    height: 20px;
    color: #059f05;
    @media (max-width: 768px) {
        font-size: 13px;
    }
`
const Div = styled.div `
    margin-top: 20px;
`