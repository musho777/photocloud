import React from "react"
import styled from "styled-components"
import { Button } from "../../ui/Button"
import { Footer } from "../../components/footer/Footer"
import { Link } from "react-router-dom"
import { Slider } from "../../components/Slider"

export const MiddleInfo = () => {
    return (
    <>
        <Div >
            <Slider />
        </Div>
        <MainDiv>
            <MainTitle >Загружайте и делитесь изображениями</MainTitle>
            <MainText>Начните загружать изображения простым перетаскиванием в любое место окна прямо сейчас. Ограничение на размер изображения 32 MB. После загрузки, Вам будут доступны прямые ссылки, BB-коды и миниатюры.</MainText>
          <Link to={'/createFolder'} > <Button text={'Начать загрузку'} bgColor={'#4F6688'} /></Link>
        </MainDiv>
        <Footer/>
    </>
    )
}

export const MainDiv = styled.div`
height: calc(100vh - 450px);
justify-content: center;
align-items: center;
display: flex;
flex-direction: column;
margin: auto;
width:55%;
@media (max-width: 768px) {
    width:100%;
    height: calc(100vh - 300px);
}
`
export const MainTitle = styled.span`
font-family: 'Raleway';
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 47px;
text-align: center;
color: #4F6688;

@media (max-width: 768px) {
    line-height: 33px;
    font-size: 28px;
}
`
export const MainText = styled.p`
font-style: normal;
font-family: 'Raleway';
font-weight: 500;
font-size: 22px;
line-height: 26px;
text-align: center;
font-feature-settings: 'pnum' on, 'lnum' on;
color: #333333;
margin-left: auto;
margin-right: auto;
margin-bottom: 65px;
width: 44em;
@media (max-width: 768px) {
    font-size: 16px;
    width: 90%; 
    line-height: 19px;
}
`
const Div = styled.p`
margin-top:100px;
@media (max-width: 768px) {
    margin-top:50px;
}
`