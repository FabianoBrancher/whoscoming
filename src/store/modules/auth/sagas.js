import { notification } from 'antd';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import history from '../../../services/history';
import fbService from '../../../services/firebaseService';
import { auth, firebase } from '../../../config/firebase';
import { signFailure, signInSuccess, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password
    );

    const { uid } = response.user;

    const usersRef = `users/${uid}`;

    const data = {
      email,
      id: uid
    };

    yield call([fbService, fbService.updateData], usersRef, data);

    notification.success({
      duration: 1.5,
      message: 'Login successful',
      description: `Bem-vindo, ${response.user.displayName}`
    });

    yield put(signInSuccess(response.user));
    history.push('/events');
  } catch (error) {
    notification.error({
      duration: 1.5,
      message: 'Login failed',
      description: error.message
    });

    yield put(signFailure());
  }
}

export function* signInWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = yield call([auth, auth.signInWithPopup], provider);

    notification.success({
      duration: 1.5,
      message: 'Login successful',
      description: `Bem-vindo, ${response.user.displayName}`
    });

    const { uid, email, displayName } = response.user;

    const usersRef = `users/${uid}`;

    const data = {
      displayName,
      email,
      id: uid
    };

    yield call([fbService, fbService.updateData], usersRef, data);

    yield put(signInSuccess(response.user));
    history.push('/events');
  } catch (error) {
    notification.error({
      duration: 1.5,
      message: 'Login failed',
      description: error.message
    });

    yield put(signFailure());
  }
}

export function* signInWithFacebook() {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    const response = yield call([auth, auth.signInWithPopup], provider);

    notification.success({
      duration: 1.5,
      message: 'Login successful',
      description: `Bem-vindo, ${response.user.displayName}`
    });

    const { uid, email, displayName } = response.user;

    const usersRef = `users/${uid}`;

    const data = {
      displayName,
      email,
      id: uid
    };

    yield call([fbService, fbService.updateData], usersRef, data);

    yield put(signInSuccess(response.user));
    history.push('/events');
  } catch (error) {
    notification.error({
      duration: 1.5,
      message: 'Login failed',
      description: error.message
    });

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { fullname, email, password } = payload;

    const response = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password
    );

    const user = auth.currentUser;
    yield call([user, user.updateProfile], { displayName: fullname });

    notification.success({
      duration: 4,
      message: 'Cadastrado com sucesso',
      description: `Usuário ${email} cadastrado com sucesso.`
    });

    const { uid } = response.user;

    const usersRef = `users/${uid}`;

    const data = {
      displayName: fullname,
      email,
      id: uid
    };

    yield call([fbService, fbService.updateData], usersRef, data);

    yield put(signUpSuccess(response.user));
    history.push('/events');
  } catch (error) {
    notification.error({
      duration: 1.5,
      message: 'Sign up failed',
      description: error.message
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
