import actionTypes from '../actions/actionType';

function profileinitReducer(state = { profileinit:{},errorcode:0,resume:'',resume_uuid:'', resume_code:0}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.PROFILE_INFO_SUCCESS:
      return Object.assign({}, state, {
        profileinit:payload['0'],
        errorcode:0,
        resume_code:0
      });
    case actionTypes.PROFILE_INFO_FAILURE:
      return Object.assign({}, state, {
        profileinit:{},
        errorcode:payload.status_code
      });
    case actionTypes.PROFILE_INFOPOST_SUCCESS:
      return Object.assign({}, state,{
         profileinit:payload,
         errorcode:0,
         resume_code:0,
      });
    case actionTypes.PROFILE_RESUME_SUCCESS:
      return Object.assign({}, state,{
        resume:payload.resume_url,
        resume_uuid:payload.user_uuid,
        errorcode:0,
        resume_code:0,
      });
    case actionTypes.PROFILE_RESUME_FAILURE:
      return Object.assign({}, state,{
        resume:'',
        resume_uuid:'',
        errorcode:payload.status_code,
        resume_code:0,
      });
    case actionTypes.PROFILE_RESUME_POST_SUCCESS:
      return Object.assign({}, state,{
        resume:payload.resume_url,
        resume_uuid:payload.user_uuid,
        errorcode:0,
        resume_code:200
      });
    case actionTypes.PROFILE_RESUME_REFRESH:
      return Object.assign({}, state,{
        errorcode:0,
        resume_code:0
      });
    default:
      return state;
  }
}
export default profileinitReducer;