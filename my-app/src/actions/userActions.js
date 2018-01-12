import types from './actionType'

export const likeRequest= (position) => {
  return {
    type: types.IS_LAUDED_REQUEST,
    payload:{
      position
    }
  }
};

export const collectRequest= (position) => {
  return {
    type: types.IS_COLLECTED_REQUEST,
    payload:{
      position
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