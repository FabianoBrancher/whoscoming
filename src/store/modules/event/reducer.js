import produce from 'immer';

const INITIAL_STATE = {
  event: null,
  loading: false,
  error: false
};

export default function event(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@event/NEW_EVENT_REQUEST': {
        draft.event = null;
        draft.loading = false;
        break;
      }
      case '@event/EVENT_DETAILS_REQUEST': {
        draft.event = action.payload.event;
        draft.loading = false;
        break;
      }
      case '@event/CREATE_EVENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@event/UPDATE_EVENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@event/CREATE_EVENT_SUCCESS': {
        draft.event = action.payload.event;
        draft.loading = false;
        break;
      }
      case '@event/UPDATE_EVENT_SUCCESS': {
        draft.event = action.payload.event;
        draft.loading = false;
        break;
      }
      case '@event/REMOVE_EVENT_SUCCESS': {
        draft.event = null;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.event = null;
        break;
      }
      default:
    }
  });
}
