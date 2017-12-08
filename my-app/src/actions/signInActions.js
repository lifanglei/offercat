import types from './actionType'

export const userSigninRequest = (username_email, password) => {
  return {
    type: types.USER_LOGIN_REQUEST,
    payload:{
      username_email,
      password,
    }
  }
};

export const userSigninFinish = ()=>{
  return {
    type: types.USER_LOGIN_FINISH,
  }
};
export const userSigninFailure= (payload) => {
  return {
    type: types.USER_LOGIN_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const userSigninSuccess = (payload) => {
  return {
    type: types.USER_LOGIN_SUCCESS,
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
