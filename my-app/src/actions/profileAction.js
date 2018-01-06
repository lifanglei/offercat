import types from './actionType'


export const fetchProfileBasicRequest = () => {
  return {
    type: types.PROFILE_INFO_REQUEST,
  }
};


export const fetchProfileBasicFailure= (payload) => {
  return {
    type: types.PROFILE_INFO_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchProfileBasicSuccess = (payload) => {
  return {
    type: types.PROFILE_INFO_SUCCESS,
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