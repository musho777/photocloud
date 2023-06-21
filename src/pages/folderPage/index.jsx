import styled from "styled-components"
import { SettingsBlock } from "../../components/settingsBlock/SettingsBlock"

import {FolderPageBlock} from '../../components/folderPageBlock/index'
import { useSelector } from "react-redux"
import { Slider } from "../../components/Slider"
export const FolderPage = () =>{
    const {creatFolder} = useSelector((st)=>st)
    return <>
        <Div>
            <Slider />
        </Div>
        <SettingsBlock/>
        <Title>{creatFolder?.slug_data?.name}</Title>
        <FolderPageBlock/>
    </>
}
const Title = styled.p `
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
const Div = styled.div `
    margin-top: 20px;
`