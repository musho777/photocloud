const initialState = {
    status:false,
    loading:false,
    changePasswordLoading:false,
    changePasswordstatus:false,
    error:'',
    changeEmailStatus:false,
    codeLoading:false,
    stautsCode:false,
    errorCode:false,
}

export const changeDataReducer = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'start_change_username_and_name':
            temp.loading = true
            temp.status = false
            break
        case 'clear_success_chnage_date':
            temp.status = false
            break
        case 'success_change_username_and_name':
            temp.loading = false
            temp.status = true
            break
        case 'error_change_username_and_name':
            temp.loading = false
            temp.status = false
            break
        case 'start_update_password':
            temp.changePasswordLoading = true
            temp.changePasswordstatus = false
            temp.error = ''
            break
        case 'success_update_password':
            temp.changePasswordLoading = false
            temp.changePasswordstatus = true
            temp.error  = ''
            break
        case 'error_update_password':
            temp.changePasswordLoading = false
            temp.changePasswordstatus = false
            temp.error = 'неверный старый пароль'
            break
        case 'open_popup_change_password':
            temp.changePasswordLoading = false
            temp.changePasswordstatus = false
            temp.error = ''
            break
        case 'start_change_email':
            temp.changeEmailStatus = false
            break
        case 'success_chnage_email':
            temp.changeEmailStatus = true
            break
        case 'error_change_email':
            temp.changeEmailStatus = false
            break
        case 'start_check_email_code':
            temp.codeLoading = true
            temp.errorCode = ''
            temp.stautsCode = false
            break
        case 'success_send_email_code':
            temp.codeLoading = false
            temp.errorCode = ''
            temp.stautsCode = true
            break
        case 'error_check_email_code':
            temp.codeLoading = false
            temp.errorCode = 'неверный код'
            temp.stautsCode = false
            break
        case 'clear_change_code_error':
            temp.codeLoading = false
            temp.errorCode = ''
            temp.stautsCode = false
            break
        default:
            break;
    }
    return temp;
}