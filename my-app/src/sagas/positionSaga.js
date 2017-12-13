import { all, put, takeLatest, call } from 'redux-saga/effects';
import types from '../actions/actionType'
import {ServerSideError, fetchPositionListSuccess, fetchPositionListFailure} from '../actions/positionListActions';
import Api from '../nets/api';


export function* fetchPositionTask(action) {
  try {
    const {status,result} = yield call(Api.positionList);
    if(status){
      yield put(fetchPositionListSuccess(result));
    }else{
      yield put(fetchPositionListFailure(result));
    }
  }catch(err){
    yield put(ServerSideError({serverError:500}));
  }
}


export function* watchfetchPositionTask() {
  yield takeLatest(types.POSITION_LIST_REQUEST, fetchPositionTask);
}

export default function* positionSaga() {
  yield all([
    watchfetchPositionTask(),
  ]);
}