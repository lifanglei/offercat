import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, fetchProfileBasicSuccess,fetchProfileBasicFailure ,
  postProfileBasicSuccess,postProfileBasicFailure,
  getResumeBasicSuccess,postResumeBasicSuccess,
   profileWorkSuccess,profileWorkFailure,
  profileWorkPostSuccess} from '../actions/profileAction';
import Api from '../nets/api';
import {localstore} from '../store/localstore';


export function* fetchProfileBasicTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.fethProfileBasic, token);
    if(status){
      yield put(fetchProfileBasicSuccess(result));
    }else{
      yield put(fetchProfileBasicFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* postProfileBasicTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.postProfileBasic, action.payload, action.uuid, token);
    if(status){
      yield put(postProfileBasicSuccess(result));
    }else{
      yield put(postProfileBasicFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function*  resumeFetchBasicTask(action){
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.resumeFetchBasic, token);
    if(status){
      yield put(getResumeBasicSuccess(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* resumePostBasicTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.postResume, action.payload, action.uuid, token);
    if(status){
      yield put(postResumeBasicSuccess(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* profileWorkRequestTask() {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.fetchprofilework, token);
    if(status){
      yield put(profileWorkSuccess(result));
    }else{
      yield put(profileWorkFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function*  profileWorkPostTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.profileworkpost, action.payload, action.uuid, token);
    if(status){
      yield put(profileWorkPostSuccess(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* watchfetchProfileBasicTask() {
  yield takeLatest(types.PROFILE_INFO_REQUEST, fetchProfileBasicTask);
}

export function* watchpostProfileBasicTask() {
  yield takeLatest(types.PROFILE_INFOPOST_REQUEST, postProfileBasicTask);
}

export function* watchresumeFetchBasicTask() {
  yield takeLatest(types.PROFILE_RESUME_REQUEST, resumeFetchBasicTask);
}

export function* watchresumePostBasicTask() {
  yield takeLatest(types.PROFILE_RESUME_POST, resumePostBasicTask);
}

export function* watchProfileWorkRequest() {
  yield takeLatest(types.PROFILE_WORK_REQUEST, profileWorkRequestTask);
}

export function* watchProfileWorkPost() {
  yield takeLatest(types.PROFILE_WORKPOST_REQUEST, profileWorkPostTask);
}

export default function* profileSaga() {
  yield all([
    watchfetchProfileBasicTask(),
    watchpostProfileBasicTask(),
    watchresumeFetchBasicTask(),
    watchresumePostBasicTask(),
    watchProfileWorkRequest(),
    watchProfileWorkPost()
  ]);
}