import actionTypes from '../actions/actionType';
import {localstore} from '../store/localstore';


const getErrormsg = (errMsg)=>{
  if(errMsg['username']&&errMsg['username'].length!==0){
    return errMsg['username'][0];
  }
  if(errMsg['password']&&errMsg['password'].length!==0){
    return errMsg['password'][0];
  }
};

function signinReducer(state = {login_success: false, username:'',email:'',error_message:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      localstore.setToken(payload);
      return Object.assign({}, state, {
        login_success:true,
        username:payload['username'],
        email:payload['email'],
        error_message:'',
        serverError:''
      });
    case actionTypes.USER_LOGIN_FAILURE:
      localstore.deleteToken();
      return Object.assign({}, state, {
        login_success:false,
        username:'',
        email:'',
        error_message:state.error_message===getErrormsg(payload['error_message'])?getErrormsg(payload['error_message'])+' ':getErrormsg(payload['error_message']),
        serverError:''
      });
    case actionTypes.INTERNAL_SERVER_ERROR:
      localstore.deleteToken();
      return Object.assign({}, state, {
        login_success: false,
        username:'',
        email:'',
        serverError:payload['serverError']
      });
    case actionTypes.USER_LOGIN_FINISH:
      return Object.assign({}, state, {
        login_success: false,
        error_message:'',
        serverError:''
      });
    default:
      return state;
  }
}
export default signinReducer;