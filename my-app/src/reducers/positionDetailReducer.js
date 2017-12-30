import actionTypes from '../actions/actionType';

function positionDetailReducer(state = { positionDetail:{}}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.JOB_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        positionDetail:payload,
        errorMessage:''
      });
    case actionTypes.JOB_DETAIL_FAILURE:
      return Object.assign({}, state, {
        positionDetail:{},
        errorMessage: payload['errormessage']
      });
    default:
      return state;
  }
}
export default positionDetailReducer;