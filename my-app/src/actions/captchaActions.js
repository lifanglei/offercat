import types from './actionType'


export const fetchCaptchaRequest = () => {
  return {
    type: types.SIGNUP_CAP_REQUEST,
  }
};


export const fetchCaptchaFailure= (payload) => {
  return {
    type: types.SIGNUP_CAP_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchCaptchaSuccess = (payload) => {
  return {
    type: types.SIGNUP_CAP_SUCCESS,
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