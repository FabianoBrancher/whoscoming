import { takeLatest, all, call, put } from 'redux-saga/effects';

import { notification } from 'antd';
import history from '../../../services/history';

import { signFailure, signInSuccess, signUpSuccess } from './actions';

import firebase from '../../../config/firebase';

const auth = firebase.auth();

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password
    );

    notification.success({
      message: 'Login successful',
      description: `Bem-vindo, ${response.user.email}`,
      duration: 1.5
    });

    yield put(signInSuccess(response));
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
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = yield call([auth, auth.signInWithPopup], provider);

    notification.success({
      message: 'Login successful',
      description: `Bem-vindo, ${response.user.displayName}`,
      duration: 1.5
    });

    yield put(signInSuccess(response.user));
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
    const provider = new firebase.auth.FacebookAuthProvider();
    const response = yield call([auth, auth.signInWithPopup], provider);

    notification.success({
      message: 'Login successful',
      description: `Bem-vindo, ${response.user.displayName}`,
      duration: 1.5
    });

    yield put(signInSuccess(response.user));
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
    const { email, password } = payload;

    const response = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password
    );

    notification.success({
      message: 'Cadastrado com sucesso',
      description: `Usuário ${email} cadastrado com sucesso.`,
      duration: 4
    });

    yield put(signUpSuccess(response.user));
    history.push('/home');
  } catch (error) {
    notification.error({
      message: 'Sign up failed',
      description: error.message,
      duration: 1.5
    });

    yield put(signFailure());
  }
}

export function* signOut() {
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
