import { all, takeLatest, call, put } from 'redux-saga/effects';
import { notification } from 'antd';

import fbService from '../../../services/firebaseService';

import { createEventSuccess, eventFailure } from './actions';

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
      duration: 1.5
    });

    yield put(createEventSuccess(response));
    history.push('/home');
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 1.5
    });

    yield put(eventFailure(error));
  }
}

export function* updateEvent({ payload }) {
  try {
    const eventsRef = `events/`;

    const response = yield call(
      [fbService, fbService.pushData],
      eventsRef,
      payload
    );

    notification.success({
      message: 'Success',
      description: `Event created successfully.`,
      duration: 1.5
    });

    yield put(createEventSuccess(response));
    history.push('/home');
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 1.5
    });
    yield put(eventFailure(error));
  }
}

export default all([
  takeLatest('@event/CREATE_EVENT_REQUEST', createEvent),
  takeLatest('@event/UPDATE_EVENT_REQUEST', updateEvent),
]);
