import types from './actionType'


export const fetchCustomjobListRequest = (keyword) => {
  return {
    type: types.CUSTOMEJOB_LIST_REQUEST,
    keyword:keyword
  }
};


export const fetchCustomjobListFailure= (payload) => {
  return {
    type: types.CUSTOMEJOB_LIST_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchCustomjobListSuccess = (payload) => {
  return {
    type: types.CUSTOMEJOB_LIST_SUCCESS,
    payload:payload
  }
};


export const customJobsTimeOrder = (keyword) => {
  return {
    type: types.CUSTOMEJOBS_TIME_ORDER,
    keyword:keyword
  }
};

export const customJobsHotOrder = (keyword) => {
  return {
    type: types.CUSTOMEJOBS_HOT_ORDER,
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