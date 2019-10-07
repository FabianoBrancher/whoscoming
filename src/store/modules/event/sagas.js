import { all, takeLatest, call, put } from 'redux-saga/effects';

import { notification } from 'antd';

import firebase from '../../../services/firebase';

import { createEventSuccess, createEventFailure } from './actions';

import history from '../../../services/history';

export function* createEvent({ payload }) {
  try {
    const response = yield call(
      [firebase, firebase.writeData],
      'events',
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

    yield put(createEventFailure(error));
  }
}

export default all([takeLatest('@event/CREATE_EVENT_REQUEST', createEvent)]);
