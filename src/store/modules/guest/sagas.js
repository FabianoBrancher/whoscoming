import { all, takeLatest, call, put } from 'redux-saga/effects';

import { notification } from 'antd';

import {
  createGuestSuccess,
  updateGuestSuccess,
  removeGuestSuccess,
  guestFailure
} from './actions';

import fbService from '../../../services/firebaseService';

export function* createGuest({ payload }) {
  try {
    const { data } = payload;
    const { eventId } = data;
    const guestsRef = `guests/${eventId}`;

    const response = yield call(
      [fbService, fbService.pushData],
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

export function* updateGuest({ payload }) {
  try {
    const { data } = payload;
    const { eventId, id } = data;
    const guestsRef = `guests/${eventId}/${id}`;

    Object.keys(data).forEach(key =>
      data[key] === undefined ? delete data[key] : ''
    );

    const response = yield call(
      [fbService, fbService.updateData],
      guestsRef,
      data
    );

    notification.success({
      message: 'Sucesso',
      description: `Convidado atualizado com sucesso.`,
      duration: 2
    });

    yield put(updateGuestSuccess(response));
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });
    yield put(guestFailure(error));
  }
}

export function* removeGuest({ payload }) {
  try {
    const { id, event_id } = payload;
    const guestsRef = `guests/${event_id}/${id}`;

    const response = yield call([fbService, fbService.removeData], guestsRef);

    notification.success({
      message: 'Sucesso',
      description: 'Convidado excluído com sucesso.',
      duration: 2
    });

    yield put(removeGuestSuccess(response));
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });
    yield put(guestFailure(error));
  }
}

export default all([
  takeLatest('@guest/CREATE_GUEST_REQUEST', createGuest),
  takeLatest('@guest/UPDATE_GUEST_REQUEST', updateGuest),
  takeLatest('@guest/REMOVE_GUEST_REQUEST', removeGuest)
]);
