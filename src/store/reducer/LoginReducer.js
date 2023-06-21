const initialState = {
    status:false,
    loading:false,
    user:[],
    token:'',
    error:'',
    open:false
}

export const loginReducer = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'start_login':
            temp.loading = true
            temp.status = false
            temp.error = ''
            break
        case 'error_login':
            temp.loading = false
            temp.status = false
            temp.error = 'Неправильный логин или пароль'
            break
        case 'success_verefy_email':
            temp.loading = false
            temp.error = ''
            break
        case 'clear_login_error':
            temp.error = ''
            break
        case 'success_logout':
            temp.status = false
            temp.loading= false
            temp.user = []
            temp.token = ''
            temp.error = ''
            break
        case 'open_login_popUp':
            temp.open = true
            break
        case 'close_login_popUp':
            temp.open = false
            break            
        default:
            break;
    }
    return temp;
}