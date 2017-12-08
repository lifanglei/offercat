import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, userSigninSuccess, userSigninFailure} from '../actions/signInActions';
import Api from '../nets/api';


export function* userSigninTask(action) {
  try {
    const {status,result} = yield call(Api.userSignin, action.payload);
    if(status){
      yield put(userSigninSuccess(result));
    }else{
      yield put( userSigninFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchloginTask() {
  yield takeLatest(types.USER_LOGIN_REQUEST, userSigninTask);
}

export default function* signInSaga() {
  yield all([
    watchloginTask(),
  ]);
}