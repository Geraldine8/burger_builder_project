import { takeEvery , all} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, checkoutTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchBugerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
