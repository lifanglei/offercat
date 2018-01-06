import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, fetchProfileBasicSuccess,fetchProfileBasicFailure} from '../actions/profileAction';
import Api from '../nets/api';
import {localstore} from '../store/localstore';


export function* fetchProfileBasicTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.fethProfileBasic, token);
    if(status){
      yield put(fetchProfileBasicSuccess(result));
    }else{
      result.status = status;
      yield put(fetchProfileBasicFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchfetchProfileBasicTask() {
  yield takeLatest(types.PROFILE_INFO_REQUEST, fetchProfileBasicTask);
}

export default function* profileSaga() {
  yield all([
    watchfetchProfileBasicTask(),
  ]);
}