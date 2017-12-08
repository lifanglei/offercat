import actionTypes from '../actions/actionType';
import {localstore} from '../store/localstore';


const getErrormsg = (errMsg)=>{
  if(errMsg['captcha_val']&&errMsg['captcha_val'].length!==0){
    return errMsg['captcha_val'][0];
  }
  if(errMsg['email']&&errMsg['email'].length!==0){
    return errMsg['email'][0];
  }
  if(errMsg['username']&&errMsg['username'].length!==0){
    return errMsg['username'][0];
  }

};

function signupReducer(state = {signupSuccess: false, username:'',email:'',error_message:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.USER_SIGNUP_SUCCESS:
      localstore.setToken(payload);
      return Object.assign({}, state, {
          signupSuccess:true,
          username:payload['username'],
          email:payload['email'],
          error_message:'',
          serverError:''
      });
    case actionTypes.USER_SIGNUP_FAILURE:
      localstore.deleteToken();
      return Object.assign({}, state, {
        signupSuccess:false,
        username:'',
        email:'',
        error_message:state.error_message===getErrormsg(payload['error_message'])?getErrormsg(payload['error_message'])+' ':getErrormsg(payload['error_message']),
        serverError:''
      });
    case actionTypes.INTERNAL_SERVER_ERROR:
      localstore.deleteToken();
      return Object.assign({}, state, {
        signupSuccess: false,
        username:'',
        email:'',
        serverError:payload['serverError']
      });
    case actionTypes.USER_SIGNUP_FINISH:
      return Object.assign({}, state, {
        signupSuccess: false,
        error_message:'',
        serverError:''
      });
    default:
      return state;
  }
}
export default signupReducer;