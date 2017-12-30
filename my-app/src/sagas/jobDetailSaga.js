import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, jobDetailSuccess, jobDetailFailure} from '../actions/jobDetailActions';
import Api from '../nets/api';


export function* fetchJobDetailTask(action) {
  try {
    const {status,result} = yield call(Api.jobDetail,action.payload.jobId);
    if(status){
      yield put(jobDetailSuccess(result));
    }else{
      yield put(jobDetailFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchfetchJobDetail() {
  yield takeLatest(types.JOB_DETAIL_REQUEST, fetchJobDetailTask);
}

export default function* jobDetailSaga() {
  yield all([
    watchfetchJobDetail(),
  ]);
}