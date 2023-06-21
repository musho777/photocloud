import { combineReducers } from 'redux'
import { addPhotoReducer } from './addPhotoReducer'
import { changeDataReducer } from './changeDataReducer'
import { createFolderReducer } from './createFolderReducer'
import { forgotPassword } from './forgotPasswordReducer'
import { loginReducer } from './LoginReducer'
import { registerRegister } from './RegisterReducer'
import { SliderReducer } from './sliderReducer'
export default combineReducers({
    reg:registerRegister,
    login:loginReducer,
    forgotPassword:forgotPassword,
    changeData:changeDataReducer,
    creatFolder:createFolderReducer,
    addPhoto:addPhotoReducer,
    slider:SliderReducer
})