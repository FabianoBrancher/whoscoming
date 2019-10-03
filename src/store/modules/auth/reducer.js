const INITIAL_STATE = {
  signed: false,
  user: null,
  loading: false,
  error: false
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case '@auth/SIGN_IN_GOOGLE_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case '@auth/SIGN_IN_FACEBOOK_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case '@auth/SIGN_IN_SUCCESS': {
      return {
        ...state,
        user: action.payload.user,
        signed: true,
        loading: false,
        error: false
      };
    }

    case '@auth/SIGN_FAILURE': {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case '@auth/SIGN_OUT': {
      return {
        ...state,
        uuid: null,
        signed: false
      };
    }
    default:
      return state;
  }
}
