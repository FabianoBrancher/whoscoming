const INITIAL_STATE = {
  guest: null,
  loading: false,
  error: false
};

export default function guest(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@guest/CREATE_GUEST_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case '@guest/CREATE_GUEST_SUCCESS': {
      return {
        ...state,
        guest: action.payload.guest,
        loading: false,
        error: false
      };
    }
    case '@guest/UPDATE_GUEST_REQUEST': {
      return {
        ...state,
        guest: action.payload.guest,
        loading: true
      };
    }
    case '@guest/REMOVE_GUEST_REQUEST': {
      return {
        ...state
      };
    }
    case '@auth/SIGN_OUT': {
      return {
        ...state,
        guest: null
      };
    }
    default:
      return state;
  }
}
