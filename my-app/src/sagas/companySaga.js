import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError,fetchCompanyListSuccess,fetchCompanyListFailure} from '../actions/companyListActions';
import Api from '../nets/api';


export function* fetchCompanyTask(action) {
  try {
    const {status,result} = yield call(Api.companyList);
    if(status){
      yield put(fetchCompanyListSuccess(result));
    }else{
      yield put(fetchCompanyListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchfetchCompanyTask() {
  yield takeLatest(types.COMPANY_LIST_REQUEST, fetchCompanyTask);
}

export default function* companySaga() {
  yield all([
    watchfetchCompanyTask(),
  ]);
}