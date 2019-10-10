const INITIAL_STATE = {
  event: null,
  loading: false,
  error: false
};

export default function event(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@event/CREATE_EVENT_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case '@event/CREATE_EVENT_SUCCESS': {
      return {
        ...state,
        event: action.payload.event,
        loading: false,
        error: false
      };
    }
    case '@event/UPDATE_EVENT_REQUEST': {
      return {
        ...state,
        event: action.payload.event,
        loading: true
      };
    }
    case '@event/REMOVE_EVENT_REQUEST': {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
