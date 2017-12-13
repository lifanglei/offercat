import { combineReducers } from 'redux';
import  captchaReducer  from './captchaReducer';
import signupReducer from './signUpReducer';
import signinReducer from './signInReducer';
import companyReducer from './companyReducer';
const rootReducer = combineReducers({
  captcha:captchaReducer,
  signUp:signupReducer,
  signIn:signinReducer,
  companyList:companyReducer
});

export default rootReducer;