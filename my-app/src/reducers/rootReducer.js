import { combineReducers } from 'redux';
import  captchaReducer  from './captchaReducer';
import signupReducer from './signUpReducer';
import signinReducer from './signInReducer';
const rootReducer = combineReducers({
  captcha:captchaReducer,
  signUp:signupReducer,
  signIn:signinReducer
});

export default rootReducer;