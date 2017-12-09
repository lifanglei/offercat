import actionTypes from '../actions/actionType';

function captchaReducer(state = { captcha_key:'',captcha_url:'',captcha_url2:''}, action) {
  const {payload} = action;
  switch (action.type) {
    case actionTypes.SIGNUP_CAP_SUCCESS:
      return Object.assign({}, state, {
        captcha_key:payload.captcha_key,
        captcha_url:payload.captcha_url,
        captcha_url2:payload.captcha2x_url
      });
    case actionTypes.SIGNUP_CAP_FAILURE:
      return Object.assign({}, state, {
        errorMessage:payload['errormessage'],
        captcha_key:'',
        captcha_url:'',
        captcha_url2:''
      });
    default:
      return state;
  }
}
export default captchaReducer;