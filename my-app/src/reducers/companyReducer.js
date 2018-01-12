import actionTypes from '../actions/actionType';

function companyReducer(state = { companys: [], totalCount: 0, currentPage: 1,errorMessage:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.COMPANY_LIST_SUCCESS:
      return Object.assign({}, state, {
          companys:payload,
          totalCount:payload.length,
          errorMessage:''
      });
    case actionTypes.COMPANY_LIST_FAILURE:
      return Object.assign({}, state, {
        companys: [],
        totalCount: 0,
        errorMessage: payload['errormessage']
      });
    default:
      return state;
  }
}
export default companyReducer;