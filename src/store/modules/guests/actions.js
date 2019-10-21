export function createGuestRequest(event_id, data) {
  return {
    type: '@guest/CREATE_GUEST_REQUEST',
    payload: { event_id, data }
  };
}

export function createGuestSuccess(guest) {
  return {
    type: '@guest/CREATE_GUEST_SUCCESS',
    payload: { guest }
  };
}

export function updateGuestRequest(data) {
  return {
    type: '@guest/UPDATE_GUEST_REQUEST',
    payload: { data }
  };
}

export function updateGuestSuccess() {
  return {
    type: '@guest/UPDATE_GUEST_SUCCESS'
  };
}

export function removeGuestRequest(id, event_id) {
  return {
    type: '@guest/REMOVE_GUEST_REQUEST',
    payload: { id, event_id }
  };
}

export function removeGuestSuccess() {
  return {
    type: '@guest/REMOVE_GUEST_SUCCESS'
  };
}

export function getGuestRequest(guest) {
  return {
    type: '@guest/GUEST_DETAILS_REQUEST',
    payload: { guest }
  };
}

export function newGuestRequest() {
  return {
    type: '@guest/NEW_GUEST_REQUEST'
  };
}

export function guestFailure() {
  return {
    type: '@guest/GUEST_FAILURE'
  };
}
