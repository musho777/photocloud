const initialState = {
    status:false,
    loading:false,
    error:'',
    statusCode:false,
    loadingCode:false,
    errorCode:'',
    statusNew:false,
    loadingNew:false,
    errorNew:'',
}

export const forgotPassword = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'start_forgot_password':
            console.log('000')
            temp.loading = true
            temp.status = false
            temp.errorCode = ''
            break
        case 'success_forgot_password':
            temp.status = true
            temp.loading = false
            temp.error = ''
            break
        case 'error_forgot_password':
            temp.loading = false
            temp.error = 'Пользователь не зарегистрирован'
            break
        case 'clear_forgot_password_error':
            temp.error = ''
            break
        case 'start_forgot_password_code':
            temp.loadingCode = true
            temp.statusCode = false
            break
        case 'success_forgot_password_code':
            temp.loadingCode = false
            temp.statusCode = true
            temp.errorCode = ''
            break
        case 'error_forgot_password_code':
            temp.errorCode = 'Неверный код'
            temp.statusCode = false
            temp.loadingCode = false
            break
        case 'clear_forgot_password_code':
            temp.errorCode = ''
            temp.statusCode = false
            temp.loadingCode = false
            break
        case 'start_create_new_password':
            temp.statusNew = false
            temp.loadingNew = true
            break
        case 'success_create_new_password':
            temp.statusNew = true
            temp.loadingNew = false
            temp.errorNew = ''
            break
        case 'error_create_new_password':
            temp.statusNew = false
            temp.loadingNew = false
            break
        default:
            break;
    }
    return temp;
}