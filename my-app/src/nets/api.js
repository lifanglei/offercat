import 'whatwg-fetch'

/*
 * endpoint:url you want to call
 * request:{method, requestbody(if post)}
 *
 * */
const callApi = (endpoint, request, token) => {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if(token){
    headers['Authorization'] = 'jwt '+token;
  }

  const requestWithHeaders = {
    ...{headers},
    ...request
  };

  return fetch(endpoint, requestWithHeaders)
      .then(response => response.json().then(body => ({response, body})))
      .then(({response, body}) => {
        if(response.headers.has('newtoken')){
          return {
            token : response.headers.get('newtoken'),
            result: body,
            status: response.ok
          }
        }else{
          return {
            result: body,
            status: response.ok
          }
        }

      })
};

export default {
  getCaptcha() {
    const url = 'http://localhost:8080/accounts/api/register/';
    return callApi(url, {
      method: 'GET'
    })
  },
  userSignup(userinfo){
    const url = 'http://localhost:8080/accounts/api/register/';
    return callApi(url, {
      method: 'POST',
      body: userinfo
    })
  },
  userSignin(userinfo){
    const url = 'http://localhost:8080/accounts/api/login/';
    return callApi(url, {
      method: 'POST',
      body: userinfo
    })
  },
  companyList(){
    const url = 'http://localhost:8080/hire/company/';
    return callApi(url, {
      method: 'GET'
    })
  },
  positionList(){
    const url = 'http://localhost:8080/hire/position/';
    return callApi(url, {
      method: 'GET'
    })
  }
}