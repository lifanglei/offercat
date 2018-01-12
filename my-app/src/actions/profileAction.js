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




export const postProfileBasicRequest = (payload,uuid) => {
  return {
    type: types.PROFILE_INFOPOST_REQUEST,
    payload:payload,
    uuid:uuid
  }
};

export const postProfileBasicFailure= (payload) => {
  return {
    type: types.PROFILE_INFOPOST_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const postProfileBasicSuccess = (payload) => {
  return {
    type: types.PROFILE_INFOPOST_SUCCESS,
    payload:{
      ...payload
    }
  }
};



export const getResumeBasicRequest = () => {
  return {
    type: types.PROFILE_RESUME_REQUEST,
  }
};

export const postResumeBasicRequest = (payload,uuid) => {
  return {
    type: types.PROFILE_RESUME_POST,
    payload:payload,
    uuid:uuid
  }
};

export const getResumeBasicSuccess = (payload) => {
  return {
    type: types.PROFILE_RESUME_SUCCESS,
    payload:{
      ...payload
    }
  }
};

export const postResumeBasicSuccess = (payload) => {
  return {
    type: types.PROFILE_RESUME_POST_SUCCESS,
    payload:{
      ...payload
    }
  }
};


export const resumeRefresh = () => {
  return {
    type: types.PROFILE_RESUME_REFRESH,
  }
};




export const profileWorkRequest = () => {
  return {
    type: types.PROFILE_WORK_REQUEST,
  }
};

export const profileWorkSuccess = (payload) => {
  return {
    type: types.PROFILE_WORK_SUCCESS,
    payload:payload
  }
};

export const profileWorkFailure = (payload) => {
  return {
    type: types.PROFILE_WORK_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const profileWorkPost = (payload,uuid) =>{
  return {
    type: types.PROFILE_WORKPOST_REQUEST,
    payload:payload,
    uuid:uuid
  }
};

export const profileWorkPostSuccess = (payload) =>{
  return {
    type: types.PROFILE_WORKPOST_SUCCESS,
    payload:payload
  }
};


export const profileEduRequest = () => {
  return {
    type: types.PROFILE_EDU_REQUEST,
  }
};

export const profileEduSuccess = (payload) => {
  return {
    type: types.PROFILE_EDU_SUCCESS,
    payload:payload
  }
};

export const profileEduFailure = (payload) => {
  return {
    type: types.PROFILE_EDU_FAILURE,
    payload:{
      ...payload
    }
  }
};

export const profileEDUPost = (payload,uuid) =>{
  return {
    type: types.PROFILE_EDUPOST_REQUEST,
    payload:payload,
    uuid:uuid
  }
};

export const profileEDUPostSuccess = (payload) =>{
  return {
    type: types.PROFILE_EDUPOST_SUCCESS,
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