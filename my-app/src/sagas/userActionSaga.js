import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import Api from '../nets/api';
import {ServerSideError } from '../actions/userActions';
import {localstore} from '../store/localstore';


export function* postLikeTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.postLike,action.payload,token);
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* postCollectedTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.postCollected,action.payload,token);
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* watchUserAction() {
  yield takeLatest(types.IS_LAUDED_REQUEST, postLikeTask);
  yield takeLatest(types.IS_COLLECTED_REQUEST, postCollectedTask);
}

export default function* userActionSaga() {
  yield all([
    watchUserAction(),
  ]);
}