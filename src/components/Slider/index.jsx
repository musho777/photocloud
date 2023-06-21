import { useEffect } from "react"
import Marquee from "react-fast-marquee"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { get_Slider_data } from "../../store/action/action"

export const Slider = () =>{
    const {slider} = useSelector((st)=>st)
    console.log(slider)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(get_Slider_data())
    },[])
    return <Marquee >
        {slider.data?.map((elm,i)=>(
            <Img onClick={()=>window.open(`${elm.url}`, "_blank")} src={`https://photocloud.justcode.am/uploads/${elm.photo}`}></Img>
        ))}
    </Marquee>
}
const Img = styled.img`
    width:200px;
    margin-right:40px;
    object-fit: contain;
    height:100px;
    border-radius:15px;
    @media (max-width: 768px) {
        height:70px;
        width:140px;
    }
`