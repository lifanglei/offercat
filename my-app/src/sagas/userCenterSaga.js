import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import Api from '../nets/api';
import {ServerSideError,collectionRequestlSuccess,collectionRequestFailure } from '../actions/collectionAction';
import {localstore} from '../store/localstore';


export function* userCenterTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.fetchCollected,token);
    if(status){
      yield put(collectionRequestlSuccess(result));
    }else{
      yield put(collectionRequestFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchCollection() {
  yield takeLatest(types.COLLECTION_REQUEST, userCenterTask);
}

export default function* userCenterSaga() {
  yield all([
    watchCollection()
  ]);
}