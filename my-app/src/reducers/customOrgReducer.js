import actionTypes from '../actions/actionType';

function customOrgReducer(state = { orgs: [], totalCount: 0, currentPage: 1, errorMessage:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.CUSTOMEORGANIZATIONS_LIST_SUCCESS:
      return Object.assign({}, state, {
        orgs:payload,
        totalCount:payload.length,
        errorMessage:''
      });
    case actionTypes.CUSTOMEORGANIZATIONS_LIST_FAILURE:
      return Object.assign({}, state, {
        orgs: [],
        totalCount: 0,
        errorMessage: payload['errormessage']
      });
    default:
      return state;
  }
}
export default customOrgReducer;