import { forwardRef } from "react"
import styled from "styled-components"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Button } from "../../ui/Button"
import { Input } from "../../ui/Input"

export const Shear = forwardRef(({id,handelCloseHSare},ref) =>{
    return (<BackDiv>
        <MainBlock ref ={ref}>
        <RecoveryContent>
            <RecoveryPassText>Поделиться</RecoveryPassText>
            <Input width={'100%'} disabled value={`${ window.location.protocol + "//" + window.location.host}/img/${id}`}  />
            <CopyToClipboard text  = {`${ window.location.protocol + "//" + window.location.host}/img/${id}`}>
            <Button   text ={'Копировать'} bgColor = '#4F6688' />
            </CopyToClipboard>
        </RecoveryContent>
        </MainBlock>
    </BackDiv>)
})


const MainBlock = styled.div`
left: 0px;
top: 0px;
z-index: 999;
width: 570px;
min-height: 270px;
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
const Card = styled.div`
width: 98px;
height: 98px;
border-radius: 10px;
margin: 10px 20px;
position: relative;
`
const CardImg = styled.img `
width: 98px;
height: 98px;
border-radius: 10px;
`
const CardWrapper = styled.div `
display: flex;
flex-wrap: wrap
`
const Close = styled.div`
position: absolute;
margin: 0;
background: #FFFFFF;
font-size: 13px;
border: 1px solid rgba(190, 190, 190, 0.2);
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 29px;
right: -8px;
margin: auto;
top: -12px;
width: 25px;
justify-content: center;
align-items: center;
display: flex;
height: 25px;
`