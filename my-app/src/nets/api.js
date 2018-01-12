import 'whatwg-fetch'

/*
 * endpoint:url you want to call
 * request:{method, requestbody(if post)}
 *
 * */
const callApi = (endpoint, request, token, header) => {
  if (request && request.body && request.method === 'POST'){
    request.body = JSON.stringify(request.body);
  }
  if(request && header && request.body && request.method === 'PUT'){
    request.body = JSON.stringify(request.body);
  }

  let headers = {
    Accept: 'application/json',
  };

  if(token){
    headers['Authorization'] = 'jwt '+token;
  }

  if(request.method === 'POST'){
    headers['Content-Type'] = 'application/json';
  }

  if(header){
    headers = Object.assign({}, headers, header);
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
    const url = '/accounts/api/register/';
    return callApi(url, {
      method: 'GET'
    })
  },
  userSignup(userinfo){
    const url = '/accounts/api/register/';
    return callApi(url, {
      method: 'POST',
      body: userinfo
    })
  },
  userSignin(userinfo){
    const url = '/accounts/api/login/';
    return callApi(url, {
      method: 'POST',
      body: userinfo
    })
  },
  companyList(){
    const url = '/hire/company/';
    return callApi(url, {
      method: 'GET'
    })
  },
  positionList(){
    const url = '/hire/position/';
    return callApi(url, {
      method: 'GET'
    })
  },
  companyDetail(uid){
    const url = '/hire/company/'+uid+'/';
    return callApi(url, {
      method: 'GET'
    })
  },
  jobDetail(jobId){
    const url = '/hire/position/'+jobId+'/';
    return callApi(url, {
      method: 'GET'
    })
  },
  fethProfileBasic(token){
    const url = '/profiles/profile/';
    return callApi(url, {
      method: 'GET'
    },token)
  },
  postProfileBasic(payload,uuid,token){
    const url = '/profiles/profile/'+uuid+'/';
    return callApi(url, {
      method: 'PUT',
      body:payload
    },token)
  },
  resumeFetchBasic(token){
    const url = '/profiles/resumes/';
    return callApi(url, {
      method: 'GET',
    },token)
  },
  postResume(payload,uuid,token){
    if(uuid){
      const url = '/profiles/resumes/'+uuid+'/';
      return callApi(url, {
        method: 'PUT',
        body:payload
      },token)
    }else{
      const url = '/profiles/resumes/';
      return callApi(url, {
        method: 'POST',
        body:payload
      },token)
    }
  },
  fetchprofilework(token){
    const url = '/profiles/work_exp/';
    return callApi(url, {
      method: 'GET',
    },token)
  },
  profileworkpost(payload,uuid,token){
    if(uuid){
      const url = '/profiles/work_exp/'+uuid+'/';
      console.log(payload);
      return callApi(url, {
        method: 'PUT',
        body:payload
      },token, {'Content-Type':'application/json'})
    }else{
      const url = '/profiles/work_exp/';
      return callApi(url, {
        method: 'POST',
        body:payload
      },token)
    }
  },

  fetchprofiledu(token){
    const url = '/profiles/edu_exp/';
    return callApi(url, {
      method: 'GET',
    },token)
  },
  profileedupost(payload,uuid,token){
    if(uuid){
      const url = '/profiles/edu_exp/'+uuid+'/';
      console.log(payload);
      return callApi(url, {
        method: 'PUT',
        body:payload
      },token, {'Content-Type':'application/json'})
    }else{
      const url = '/profiles/edu_exp/';
      return callApi(url, {
        method: 'POST',
        body:payload
      },token)
    }
  },

  fetchCustomJobList(keyword,sorter,token){
    let url = '/hire/position/';
    if(keyword){
      url = url +'?search='+keyword;
      if(sorter){
        url = url +'&ordering='+sorter;
      }
    }else{
      if(sorter){
        url = url +'?ordering='+sorter;
      }
    }
    return callApi(url, {
      method: 'GET'
    },token)
  },

  fetchCustomOrganizationsList(keyword,sorter){
    let url = '/hire/company/';
    if(keyword){
      url = url +'?search='+keyword;
      if(sorter){
        url = url +'&ordering='+sorter;
      }
    }else{
      if(sorter){
        url = url +'?ordering='+sorter;
      }
    }
    return callApi(url, {
      method: 'GET'
    })
  },
  postLike(payload,token){
    let url = '/functions/laud/';
    return callApi(url, {
      method: 'POST',
      body:payload
    },token)
  },
  postCollected(payload,token){
    let url = '/functions/collection/';
    return callApi(url, {
      method: 'POST',
      body:payload
    },token)
  },
  fetchCollected(token){
    let url = 'http://localhost:8080/functions/collection/';
    return callApi(url, {
      method: 'GET',
    },token)
  }
}