export const localstore = {
  setToken(payload){
    if (window.localStorage) {
      localStorage.setItem('authToken', payload['token']);
    } else {
      throw new Error('Localstorage is not available');
    }
  },
  refreshtoken(token){
    if (window.localStorage) {
      localStorage.setItem('authToken', token);
    } else {
      throw new Error('Localstorage is not available');
    }
  },
  deleteToken(){
    if (window.localStorage) {
      localStorage.removeItem('authToken');
    } else {
      throw new Error('Localstorage is not available');
    }
  },
  getToken(){
    if (window.localStorage) {
      return localStorage.getItem('authToken')
    } else {
      throw new Error('Localstorage is not available');
    }
  }
};