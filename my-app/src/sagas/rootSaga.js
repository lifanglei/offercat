import { all } from 'redux-saga/effects';
import captchaSaga from './captchaSaga';
import signUpSaga from './signUpSaga';
import logInSage from './loginSaga';
import companySaga from './companySaga';
import positionSaga from './positionSaga';
import companyDetailSaga from './companyDetailSaga';
import jobDetailSaga from './jobDetailSaga';

export default function* rootSaga() {
  yield  all([
    captchaSaga(),
    signUpSaga(),
    logInSage(),
    companySaga(),
    positionSaga(),
    companyDetailSaga(),
    jobDetailSaga()
  ]);
};