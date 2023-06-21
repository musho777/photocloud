import { forwardRef, useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { create_folder } from "../../store/action/action";

export const CreateFolderForm = forwardRef(({ close,forgotPassCB, regCB,loading,prId }, ref) => {
    const [value,setValue] = useState('')
    const dispatch = useDispatch()
    const [error,setError] = useState(false)
    const handelChange = () =>{
        if(value){
            setError('')
            dispatch(create_folder({name:value,parent_id:prId}))
        }
        else {
            setError('Данное поле обязательно')
        }
    }
    return (<BackDiv>
            <MainBlock ref={ref}>
            <Close onClick={()=>close()}>X</Close>
                <Content>

                    <RegistrationTitle>Создать папку</RegistrationTitle>
                    <Input  errorText={''} error={error} value={value} onChange ={(e)=> 
                        
                        e.length<20 && setValue(e)
                        } width={'100%'} inputName={'Название папки'} />
                    <ErrorText>{error}</ErrorText>
                    <Button loading ={loading} onClick={()=>handelChange()}  mt ={'10px'} bgColor={'#4F6688'} text={'Создать'} />
                </Content>
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
height: 299px;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 15px;
position: relative;
@media (max-width: 768px) {
    width:50%;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: center;
    display: flex;
}
@media (max-width: 600px) {
    width:90%;
}
}
`

const Content = styled.div`
width: 100%
`
const RegistrationTitle = styled.div`

padding-top: 38px;
padding-bottom: 15px;
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 47px;
text-align: center;
color: #333333;
@media (max-width: 768px) {
    padding-top: 10px;
    font-size: 20px;
}
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