import { combineReducers } from 'redux';

import auth from './auth/reducer';
import event from './event/reducer';
import guest from './guest/reducer';

export default combineReducers({
  auth,
  event,
  guest
});
