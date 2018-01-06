import actionTypes from '../actions/actionType';

function profileinitReducer(state = { profileinit:{}}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.PROFILE_INFO_SUCCESS:
      return Object.assign({}, state, {
        profileinit:payload['0'],
      });
    case actionTypes.PROFILE_INFO_FAILURE:
      return Object.assign({}, state, {
        profileinit:{},
        errorcode:payload.status_code
      });
    default:
      return state;
  }
}
export default profileinitReducer;