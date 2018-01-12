import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, fetchCustomOrganizationsListSuccess, fetchCustomOrganizationsListFailure} from '../actions/customOrganizationActions';
import Api from '../nets/api';


export function* fetchCustomOrgTask(action) {
  try {
    const {status,result} = yield call(Api.fetchCustomOrganizationsList,action.keyword);
    console.log(result);
    if(status){
      yield put(fetchCustomOrganizationsListSuccess(result));
    }else{
      yield put(fetchCustomOrganizationsListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* fetchCustomOrg2Task(action) {
  try {
    const {status,result} = yield call(Api.fetchCustomOrganizationsList,action.keyword, 'hotness');
    console.log(result);
    if(status){
      yield put(fetchCustomOrganizationsListSuccess(result));
    }else{
      yield put(fetchCustomOrganizationsListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* fetchCustomOrg3Task(action) {
  try {
    const {status,result} = yield call(Api.fetchCustomOrganizationsList,action.keyword, 'position_count');
    console.log(result);
    if(status){
      yield put(fetchCustomOrganizationsListSuccess(result));
    }else{
      yield put(fetchCustomOrganizationsListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}

export function* watchfetchCustomOrgTask() {
  yield takeLatest(types.CUSTOMEORGANIZATIONS_LIST_REQUEST, fetchCustomOrgTask);
  yield takeLatest(types.CUSTOMEORGANIZATIONS_TIME_ORDER, fetchCustomOrgTask);
  yield takeLatest(types.CUSTOMEORGANIZATIONS_HOT_ORDER, fetchCustomOrg2Task);
  yield takeLatest(types.CUSTOMEORGANIZATIONS_LENGTH_ORDER, fetchCustomOrg3Task);
}

export default function* customOrgSaga() {
  yield all([
    watchfetchCustomOrgTask(),
  ]);
}