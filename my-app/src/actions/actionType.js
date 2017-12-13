const createConstants = (...constants) => {
  let types = {};
  for(let type of constants){
    types[type] = type;
  }
  return types;
};

export default createConstants(
    'USER_LOGIN_REQUEST',
    'USER_LOGIN_SUCCESS',
    'USER_LOGIN_FAILURE',
    'USER_LOGIN_FINISH',

    'USER_SIGNUP_REQUEST',
    'USER_SIGNUP_SUCCESS',
    'USER_SIGNUP_FAILURE',
    'USER_SIGNUP_FINISH',

    'SIGNUP_CAP_REQUEST',
    'SIGNUP_CAP_SUCCESS',
    'SIGNUP_CAP_FAILURE',

    'COMPANY_LIST_REQUEST',
    'COMPANY_LIST_SUCCESS',
    'COMPANY_LIST_FAILURE',

    'INTERNAL_SERVER_ERROR',
);