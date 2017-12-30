import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, companyDetailSuccess, companyDetailFailure} from '../actions/companyDetailAction';
import Api from '../nets/api';


export function* fetchCompanyDetailTask(action) {
  try {
    const {status,result} = yield call(Api.companyDetail,action.payload.companyID);
    if(status){
      yield put(companyDetailSuccess(result));
    }else{
      yield put(companyDetailFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchfetchCompanyDetail() {
  yield takeLatest(types.COMPANY_DETAIL_REQUEST, fetchCompanyDetailTask);
}

export default function* companyDetailSaga() {
  yield all([
    watchfetchCompanyDetail(),
  ]);
}