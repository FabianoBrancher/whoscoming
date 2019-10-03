import { takeLatest, all, call, put } from 'redux-saga/effects';

import { notification } from 'antd';
import history from '../../../services/history';

import { signFailure, signInSuccess, signUpSuccess } from './actions';

import firebase from '../../../services/firebase';

export function* signIn({ payload }) {
  try {
    const auth = firebase.auth();
    const { email, password } = payload;

    const data = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password
    );

    notification.success({
      message: 'Login successful',
      description: `Bem-vindo, ${data.user.email}`,
      duration: 1.5
    });
    yield put(signInSuccess(data));
    history.push('/home');
  } catch (error) {
    notification.error({
      message: 'Login failed',
      description: error.message,
      duration: 1.5
    });
    yield put(signFailure());
  }
}

export function* signInWithGoogle() {
  try {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const data = yield call([auth, auth.signInWithPopup], provider);

    notification.success({
      message: 'Login successful',
      description: `Bem-vindo, ${data.user.displayName}`,
      duration: 1.5
    });
    yield put(signInSuccess(data.user));
    history.push('/home');
  } catch (error) {
    notification.error({
      message: 'Login failed',
      description: error.message,
      duration: 1.5
    });
    yield put(signFailure());
  }
}

export function* signInWithFacebook() {
  try {
    const auth = firebase.auth();
    const provider = new firebase.auth.FacebookAuthProvider();
    const data = yield call([auth, auth.signInWithPopup], provider);

    notification.success({
      message: 'Login successful',
      description: `Bem-vindo, ${data.user.displayName}`,
      duration: 1.5
    });
    yield put(signInSuccess(data.user));
    history.push('/home');
  } catch (error) {
    notification.error({
      message: 'Login failed',
      description: error.message,
      duration: 1.5
    });
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { fullname, email, password } = payload;
    notification.success({
      message: 'Dados do cadastro',
      description: `Dados criados: ${fullname}, ${email}, ${password}`,
      duration: 4
    });
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signFailure());
  }
}

export function* signOut() {
  const auth = firebase.auth();
  yield call([auth, auth.signOut]);
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_IN_GOOGLE_REQUEST', signInWithGoogle),
  takeLatest('@auth/SIGN_IN_FACEBOOK_REQUEST', signInWithFacebook),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut)
]);
