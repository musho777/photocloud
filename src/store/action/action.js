import axios from "axios";
import { error_add_photo, error_change_email, error_change_username_and_name, error_check_email_code, error_create_folder, error_create_new_password, error_delate_photo, error_forgot_password, error_forgot_password_code, error_get_all_folder, error_get_folfer_by_slug, error_get_photo, error_get_slider_data, error_get_user, error_login, error_logout, error_register, error_update_password, error_verefy_email } from "./errorAction";
import {
  start_add_photo,
  start_change_email,
  start_change_username_and_name,
  start_check_email_code,
  start_create_folder,
  start_create_new_password,
  start_delate_photo,
  start_forgot_password,
  start_forgot_password_code,
  start_get_all_folder,
  start_get_folfer_by_slug,
  start_get_photo,
  start_get_slider_data,
  start_get_user,
  start_login,
  start_logout,
  start_register,
  start_resend_verify_mail,
  start_update_password,
  start_verefy_email,
} from "./startAction";
import {
  success_add_photo,
  success_change_username_and_name,
  success_chnage_email,
  success_create_folder,
  success_create_new_password,
  success_delate_photo,
  success_forgot_password,
  success_forgot_password_code,
  success_get_all_folder,
  success_get_folfer_by_slug,
  success_get_photo,
  success_get_slider_data,
  success_get_user,
  success_login,
  success_logout,
  success_register,
  success_send_email_code,
  success_update_password,
  success_verefy_email,
} from "./successAction";

const url = "https://photocloud.justcode.am/api/";
export const register_action = (data) => {
  return (dispatch) => {
    dispatch(start_register());
    axios
      .post(`${url}register`, data)
      .then((r) => {
        if (r.data.status) {
          dispatch(success_register(r.data));
        } else {
          dispatch(error_register(r.data));
        }
      })
      .catch((error) => {
        if(error.response.data.message.username){
          dispatch(error_register(error?.response?.data?.message?.username[0]));
        }
        else {
          dispatch(error_register());
        }
      });
  };
};
export const verify_email = (code) => {
  return (dispatch) => {
    dispatch(start_verefy_email());
    axios
      .post(`${url}confirmation_register_code`, code)
      .then((r) => {
        if (r.data.status) {
          dispatch(success_verefy_email(r.data));
        } else {
          dispatch(error_verefy_email());
        }
      })
      .catch((error) => {
        dispatch(error_verefy_email());
      });
  };
};

export const resend_verify_mail = (email) => {
  return (dispatch) => {
    dispatch(start_resend_verify_mail());
    axios
      .post(`${url}resend_code_from_register`, email)
      .then((r) => {
        console.log(r);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const login_action = (data) => {
  return (dispatch) => {
    dispatch(start_login());
    axios
      .post(`${url}login`, data)
      .then((r) => {
        if (r.data.status) {
          dispatch(success_verefy_email(r.data));
        } else {
          dispatch(error_login());
        }
      })
      .catch((error) => {
        dispatch(error_login());
      });
  };
};
export const clear_login_error = () => {
  return {
    type: "clear_login_error",
  };
};

export const get_user = (token) => {
  return (dispatch) => {
    dispatch(start_get_user())
    axios
      .get(`${url}get_auth_user_info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        if(r.data.status){
            dispatch(success_get_user(r.data))
        }
        else {
          dispatch(error_get_user())
        }
      })
      .catch((error) => {
        dispatch(error_get_user())
      });
  };
};

export const logout_action = () =>{
  let token = localStorage.getItem('token')
  return (dispatch) =>{
    axios.get(`${url}logout`,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      dispatch(start_logout())
      if(r.data.status){
        console.log('555')
        localStorage.removeItem('token')
        window.location ='/'
        dispatch(success_logout(r.data))
      }
      else {
        dispatch(error_logout())
      }
    })
    .catch((error)=>{
      dispatch(error_logout())
    })
  }
}

export const forgot_password_api = (email) =>{
  return (dispatch) =>{
    dispatch(start_forgot_password())
    axios.post(`${url}forgot_password_send_code_to_email`,email).then((r)=>{
      if(r.data.status){
        dispatch(success_forgot_password(r.data))
      }
      else {
        dispatch(error_forgot_password())
      }
    })
    .catch((error)=>{
      dispatch(error_forgot_password())
    })
  }
}
export const clear_forgot_password_error = () =>{
  return {
    type:'clear_forgot_password_error'
  }
}
export const forgot_password_code = (data) =>{
  return (dispatch) => {
    dispatch(start_forgot_password_code())
    axios.post(`${url}validation_forgot_password_code`,data).then((r)=>{
      if(r.data.status){
        dispatch(success_forgot_password_code(r.data))
      }
      else {
        dispatch(error_forgot_password_code())
      }
    })
    .catch((error)=>{
      dispatch(error_forgot_password_code())
    })
  }
}
export const clear_forgot_password_code = () =>{
  return {
    type:'clear_forgot_password_code'
  }
}


export const create_new_password = (data) =>{
  console.log(data)
  return (dispatch) =>{
    dispatch(start_create_new_password())
    axios.post(`${url}add_new_password_from_forgot_password`,data).then((r)=>{
      if(r.data.status){
        dispatch(success_create_new_password(r.data))
      }
      else {
        dispatch(error_create_new_password())
      }
    })
    .catch((error)=>{
      dispatch(error_create_new_password())
    })
  }
}
export const change_username_and_name = (data) =>{
  const token  = localStorage.getItem('token')
  return (dispatch) =>{
      dispatch(start_change_username_and_name())
    axios.post(`${url}update_username_and_name`,data,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      if(r.data.status){
          dispatch(get_user(token))
          dispatch(success_change_username_and_name(r.data))
      }
      else {
        dispatch(error_change_username_and_name())
      }
    })
    .catch((error)=>{
      console.log(error)
      dispatch(error_change_username_and_name())
    })
  }
}

export const update_user_password = (data) =>{
  const token  = localStorage.getItem('token')
  return (dispatch) =>{
    dispatch(start_update_password())
    axios.post(`${url}update_password`,data,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      if(r.data.status){
        dispatch(success_update_password(r.data))
      }
      else {
        dispatch(error_update_password())
      }
    })
    .catch((error)=>{
      dispatch(error_update_password())
    })
  }
}
export const open_popup_change_password = () =>{
  return {
    type:'open_popup_change_password'
  }
}

export const change_email = (email) =>{
  const token  = localStorage.getItem('token')

  return (dispatch) =>{
    dispatch(start_change_email())
    axios.post(`${url}add_new_email_from_my_cabinet`,email,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      if(r.data.status){
        dispatch(success_chnage_email(r.data))
      }
      else {
        dispatch(error_change_email())
      }
    })
    .catch((error)=>{
      dispatch(error_change_email())
    })
  }
}

export const change_code =(code) =>{
  const token  = localStorage.getItem('token')
  return (dispatch) =>{
    dispatch(start_check_email_code())
    axios.post(`${url}validation_new_email_code_from_my_cabinet`,code,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      if(r.data.status){
        dispatch(success_send_email_code(r.data))
      }
      else {
        dispatch(error_check_email_code())
      }
    }).catch((error)=>{
      dispatch(error_check_email_code())
    })
  }
}

export const clear_change_code_error =() =>{
  return {
    type:'clear_change_code_error'
  }
}

export const create_folder = (data) =>{
  const token  = localStorage.getItem('token')
  return (dispatch) =>{
    dispatch(start_create_folder())
    axios.post(`${url}create_folder`,data,{
      headers: { Authorization: `Bearer ${token}` },

    }).then((r)=>{
      console.log(r.data.status)
        if(r.data.status){
          dispatch(success_create_folder(r.data))
        }
        else {
          dispatch(error_create_folder())
        }
    }).catch((error)=>{
      dispatch(error_create_folder())
    })
  }
}

export const get_all_folder = () =>{
  const token  = localStorage.getItem('token')
  return (dispatch) =>{
    dispatch(start_get_all_folder())
    axios.get(`${url}get_my_all_folders`,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      if(r.data.status){
        dispatch(success_get_all_folder(r.data))
      }
      else {
        dispatch(error_get_all_folder())
      }
      console.log(r)
    })
    .catch((error)=>{
      dispatch(error_get_all_folder())
      console.log(error)
    })
  }
}

export const get_folder_by_slug = (slug)=>{
    return (dispatch) =>{
      dispatch(start_get_folfer_by_slug())
      axios.get(`${url}get_folder_by_slug/${slug}`).then((r)=>{
        console.log(r)
        dispatch(success_get_folfer_by_slug(r.data))
      })
      .catch((error)=>{
        dispatch(error_get_folfer_by_slug())
        console.log(error)
      })
    }
}

export const add_photo = (data) =>{
  const token  = localStorage.getItem('token')
  return (dispatch) =>{
    dispatch(start_add_photo())
    axios.post(`${url}add_photo`,data,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      if(r.data.status){
        dispatch(success_add_photo(r.data))
      }
      else {
        dispatch(error_add_photo())
      }
    })
    .catch((r)=>{
      console.log(r,'7888')
      dispatch(error_add_photo())
    })
  }
}
export const get_photo_by_slug = (data) =>{
  return (dispatch) =>{
    dispatch(start_get_photo())
    axios.get(`${url}single_photo/${data}`).then((r)=>{
      if(r.data.status){
        dispatch(success_get_photo(data))
      }
      else {
        dispatch(error_get_photo())
      }
      // console.log(r)
    })
    .catch(error=>{
      dispatch(error_get_photo())
      console.log(error)
    })
  }
}

export const delete_photo_by_id = (id) =>{
  const token  = localStorage.getItem('token')
  return (dispatch) =>{
    dispatch(start_delate_photo())
    axios.get(`${url}delete_photo/${id}`,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((r)=>{
      // console.log(r.data)
      if(r.data.status){
        dispatch(success_delate_photo(r.data))
      }
      else {
        dispatch(error_delate_photo())
      }
    })
    .catch((r)=>{
      dispatch(error_delate_photo())
    })
  }
}
export const clear_register_error = () =>{
  return {
      type:'clear_register_error'
  }
}
export const clear_success_chnage_date = () =>{
  return {
    type:'clear_success_chnage_date'
  }
}

export const open_login_popUp = () =>{
  return {
    type:'open_login_popUp'
  }
}
export const close_login_popUp = () =>{
  return {
    type:'close_login_popUp'
  }
}
export const get_Slider_data = () =>{
  return (dispatch) =>{
    axios.get(`${url}slider`).then((r)=>{
      dispatch(start_get_slider_data())
      if(r.data.status){
        dispatch(success_get_slider_data(r.data.data))
      }
      else {
        dispatch(error_get_slider_data())
      }
    })
    .catch((error)=>{
      dispatch(error_get_slider_data())
    })
  }
}