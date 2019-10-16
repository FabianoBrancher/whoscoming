import { all, takeLatest, call, put } from 'redux-saga/effects';

import { notification } from 'antd';

import { createGuestSuccess, guestFailure } from './actions';

import fbService from '../../../services/firebaseService';

export function* createGuest({ payload }) {
  try {
    const { data } = payload;
    const guestsRef = `guests`;

    const response = yield call(
      [fbService, fbService.updateListData],
      guestsRef,
      data
    );

    notification.success({
      message: 'Sucesso',
      description: 'Convidado salvo com sucesso.',
      duration: 2
    });

    yield put(createGuestSuccess(response));
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });

    yield put(guestFailure(error));
  }
}

// export function* updateGuest(payload) {
//   try {

//   } catch (err) {

//   }
// }

// export function* removeGuest(payload) {
//   try {

//   } catch (err) {

//   }
// }

export default all([
  takeLatest('@guest/CREATE_GUEST_REQUEST', createGuest)
  // takeLatest('@guest/UPDATE_GUEST_REQUEST', updateGuest),
  // takeLatest('@guest/REMOVE_GUEST_REQUEST', removeGuest),
]);
