import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, checkoutTimeoutSaga} from './auth';


export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga);
}
