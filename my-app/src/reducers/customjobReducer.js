import actionTypes from '../actions/actionType';

function customjobReducer(state = { jobs: [], totalCount: 0, currentPage: 1, errorMessage:'',errorCode:0}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.CUSTOMEJOB_LIST_SUCCESS:
      return Object.assign({}, state, {
        jobs:payload,
        totalCount:payload.length,
        errorMessage:'',
        errorCode:0
      });
    case actionTypes.CUSTOMEJOB_LIST_FAILURE:
      return Object.assign({}, state, {
        jobs: [],
        totalCount: 0,
        errorMessage: payload,
        errorCode:payload.status_code
      });
    default:
      return state;
  }
}
export default customjobReducer;