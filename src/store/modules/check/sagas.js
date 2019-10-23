import { all, takeLatest, call, put } from 'redux-saga/effects';
import { notification } from 'antd';

import fbService from '../../../services/firebaseService';

import { checkInSuccess, checkOutSuccess, checkFailure } from './actions';

export function* checkIn({ payload }) {
  try {
    const { eventId, guestId, arrived } = payload;
    const checkRef = `guests/${eventId}/${guestId}/arrived`;

    yield call([fbService, fbService.setData], checkRef, arrived);

    notification.success({
      message: 'Sucesso',
      description: `Check-in realizado com sucesso.`,
      duration: 2
    });

    yield put(checkInSuccess());
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });

    yield put(checkFailure(error));
  }
}

export function* checkOut({ payload }) {
  try {
    const { eventId, guestId, arrived } = payload;
    const checkRef = `guests/${eventId}/${guestId}/arrived`;

    yield call([fbService, fbService.setData], checkRef, arrived);

    notification.success({
      message: 'Sucesso',
      description: `Check-out realizado com sucesso.`,
      duration: 2
    });

    yield put(checkOutSuccess());
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });
    yield put(checkFailure(error));
  }
}

export default all([
  takeLatest('@check/CHECKIN_REQUEST', checkIn),
  takeLatest('@check/CHECKOUT_REQUEST', checkOut)
]);
