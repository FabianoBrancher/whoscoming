export function createEventRequest(event) {
  return {
    type: '@event/CREATE_EVENT_REQUEST',
    payload: { event }
  };
}

export function updateEventRequest(event) {
  return {
    type: '@event/UPDATE_EVENT_REQUEST',
    payload: { event }
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

export function updateEventSuccess(event) {
  return {
    type: '@event/UPDATE_EVENT_SUCCESS',
    payload: { event }
  };
}

export function removeEventSuccess() {
  return {
    type: '@event/REMOVE_EVENT_SUCCESS'
  };
}

// Limpa o state do evento
export function newEventRequest() {
  return {
    type: '@event/NEW_EVENT_REQUEST'
  };
}

// carrega o state do evento
export function getEventDetailsRequest(event) {
  return {
    type: '@event/EVENT_DETAILS_REQUEST',
    payload: { event }
  };
}

export function eventFailure() {
  return {
    type: '@event/EVENT_FAILURE'
  };
}
