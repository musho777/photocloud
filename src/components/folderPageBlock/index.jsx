import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { ReactComponent as PlusIcon } from "../../assets/plus.svg"
import { ReactComponent as BluePlusIcon } from "../../assets/blueplus.svg"
import { ReactComponent as Sheare } from "../../assets/shear.svg"
import { ReactComponent as Delate } from "../../assets/delate.svg"
import { ReactComponent as File } from "../../assets/file.svg"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { delete_photo_by_id, get_all_folder, get_folder_by_slug, get_photo_by_slug } from "../../store/action/action"
import { CreateFolderForm } from "../createFolderForm/CreateFolderForm"
import { ReactComponent as Img } from "../../assets/img.svg"
import { AddPhoto } from "../addPhoto"
import { ClipLoader } from "react-spinners"
import { Shear } from "../shear"

export const FolderPageBlock = () =>{
    const [createFolderModal, setCreateFolderModal] = useState()
    const [addImages, setAddImages] = useState(false)
    const {id} = useParams()
    const {creatFolder} = useSelector((st)=>st)
    const {addPhoto} = useSelector((st)=>st)
    const [delateIndex,setDelateIndex] = useState(null)
    const [openShare,setOpenShare] = useState(false)
    const [photo,setPhoto] = useState([])
    const [shearId,setShearid] = useState('')
    const dispatch = useDispatch()
    const folderRef = useRef()
    const addRef = useRef()
    const shRef = useRef()

    useOnClickOutside(folderRef, () => setCreateFolderModal(false));
    useOnClickOutside(addRef, () => setAddImages(false));
    useOnClickOutside(shRef, () => setOpenShare(false));
    

    useEffect(()=>{
        dispatch(get_folder_by_slug(id))

    },[])
    useEffect(()=>{
        if(creatFolder.status){
            setCreateFolderModal(false)
            dispatch(get_folder_by_slug(id))
        }
    },[creatFolder.status])
    useEffect(()=>{
        if(addImages){
            window.scrollTo(0, 0)
            document.body.style.setProperty('overflow', 'hidden');
        }
        else {
            document.body.style.setProperty('overflow', 'auto');
        }
    },[addImages])
    useEffect(()=>{
        if(addPhoto.status){
            dispatch(get_folder_by_slug(id))
            setAddImages(false)
        }
    },[addPhoto.status])
    useEffect(()=>{
        if(addPhoto.succes_delate){
            let item = [...photo]
            item.splice(delateIndex,1)
            console.log(item,117)
            setPhoto(item)
            // dispatch(get_folder_by_slug(id))
        }
    },[addPhoto.succes_delate])
    const handelCloseHSare = (e) =>{
        // setOpenShare(false)
    }
    useEffect(()=>{
        setPhoto(creatFolder?.slug_data?.photo)
    },[creatFolder?.slug_data?.photo])
    useEffect(()=>{
        if(openShare){
            window.scrollTo(0, 0)
            document.body.style.setProperty('overflow', 'hidden');
        }
        else {
            document.body.style.setProperty('overflow', 'auto');
        }
    },[openShare])
    return <>
    <MainBlock> 
        {photo?.length<8 &&
        <AddCardsWrapper>
            <AddFoto onClick={() => setAddImages(true)}>
                <PlusIconWrapper>
                <BluePlusIcon />
                </PlusIconWrapper>
            </AddFoto>
            <Text>Добавить картинку</Text>
        </AddCardsWrapper>}
        {photo?.map((elm,i)=>{
            return <AddCardsWrapper  key={i}>
                {(addPhoto.delate_loading && delateIndex === i) ?
                <LoadingDiv>
                    <ClipLoader
                        color={'#4F6688'}
                        loading={addPhoto.delate_loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </LoadingDiv>:
                <>
                    <AddFoto onClick={()=>window.location = `/img/${elm.slug}`} style={{border:'none'}}>
                        <Image src={`https://photocloud.justcode.am/uploads/${elm.slug}`} />
                    </AddFoto>
                    <TextWrapper>
                        <Text2 onClick={()=>{
                            setOpenShare(true)
                            setShearid(elm.slug)
                            }}>
                            <div style={{marginRight:'5px',marginBottom:'-3px'}}>
                                <Sheare />  
                            </div>
                            Поделиться
                        </Text2>
                        <Text2 onClick={()=>{
                            setDelateIndex(i)
                            dispatch(delete_photo_by_id(elm.id))
                        }}>
                            <Delate />
                        </Text2>
                    </TextWrapper>
                </>}
        </AddCardsWrapper>
        })

        }
    </MainBlock>
    <Title>Папки</Title>
    <MainBlock>
    <AddCardsWrapper>
        <AddCards onClick={() => setCreateFolderModal(!createFolderModal)}>
            <PlusIconWrapper>
            <PlusIcon />
            </PlusIconWrapper>
        </AddCards>
        <Text>Добавить папку</Text>
    </AddCardsWrapper>
    {   
        creatFolder.slug_data?.folders?.map((elm,i)=>{
            return <Card onClick={()=>{ window.location = `/folder/${elm.slug}`}}>
            <Main>

            {elm.photo.length ?
                <Image src={`https://photocloud.justcode.am/uploads/${elm.photo.length && elm.photo[0].slug}`} />:
                <div style={{display:"flex",alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}><File /></div>
            }
            </Main>
            <MainText>
                <CardTitle>
                    {elm.name}
                </CardTitle>
                <Count>
                    <p style={{margin:'0 5px'}}>{elm.count_photo}</p> <Img />
                </Count>
            </MainText>
        </Card>
        })
    }
    </MainBlock>
    {createFolderModal && <CreateFolderForm close = {()=>setCreateFolderModal(false)} prId  ={creatFolder.slug_data.id} loading = {creatFolder.loading} ref={folderRef} />}
    {addImages && 
            <AddPhoto  close = {()=>setAddImages(false)} length = {photo?.length} loading = {addPhoto.loading} id = {creatFolder.slug_data.id} ref={addRef} />
    }
    {openShare && 
        <Shear id = {shearId} handelCloseHSare = {(e)=>handelCloseHSare(e)} ref ={shRef}/>
    }
    </>
}

const MainBlock = styled.div`
max-width: 1170px;
min-height: 280px;
width: 95%;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
border-radius: 10px;
// height: 100px;
margin: 25px auto;
margin-top: 25px;
padding: 15px;
margin-top: 0;
box-sizing: border-box;
display: flex;
flex-wrap: wrap;
@media (max-width: 768px) {
    justify-content: center;
  }
`
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
const AddCardsWrapper = styled.div`
width: 220px;
height: 270px;
margin: 0 10px;
// display:flex;

`
const AddCards = styled.div`
width: 220px;
height: 220px;
background: #4F6688;
border-radius: 10px;
position: relative;
cursor: pointer;
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
const CardTitle = styled.p `
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 21px;
color: #333333;
`
const Image = styled.img `
width: 220px;
height: 220px;
// object-fit: cover;
border-radius: 8px;
`
const TextWrapper = styled.div `
height: 50px;
display: flex;
justify-content: space-between;
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
cursor: pointer;
` 
const LoadingDiv = styled.div `
display: flex;
justify-content: center;
align-items: center;
height: 270px;
`