import types from './actionType'


export const fetchCustomOrganizationsListRequest = (keyword) => {
  return {
    type: types.CUSTOMEORGANIZATIONS_LIST_REQUEST,
    keyword:keyword
  }
};


export const fetchCustomOrganizationsListFailure= (payload) => {
  return {
    type: types.CUSTOMEORGANIZATIONS_LIST_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchCustomOrganizationsListSuccess = (payload) => {
  return {
    type: types.CUSTOMEORGANIZATIONS_LIST_SUCCESS,
    payload:payload
  }
};


export const customOrganizationsTimeOrder = (keyword) => {
  return {
    type: types.CUSTOMEORGANIZATIONS_TIME_ORDER,
    keyword:keyword
  }
};

export const customOrganizationsHotOrder = (keyword) => {
  return {
    type: types.CUSTOMEORGANIZATIONS_HOT_ORDER,
    keyword:keyword
  }
};

export const customOrganizationsLengthOrder = (keyword) => {
  return {
    type: types.CUSTOMEORGANIZATIONS_LENGTH_ORDER,
    keyword:keyword
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