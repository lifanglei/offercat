import types from './actionType'

export const collectionRequest= (companyID) => {
  return {
    type: types.COLLECTION_REQUEST,
  }
};

export const collectionRequestlSuccess = (payload) => {
  return {
    type: types.COLLECTION_SUCCESS,
    payload:payload
  }
};

export const  collectionRequestFailure= (payload) => {
  return {
    type: types.COLLECTION_FAILURE,
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
}