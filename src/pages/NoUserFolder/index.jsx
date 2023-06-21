import styled from "styled-components"
import { ReactComponent as PlusIcon } from "../../assets/plus.svg"
import { useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as BluePlusIcon } from "../../assets/blueplus.svg"
import { clear_login_error, get_all_folder, open_login_popUp } from "../../store/action/action.js";
import { ReactComponent as Sheare } from "../../assets/shear.svg"
import { ReactComponent as Delate } from "../../assets/delate.svg"

import { ClipLoader } from "react-spinners"
import { Login } from "../../components/login/Login"
import { AddPhoto } from "../../components/addPhoto"
import { Shear } from "../../components/shear"

export const NoUserFolderBlock = () => {
    const [createFolderModal, setCreateFolderModal] = useState()
    const {creatFolder} = useSelector((st)=>st)
    const [login,setLogin] = useState(false)
    const [addImages, setAddImages] = useState(false)
    const [shearId,setShearid] = useState('')
    const [openShare,setOpenShare] = useState(false)

    const [delateIndex,setDelateIndex] = useState(null)



    const {addPhoto} = useSelector((st)=>st)
    const dispatch = useDispatch()
    const addRef = useRef()
    const folderRef = useRef()
    const logRef = useRef();
    const shRef = useRef()
    const [photo,setPhot ] = useState([])

    useOnClickOutside(folderRef, () => setCreateFolderModal(false));
    useOnClickOutside(logRef, () => closeLogin());
    useOnClickOutside(addRef, () => setAddImages(false));
    useOnClickOutside(shRef, () => setOpenShare(false));


    const closeLogin = () =>{
        setLogin(false)
        dispatch(clear_login_error())
    }
    useEffect(()=>{
        if(creatFolder.status){
            dispatch(get_all_folder())
            setCreateFolderModal(false)
        }
    },[creatFolder.status])
    const handleForgotModal = () => {
        setLogin(false)
    }
    useEffect(()=>{
        console.log(addPhoto.data.data)
            if(addPhoto.status){
                setAddImages(false)
            }
    },[addPhoto.status])
    useEffect(()=>{
        setPhot(addPhoto.data.data)
    },[addPhoto.data.data])
    const deletePhoto = (i) =>{
        console.log(i)
        let item = [...photo]
        item.splice(i,1)
        setPhot(item)
    }
    useEffect(()=>{
        if(openShare){
            window.scrollTo(0, 0)
            document.body.style.setProperty('overflow', 'hidden');
        }
        else {
            document.body.style.setProperty('overflow', 'auto');
        }
    },[openShare])
    useEffect(()=>{
        if(addImages){
            window.scrollTo(0, 0)
            document.body.style.setProperty('overflow', 'hidden');
        }
        else {
            document.body.style.setProperty('overflow', 'auto');
        }
    },[addImages])
    return (<>
        <MainTitle>Папки</MainTitle>

        <MainBlock>
            <Content>
                {creatFolder.loading_get_follder||creatFolder.loading_slug||creatFolder.loading ?
                <LoadingDiv>
                <ClipLoader
                    color={'#4F6688'}
                    loading={creatFolder.loading_get_follder||creatFolder.loading_slug||creatFolder.loading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                </LoadingDiv>:
                <>
                    <AddCardsWrapper>
                        <AddCards onClick={() => dispatch(open_login_popUp())}>
                            <PlusIconWrapper>
                                <PlusIcon />
                            </PlusIconWrapper>
                        </AddCards>
                        <Text>Добавить папку</Text>
                    </AddCardsWrapper>
                </>}
            </Content>
            <Content>
                
                    {(!creatFolder?.slug_data.photo || creatFolder?.slug_data?.photo?.length<8) &&
                        <AddCardsWrapper>
                            <AddFoto onClick={() => setAddImages(true)}>
                                <PlusIconWrapper>
                                <BluePlusIcon />
                                </PlusIconWrapper>
                            </AddFoto>
                            <Text>Добавить картинку</Text>
                        </AddCardsWrapper>}
                        {photo?.map((elm,i)=>{
                               return <AddCardsWrapper>
                               <AddFoto onClick={()=>window.location = (`/img/${elm}`)} style={{border:'none'}}>
                                   <Image src={`https://photocloud.justcode.am/uploads/${elm}`} />
                               </AddFoto>
                               <TextWrapper>
                                   <Text2 onClick={()=>{
                                       setShearid(elm)
                                       setOpenShare(true)
                                       }}>
                                       <div style={{marginRight:'5px',marginBottom:'-3px'}}>
                                           <Sheare  />  
                                       </div>
                                       Поделиться
                                   </Text2>
                                   <Text2 onClick={()=>{
                                       deletePhoto(i)
                                    //    dispatch(delete_photo_by_id(elm.id))
                                   }}>
                                       <Delate />
                                   </Text2>
                               </TextWrapper>
                           </AddCardsWrapper>
                        })

                        }
            </Content>
        </MainBlock>
        {login && <Login  ref={logRef} forgotPassCB={handleForgotModal} />}
        {addImages && <AddPhoto close = {()=>setAddImages(false)} length = {creatFolder?.slug_data?.photo?.length ?creatFolder?.slug_data?.photo?.length:0} loading = {addPhoto.loading} id = {creatFolder.slug_data.id} ref={addRef} />}
        {openShare && 
            <Shear  id = {shearId}  ref ={shRef}/>
        }
    </>
    )
}

const MainBlock = styled.div`
max-width: 1170px;
min-height: 280px;
width: 95%;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 10px;
// height: 100px;
margin: auto;
margin-top: 25px;
margin-top: 0;
@media (max-width: 768px) {
    justify-content: center;
    display: flex;
    flex-direction: column;
}
`
const AddCardsWrapper = styled.div`
width: 220px;
height: 270px;
margin: 0 10px;

// display:flex;

`
const Content = styled.div`
// margin: 15px;
height: 100%;
padding:20px 0px;
display: flex;
flex-wrap: wrap;
// justify-content: space-between;
@media (max-width: 768px) {
    margin: 15px auto;
    display: flex;
    justify-content: center;
  }
`
const AddCards = styled.div`
width: 220px;
height: 220px;
background: #4F6688;
border-radius: 10px;
position: relative;
cursor: pointer;
`
const PlusIconWrapper = styled.div`
position: absolute;
top: 35%;
left: 37%;
`
const Text = styled.p `
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 21px;
text-align: center;
`
const Card = styled.div`
width: 220px;
margin: 0 10px;
height: 270px;
border-radius: 10px;
position: relative;
cursor: pointer;
`
const Main = styled.div `
width: 220px;
height: 220px;
border-radius: 10px;
position: relative;
cursor: pointer;
background: rgb(79, 102, 136);
`
const MainText = styled.div `
width: 220px;
height: 50px;
display: flex;
justify-content: space-between;
align-items: center;
`
const Title = styled.p `
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 21px;
color: #333333;
`
const Count = styled.p`
display: flex;
align-items: center;
color:#4F6688
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 21px;
text-align: right;
font-feature-settings: 'pnum' on, 'lnum' on;
`
const LoadingDiv = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 720px;
    max-width: 1170px;
    width: 95%;
`
const Image = styled.img `
width: 220px;
height: 220px;
// object-fit: cover;
border-radius: 8px;
`
const MainTitle = styled.p `
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
const AddFoto = styled.div`
width: 220px;
height: 220px;
// background: #4F6688;
border-radius: 10px;
position: relative;
cursor: pointer;
border: 2px solid #4F6688;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
`
const Text2 = styled.p `
display: flex;
align-items: center;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
font-feature-settings: 'pnum' on, 'lnum' on;
color: #4F6688;
cursor: pointer;`
const TextWrapper = styled.div `
height: 50px;
display: flex;
justify-content: space-between;
`