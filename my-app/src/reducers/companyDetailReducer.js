import actionTypes from '../actions/actionType';

function companyDetailReducer(state = { companyDetail:{}}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.COMPANY_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        companyDetail:payload,
        errorMessage:''
      });
    case actionTypes.COMPANY_DETAIL_FAILURE:
      return Object.assign({}, state, {
        companyDetail:{},
        errorMessage: payload['errormessage']
      });
    default:
      return state;
  }
}
export default companyDetailReducer;