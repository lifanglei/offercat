import actionTypes from '../actions/actionType';

function profileEduReducer(state = { profileedu:[],errormsg:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.PROFILE_EDU_SUCCESS:
      return Object.assign({}, state, {
        profileedu:payload
      });
    case actionTypes.PROFILE_EDU_FAILURE:
      return Object.assign({}, state, {
        profileedu:[],
        errormsg:payload
      });
    default:
      return state;
  }
}
export default profileEduReducer;