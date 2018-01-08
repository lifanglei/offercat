import { combineReducers } from 'redux';
import  captchaReducer  from './captchaReducer';
import signupReducer from './signUpReducer';
import signinReducer from './signInReducer';
import companyReducer from './companyReducer';
import positionReducer from './positionReducer';
import companyDetailReducer from './companyDetailReducer';
import positionDetailReducer from './positionDetailReducer';
import profileinitReducer from './profileinitReducer';
import profileWorkReducer from './profileworkreducer';

const rootReducer = combineReducers({
  captcha:captchaReducer,
  signUp:signupReducer,
  signIn:signinReducer,
  companyList:companyReducer,
  positionList:positionReducer,
  companyDetail:companyDetailReducer,
  positionDetail:positionDetailReducer,
  profileinit:profileinitReducer,
  profilework:profileWorkReducer
});

export default rootReducer;