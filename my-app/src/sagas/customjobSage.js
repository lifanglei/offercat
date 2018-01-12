import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, fetchCustomjobListFailure, fetchCustomjobListSuccess} from '../actions/customjobListActions';
import Api from '../nets/api';
import {localstore} from '../store/localstore';


export function* fetchCustomjobListTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.fetchCustomJobList,action.keyword,null,token);
    if(status){
      yield put(fetchCustomjobListSuccess(result));
    }else{
      yield put(fetchCustomjobListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* fetchCustomOrgTask(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.fetchCustomJobList,action.keyword,null,token);
    if(status){
      yield put(fetchCustomjobListSuccess(result));
    }else{
      yield put(fetchCustomjobListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* fetchCustomOrg2Task(action) {
  try {
    const token = localstore.getToken();
    const {status,result} = yield call(Api.fetchCustomJobList,action.keyword, 'hotness',token);
    if(status){
      yield put(fetchCustomjobListSuccess(result));
    }else{
      yield put(fetchCustomjobListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchfetchCustomjobListTask() {
  yield takeLatest(types.CUSTOMEJOB_LIST_REQUEST, fetchCustomjobListTask);
  yield takeLatest(types.CUSTOMEJOBS_TIME_ORDER, fetchCustomOrgTask);
  yield takeLatest(types.CUSTOMEJOBS_HOT_ORDER, fetchCustomOrg2Task);
}

export default function* customjobSaga() {
  yield all([
    watchfetchCustomjobListTask(),
  ]);
}