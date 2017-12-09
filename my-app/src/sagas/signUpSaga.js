import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {fetchCaptchaSuccess} from '../actions/captchaActions';
import {ServerSideError, userSignupSuccess,userSignupFailure} from '../actions/signUpActions';
import Api from '../nets/api';


export function* userSignupTask(action) {
  try {
    const {status,result} = yield call(Api.userSignup, action.payload);
    if(status){
      yield put(userSignupSuccess(result));
    }else{
      yield put(userSignupFailure(result));
      if(result){
        yield put(fetchCaptchaSuccess(result));
      }
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchSignupTask() {
  yield takeLatest(types.USER_SIGNUP_REQUEST, userSignupTask);
}

export default function* signUpSaga() {
  yield all([
    watchSignupTask(),
  ]);
}