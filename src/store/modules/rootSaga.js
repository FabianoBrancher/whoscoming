import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import event from './event/sagas';
import guest from './guest/sagas';
import check from './check/sagas';

export default function* rootSaga() {
  return yield all([auth, event, guest, check]);
}
