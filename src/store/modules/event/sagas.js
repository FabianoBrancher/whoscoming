import { all, takeLatest, call, put } from 'redux-saga/effects';
import { notification } from 'antd';

import fbService from '../../../services/firebaseService';

import {
  createEventSuccess,
  updateEventSuccess,
  removeEventSuccess,
  eventFailure
} from './actions';

import history from '../../../services/history';

export function* createEvent({ payload }) {
  try {
    const eventsRef = `events`;

    const response = yield call(
      [fbService, fbService.pushData],
      eventsRef,
      payload
    );

    notification.success({
      message: 'Success',
      description: `Event created successfully.`,
      duration: 2
    });

    yield put(createEventSuccess(response));
    history.push('/dashboard');
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });

    yield put(eventFailure(error));
  }
}

export function* updateEvent({ payload }) {
  try {
    console.log(payload);
    const { event } = payload;
    const { key } = event;
    const eventsRef = `events/${key}`;

    const response = yield call(
      [fbService, fbService.updateData],
      eventsRef,
      event
    );

    notification.success({
      message: 'Sucesso',
      description: `Evento atualizado com sucesso.`,
      duration: 2
    });

    yield put(updateEventSuccess(response));
    history.push('/dashboard');
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });
    yield put(eventFailure(error));
  }
}

export function* removeEvent({ payload }) {
  try {
    const { id } = payload;
    const eventsRef = `events/${id}`;

    const response = yield call([fbService, fbService.removeData], eventsRef);

    notification.success({
      message: 'Sucesso',
      description: 'Evento excluído com sucesso.',
      duration: 2
    });

    yield put(removeEventSuccess(response));
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2
    });
    yield put(eventFailure(error));
  }
}

export default all([
  takeLatest('@event/CREATE_EVENT_REQUEST', createEvent),
  takeLatest('@event/UPDATE_EVENT_REQUEST', updateEvent),
  takeLatest('@event/REMOVE_EVENT_REQUEST', removeEvent)
]);
