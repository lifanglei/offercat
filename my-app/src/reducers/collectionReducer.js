import actionTypes from '../actions/actionType';

function collectionReducer(state = { collectionList:[]}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.COLLECTION_SUCCESS:
      return Object.assign({}, state, {
        collectionList:payload,
        errorMessage:''
      });
    case actionTypes.COLLECTION_FAILURE:
      return Object.assign({}, state, {
        collectionList:[],
        errorMessage: payload
      });
    default:
      return state;
  }
}
export default collectionReducer;