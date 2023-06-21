import Multiselect from "multiselect-react-dropdown";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { add_photo } from "../../store/action/action";
import { Button } from "../../ui/Button";

import './style.css'
export const AddPhoto = forwardRef(({close,id,loading,length},ref) =>{
    const dispatch = useDispatch()
    const [image, setImage] = useState([])
    const [array,setArray] = useState([])
    const [error,setError] = useState(false)
    const [largeSize,setLargeSize] = useState([])
    const CloseItem = (i,el) =>{
        let item = [...array]
        let item2 = [...image]
        let item3 = [...largeSize]

        item.splice(i,1)
        item2.splice(i,1)
        if(item3.includes(el)){
            let index = item3?.findIndex((element) => element === el)
            console.log(index)
            item3.splice(index, 1)
        }
        if(item.length+length<=8){
            setError(false)
        }
        setArray(item)
        setImage(item2)
        setLargeSize(item3)
    } 
    const showImg = (event) =>{
        let img;
        let itme = [...array]
        let errorSize = [...largeSize]
        img = (event.target.files.length);
        let arr = Array(img).fill(0);
        
        let count = 8-(length+itme.length)
           arr =  arr.map((el,i)=>{
            let url =URL.createObjectURL(event.target.files[i])
            itme.push(url)
            if(event.target.files[i]?.size/1000000>2){
                errorSize.push(url)
            }
            return event.target.files[i]
        })

        setArray(itme)
        setImage(arr)
        setLargeSize(errorSize)
        var element = document.getElementById("lable");
        if(itme.length){
            element.classList.remove("drop-container2");
            element.classList.add("drop-container");
        }
        if((length+arr.length)>8){
            setError(true)
        }
        else if(length+itme.length>8){
            setError(true)
        }
        else {
            setError(false)
        }

    }
    const [multyData,setMultyData] = useState([
        {name: 'Никогда не удалять'},
        {name: '1 день', id: 1},
        {name: '7 дней', id: 7},
        {name: '14 дней', id: 14},
        {name: '30 дней', id: 30},
        {name: '60 дней', id: 60},

    ])
    const [day,setDay] = useState(null)
    const sendData = () =>{
        const formData = new FormData()
        image.map((elm,i)=>{
            formData.append('file[]',elm)
        })
        formData.append('day',day)
        if(id){
            formData.append('folder_id',id)
        }
        if(!largeSize.length){
            dispatch(add_photo(formData))
        }
        var element = document.getElementById("lable");
        if(!array.length){
            element.classList.remove("drop-container");
            element.classList.add("drop-container2");
        }
        else {
            element.classList.remove("drop-container2");
            element.classList.add("drop-container");
        }
    }
    return <BackDiv>
        <MainBlock ref  = {ref}>
        <RecoveryContent>
        <Close1 onClick={()=>close()}>X</Close1>
            <RecoveryPassText>Добавить изображение</RecoveryPassText>
            <CardWrapper>
                { <Card>
                <label id = {'lable'} for="images" class="drop-container"> + </label>
                    <input onChange={(e)=>showImg(e)} multiple type={'file'} id = {'images'}   accept="image/png, image/jpeg"></input>
                </Card>}
                {array.map((el, i) =>  {
                return<Card key={i}>
                    <Close onClick ={()=>CloseItem(i,el)}>
                        <span>x</span>
                    </Close >
                    <CardImg alt="preview image" src={el} key={i}/>
                    {largeSize.includes(el) &&
                        <ErrorMsg>Максимальный размер 2 мб</ErrorMsg>
                    }
                </Card> 
                })}
            </CardWrapper>
                    <Multiselect 
                        singleSelect
                        showArrow
                        onSelect = {(e)=>{setDay(e[0].id)}}
                        options = {multyData}
                        displayValue="name"
                        selectedValues = {[multyData[0]]}
                        style = {{padding:'20px'}}
                    />
            <ErrText>{error && 'Вы не можете загрузить больше 8-ми фотографий '}</ErrText>
            <Button disabled = {error} loading = {loading} onClick={()=>sendData()} mt = {'10px'} mb = {'30px'} text ={'Загрузить'} bgColor = '#4F6688' />
        </RecoveryContent>
        </MainBlock>
    </BackDiv>
})
const MainBlock = styled.div`
left: 0px;
top: 0px;
z-index: 999;
width: 570px;
min-height: 400px;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 15px;
position: relative;
@media (max-width: 768px) {
    width:90%;
    box-sizing: border-box;
    padding: 0 20px;
    overflow: auto;
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
height: 100vh;
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
// height: 98px;
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
flex-wrap: wrap;
max-height: 400px;
// min-height: 50px;
overflow-y: scroll;
@media (max-width: 768px) {
    display: flex;
    justify-content: center;
}
`
const Close = styled.div`
cursor: pointer;
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
const ErrText = styled.p `
margin: 10px 0;
font-size: 13px;
color: red;
height: 20px;

`
const ErrorMsg = styled.p `
    font-size: 12px;
    color: red;
`
const Close1 = styled.p`
position: absolute;
    right: 15px;
    top:10px;
    margin: 0;
    display: none;
    @media (max-width: 768px) {
        display: block;

    }
`