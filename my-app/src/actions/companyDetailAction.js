import types from './actionType'

export const companyDetailRequest= (companyID) => {
  return {
    type: types.COMPANY_DETAIL_REQUEST,
    payload:{
      companyID
    }
  }
};

export const companyDetailSuccess = (payload) => {
  return {
    type: types.COMPANY_DETAIL_SUCCESS,
    payload:{
      ...payload
    }
  }
};

export const  companyDetailFailure= (payload) => {
  return {
    type: types.COMPANY_DETAIL_FAILURE,
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
