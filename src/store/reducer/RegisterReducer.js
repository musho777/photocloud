const initialState = {
    status:false,
    loading:false,
    user:[],
    token:'',
    loading_verify:false,
    status_verif:false,
    error_verify_email:'',
    error:'',
    loadingGetUSer:false,
    logOutLoading:false,
    logOutStats:false,
}

export const registerRegister = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'start_register':
            temp.loading = true
            break
        case 'success_register':
            temp.status = true
            temp.loading = false
            break;
        case 'error_register':
            temp.status = false
            temp.loading = false
            console.log(action.data)
            if(action.data === 'The username has already been taken.'){
                temp.error = 'Такой пользователь уже существует'
            }
            else {
                temp.error = 'Этот эл. адрес уже зарегистрирован.'
            }
            break
        case 'clear_register_error':
            console.log('red')
            temp.status = false
            temp.loading = false
            temp.error = ''
            break
        case 'start_verefy_email':
            temp.loading_verify = true
        break
        case 'success_verefy_email':
            if(action.data.user){
                temp.user = action.data.user
            }
            else {
                temp.user = action.data.user_data
        
            }
            temp.loading_verify = false
            temp.token = action.data.token
            localStorage.setItem('token',action.data.token);
            temp.status_verif = true
            break
        case 'error_verefy_email':
            temp.loading_verify = false
            temp.error_verify_email = 'Неправильный код'
            break
        case 'start_resend_verify_mail':
            temp.error_verify_email = ''
            break
        case 'start_get_user':
            temp.loadingGetUSer = true
            break
        case 'success_get_user':
            temp.user = action.data.user_data
            temp.loadingGetUSer = false
            break
        case 'error_get_user':
            temp.loadingGetUSer = false
            break
        case 'start_logout':
            temp.logOutLoading = true
            break
        case 'success_logout':
            temp.logOutLoading = false
            temp.logOutStats = true
            break
        case 'error_logout':
            temp.logOutLoading = false
            temp.logOutStats = false
        default:
            break;
    }
    return temp;
}