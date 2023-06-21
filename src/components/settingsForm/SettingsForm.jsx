import styled from "styled-components"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { useRef, useState } from "react"
import { ChangePasswordForm } from "../changePasswordForm/ChangePasswordForm"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

export const SettingsForm = () => {
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const changePassRef = useRef();
    useOnClickOutside(changePassRef, () => setChangePasswordModal(false));
    const closePopUp = () =>{
        setChangePasswordModal(false)
    }
    return (<>
        <MainBlock>
            <div>
                <InputName>Имя</InputName>
                <Input inputName={'Имя'} />
            </div>
            <div>
                <InputName>Юзернейм</InputName>
                <Input inputName={'Username'} />
            </div>
            <div>
                <InputName>Эл. почта</InputName>
                <Input inputName={'User@gmail.com'} />
            </div>
            <ButtonWrapper>
                <Button bgColor={'#4F6688'} width={'260px'} text={'Сохранить'} />
                <ChangePassTitle onClick={() => setChangePasswordModal(!changePasswordModal)}>
                    Сменить пароль
                </ChangePassTitle>
            </ButtonWrapper>
        </MainBlock>
        {changePasswordModal && <ChangePasswordForm  ref={changePassRef}/>}
    </>
    )
}

const MainBlock = styled.div`
text-align: left;
`
const InputName = styled.p`
text-align: left;
margin-bottom: 0px;
`
const ButtonWrapper = styled.div`
text-align: left;
`
const ChangePassTitle = styled.span`
margin-left: 84px;
font-family: 'Raleway';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
text-align: right;
text-decoration-line: underline;
color: #4F6688;
cursor: pointer;
`