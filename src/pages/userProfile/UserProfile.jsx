import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { SettingsBlock } from "../../components/settingsBlock/SettingsBlock"
import { Slider } from "../../components/Slider"
import { get_all_folder } from "../../store/action/action"
import { FoldersBlock } from "../foldersBlock/FoldersBlock"

export const UserProfile = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(get_all_folder())
    },[])
    return (
        <>
        <Div>
            <Slider />
        </Div>  
        <SettingsBlock/>
        <FoldersBlock/>
        </>
    )
}
const Div = styled.div `
    margin-top: 20px;
`