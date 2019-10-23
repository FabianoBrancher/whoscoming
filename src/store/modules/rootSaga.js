import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import event from './event/sagas';
import guest from './guest/sagas';

export default function* rootSaga() {
  return yield all([guest, auth, event]);
}
