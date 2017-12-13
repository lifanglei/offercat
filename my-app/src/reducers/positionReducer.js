import actionTypes from '../actions/actionType';

function positionReducer(state = { positions: [], totalCount: 0, currentPage: 1, errorMessage:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.POSITION_LIST_SUCCESS:
      return Object.assign({}, state, {
        positions:payload.results,
        totalCount:payload.count,
        errorMessage:''
      });
    case actionTypes.POSITION_LIST_FAILURE:
      return Object.assign({}, state, {
        positions: [],
        totalCount: 0,
        errorMessage: payload['errormessage']
      });
    default:
      return state;
  }
}
export default positionReducer;