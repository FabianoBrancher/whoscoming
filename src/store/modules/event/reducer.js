import produce from 'immer';

const INITIAL_STATE = {
  event: null,
  loading: false,
  error: false,
  totalGuests: 0,
  checkedIn: 0,
  checkdOut: 0
};

export default function event(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@event/NEW_EVENT_REQUEST': {
        draft.event = null;
        break;
      }
      case '@event/EVENT_DETAILS_REQUEST': {
        draft.event = action.payload.event;
        break;
      }
      case '@event/CREATE_EVENT_SUCCESS': {
        draft.event = action.payload.event;
        break;
      }
      case '@event/UPDATE_EVENT_SUCCESS': {
        draft.event = action.payload.event;
        break;
      }
      case '@event/REMOVE_EVENT_SUCCESS': {
        draft.event = null;
        break;
      }
      case '@event/SIGN_OUT': {
        draft.event = null;
        break;
      }
      case '@check/CHECKIN_SUCCESS': {
        draft.checkedIn += 1;
        break;
      }
      default:
    }
  });
}
