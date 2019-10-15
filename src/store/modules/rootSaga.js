import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import event from './event/sagas';
import guest from './guests/sagas';

export default function* rootSaga() {
  return yield all([auth, event, guest]);
}
