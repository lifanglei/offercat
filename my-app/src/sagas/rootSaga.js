import {all} from 'redux-saga/effects';
import captchaSaga from './captchaSaga';
import signUpSaga from './signUpSaga';
import logInSage from './loginSaga';
import companySaga from './companySaga';
import positionSaga from './positionSaga';
import companyDetailSaga from './companyDetailSaga';
import jobDetailSaga from './jobDetailSaga';
import profileSaga from './profileSaga';
import customjobSaga from './customjobSage';
import customOrgSaga from './customOrgSaga';
import userActionSaga from './userActionSaga';
import userCenterSaga from './userCenterSaga';

export default function* rootSaga() {
  yield  all([
    captchaSaga(),
    signUpSaga(),
    logInSage(),
    companySaga(),
    positionSaga(),
    companyDetailSaga(),
    jobDetailSaga(),
    profileSaga(),
    customjobSaga(),
    customOrgSaga(),
    userActionSaga(),
    userCenterSaga()
  ]);
};