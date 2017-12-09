import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError,fetchCaptchaSuccess,fetchCaptchaFailure} from '../actions/captchaActions';
import Api from '../nets/api';


export function* fetchCaptchaTask(action) {
  try {
    const {status,result} = yield call(Api.getCaptcha);
    if(status){
      yield put(fetchCaptchaSuccess(result));
    }else{
      yield put(fetchCaptchaFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchfetchCaptchaTask() {
  yield takeLatest(types.SIGNUP_CAP_REQUEST, fetchCaptchaTask);
}

export default function* captchaSaga() {
  yield all([
    watchfetchCaptchaTask(),
  ]);
}