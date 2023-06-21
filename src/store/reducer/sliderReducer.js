const initialState = {
    loading:false,
    data:[],
    error:'',
}

export const SliderReducer = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'start_get_slider_data':
            temp.loading = true
            temp.error = ''
            temp.data = []
            break
        case 'success_get_slider_data':
            temp.loading = false
            temp.data = action.data
            temp.error = ''
            break
        case 'error_get_slider_data':
            temp.loading = false
            temp.data = []
            break
        case 'success_verefy_email':
        default:
            break;
    }
    return temp;
}