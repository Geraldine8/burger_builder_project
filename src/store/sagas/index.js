import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {logoutSaga, checkoutTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';


export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBugerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
