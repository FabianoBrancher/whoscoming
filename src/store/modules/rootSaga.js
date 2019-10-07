import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import event from './event/sagas';

export default function* rootSaga() {
  return yield all([auth, event]);
}
