export function createEventRequest(name, location, date, uid) {
  return {
    type: '@event/CREATE_EVENT_REQUEST',
    payload: { name, location, date, createdBy: uid }
  };
}

export function updateEventRequest(data) {
  return {
    type: '@event/UPDATE_EVENT_REQUEST',
    payload: { data }
  };
}

export function removeEventRequest(id) {
  return {
    type: '@event/REMOVE_EVENT_REQUEST',
    payload: { id }
  };
}

export function createEventSuccess(event) {
  return {
    type: '@event/CREATE_EVENT_SUCCESS',
    payload: { event }
  };
}

export function eventFailure() {
  return {
    type: '@event/EVENT_FAILURE'
  };
}

export function loadEventRequest(events) {
  return {
    type: '@event/LOAD_EVENT_REQUEST',
    payload: { events }
  };
}

export function getEventRequest(event) {
  return {
    type: '@event/DETAILS_REQUEST',
    payload: { event }
  };
}

export function newEventRequest() {
  return {
    type: '@event/NEW_REQUEST'
  };
}
