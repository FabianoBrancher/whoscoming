export function createEventRequest(name, location, date, uid) {
  return {
    type: '@event/CREATE_EVENT_REQUEST',
    payload: { name, location, date, uid }
  };
}

export function createEventSuccess(event) {
  return {
    type: '@event/CREATE_EVENT_SUCCESS',
    payload: { event }
  };
}

export function createEventFailure() {
  return {
    type: '@event/CREATE_EVENT_FAILURE',
    payload: {}
  };
}

export function loadEventRequest(events) {
  return {
    type: '@event/LOAD_EVENT_REQUEST',
    payload: { events }
  };
}
