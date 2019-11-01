import { all, takeLatest, call, put } from 'redux-saga/effects';

import { notification } from 'antd';

import {
  guestFailure,
  createGuestSuccess,
  updateGuestSuccess,
  removeGuestSuccess,
  createGuestListSuccess
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
      duration: 2,
      message: 'Sucesso',
      description: 'Convidado salvo com sucesso.'
    });

    yield put(createGuestSuccess(response));
  } catch (error) {
    notification.error({
      duration: 2,
      message: 'Error',
      description: error.message
    });

    yield put(guestFailure(error));
  }
}

export function* createGuestList({ payload }) {
  try {
    const { data } = payload;
    const { eventId } = data;
    const guestsList = data.previewData;
    const guestsRef = `guests/${eventId}`;

    const response = yield call(
      [fbService, fbService.createGuestList],
      guestsRef,
      guestsList
    );

    notification.success({
      duration: 2,
      message: 'Sucesso',
      description: 'Convidados salvos com sucesso.'
    });

    yield put(createGuestListSuccess(response));
  } catch (error) {
    notification.error({
      duration: 2,
      message: 'Error',
      description: error.message
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
      duration: 2,
      message: 'Sucesso',
      description: `Convidado atualizado com sucesso.`
    });

    yield put(updateGuestSuccess(response));
  } catch (error) {
    notification.error({
      duration: 2,
      message: 'Error',
      description: error.message
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
      duration: 2,
      message: 'Sucesso',
      description: 'Convidado excluído com sucesso.'
    });

    yield put(removeGuestSuccess(response));
  } catch (error) {
    notification.error({
      duration: 2,
      message: 'Error',
      description: error.message
    });
    yield put(guestFailure(error));
  }
}

export default all([
  takeLatest('@guest/CREATE_GUEST_REQUEST', createGuest),
  takeLatest('@guest/UPDATE_GUEST_REQUEST', updateGuest),
  takeLatest('@guest/REMOVE_GUEST_REQUEST', removeGuest),
  takeLatest('@guest/CREATE_GUEST_LIST_REQUEST', createGuestList)
]);
