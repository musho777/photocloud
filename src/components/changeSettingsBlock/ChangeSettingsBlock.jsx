import React, { useState } from "react"
import styled from "styled-components"
import { SettingsForm } from "../settingsForm/SettingsForm"

export const ChangeSettingsBlock = () => {
    const [createFolderModal, setCreateFolderModal] = useState()
    return (<>
        <MainBlock>
            <Content>
                <SettingsForm />
            </Content>
        </MainBlock>
    </>
    )
}

const MainBlock = styled.div`
display:flex;
max-width: 1170px;
min-height: 50px;
width: 100%;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 10px;
height: 398px;
margin: auto;
margin-top: 25px;
`
const Content = styled.div`
margin: 15px;
height: 100%;
`