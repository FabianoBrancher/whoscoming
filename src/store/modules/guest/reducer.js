import produce from 'immer';

const INITIAL_STATE = {
  guest: null,
  loading: false,
  error: false
};

export default function guest(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@guest/NEW_GUEST_REQUEST': {
        draft.guest = null;
        break;
      }
      case '@guest/GUEST_DETAILS_REQUEST': {
        draft.guest = action.payload.guest;
        break;
      }
      case '@guest/CREATE_GUEST_SUCCESS': {
        draft.guest = action.payload.guest;
        break;
      }
      case '@guest/UPDATE_GUEST_SUCCESS': {
        draft.guest = action.payload.guest;
        break;
      }
      case '@guest/REMOVE_GUEST_SUCCESS': {
        draft.guest = null;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.guest = null;
        break;
      }
      default:
    }
  });
}
