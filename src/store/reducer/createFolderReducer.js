const initialState = {
    status:false,
    loading:false,
    error:'',
    folder:[],
    loading_get_follder:false,
    loading_slug:false,
    slug_data:{}
}

export const createFolderReducer = (state = initialState, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'start_create_folder':
            temp.loading = false
            temp.error = ''
            temp.status = false
            break
        case 'error_create_folder':
            temp.status = false
            temp.error = 'Необходимо ввести имя в поле.'
            temp.loading = false
            break
        case 'success_create_folder':
            temp.loading = false
            temp.status = true
            break
        case 'success_get_all_folder':
            temp.folder = action.data?.data
            temp.loading_get_follder = false
            break
        case 'start_get_all_folder':
            temp.loading_get_follder = true
            break
        case 'error_get_all_folder':
            temp.loading_get_follder = false
            break
        case 'start_get_folfer_by_slug':
            temp.loading_slug = true
            break
        case 'success_get_folfer_by_slug':
            temp.loading_slug = false
            temp.slug_data = action.data?.data
            break
        case 'error_get_folfer_by_slug':
            temp.loading_slug = false
            break
        default:
            break;
    }
    return temp;
}