import types from './actionType'


export const fetchPositionListRequest = () => {
  return {
    type: types.POSITION_LIST_REQUEST,
  }
};


export const fetchPositionListFailure= (payload) => {
  return {
    type: types.POSITION_LIST_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const fetchPositionListSuccess = (payload) => {
  return {
    type: types.POSITION_LIST_SUCCESS,
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