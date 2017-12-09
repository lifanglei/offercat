import types from './actionType'

export const userSignupRequest = (username, email, password, captcha_val, captcha_key) => {
  return {
    type: types.USER_SIGNUP_REQUEST,
    payload:{
      username,
      email,
      password,
      captcha_val,
      captcha_key
    }
  }
};

export const userSignupFinish = ()=>{
  return {
    type: types.USER_SIGNUP_FINISH,
  }
};
export const userSignupFailure= (payload) => {
  return {
    type: types.USER_SIGNUP_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const userSignupSuccess = (payload) => {
  return {
    type: types.USER_SIGNUP_SUCCESS,
    payload:{
      ...payload
    }
  }
};

export const ServerSideError = (payload) => {
  return {
    type: types.INTERNAL_SERVER_ERROR,
    payload:{
      ...payload
    }
  }
};
