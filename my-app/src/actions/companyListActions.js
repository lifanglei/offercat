import types from './actionType'


export const fetchCompanyListRequest = () => {
  return {
    type: types.COMPANY_LIST_REQUEST,
  }
};


export const fetchCompanyListFailure= (payload) => {
  return {
    type: types.COMPANY_LIST_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchCompanyListSuccess = (payload) => {
  return {
    type: types.COMPANY_LIST_SUCCESS,
    payload:payload
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