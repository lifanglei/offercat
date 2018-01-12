import actionTypes from '../actions/actionType';

function profileWorkReducer(state = { profilework:[],errormsg:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.PROFILE_WORK_SUCCESS:
      return Object.assign({}, state, {
        profilework:payload
      });
    case actionTypes.PROFILE_WORK_FAILURE:
      return Object.assign({}, state, {
        profilework:[],
        errormsg:payload
      });
    // case actionTypes.PROFILE_WORKPOST_SUCCESS:
    //   return Object.assign({}, state, {
    //     profilework:payload,
    //     errormsg:''
    //   });
    default:
      return state;
  }
}
export default profileWorkReducer;