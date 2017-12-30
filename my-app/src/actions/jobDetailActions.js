import types from './actionType'

export const jobDetailRequest= (jobId) => {
  return {
    type: types.JOB_DETAIL_REQUEST,
    payload:{
      jobId
    }
  }
};

export const jobDetailSuccess = (payload) => {
  return {
    type: types.JOB_DETAIL_SUCCESS,
    payload:{
      ...payload
    }
  }
};

export const jobDetailFailure= (payload) => {
  return {
    type: types.JOB_DETAIL_FAILURE,
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