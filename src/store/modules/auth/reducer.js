const INITIAL_STATE = {
  signed: false,
  user: null,
  error: '',
  loading: false
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_UP_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case '@auth/SIGN_UP_SUCCESS': {
      return {
        ...state,
        signed: true,
        user: action.payload.user,
        loading: false
      };
    }
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
        loading: false
      };
    }
    case '@auth/SIGN_FAILURE': {
      return {
        ...state,
        loading: false,
        error: 'error'
      };
    }
    case '@auth/SIGN_OUT': {
      return {
        ...state,
        user: null,
        signed: false
      };
    }
    default:
      return state;
  }
}
