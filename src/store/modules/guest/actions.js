export function createGuestRequest(data) {
  return {
    type: '@guest/CREATE_GUEST_REQUEST',
    payload: { data }
  };
}

export function createGuestListRequest(data) {
  return {
    type: '@guest/CREATE_GUEST_LIST_REQUEST',
    payload: { data }
  };
}

export function updateGuestRequest(data) {
  return {
    type: '@guest/UPDATE_GUEST_REQUEST',
    payload: { data }
  };
}

export function removeGuestRequest(id, event_id) {
  return {
    type: '@guest/REMOVE_GUEST_REQUEST',
    payload: { id, event_id }
  };
}

export function createGuestSuccess(guest) {
  return {
    type: '@guest/CREATE_GUEST_SUCCESS',
    payload: { guest }
  };
}

export function createGuestListSuccess() {
  return {
    type: '@guest/CREATE_GUEST_LIST_SUCCESS'
  };
}

export function updateGuestSuccess(guest) {
  return {
    type: '@guest/UPDATE_GUEST_SUCCESS',
    payload: { guest }
  };
}

export function removeGuestSuccess() {
  return {
    type: '@guest/REMOVE_GUEST_SUCCESS'
  };
}

export function getGuestDetailsRequest(guest) {
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
