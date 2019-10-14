export function createGuestRequest(name, companionName, status, event_id) {
  return {
    type: 'guest/CREATE_GUEST_REQUEST',
    payload: { name, companionName, status, event_id }
  };
}

export function updateGuestRequest(data) {
  return {
    type: '@guest/UPDATE_GUEST_REQUEST',
    payload: { data }
  };
}

export function removeGuestRequest(id) {
  return {
    type: '@guest/REMOVE_GUEST_REQUEST',
    payload: { id }
  };
}

export function createGuestSuccess(guest) {
  return {
    type: '@guest/CREATE_GUEST_SUCCESS',
    payload: { guest }
  };
}

export function guestFailure() {
  return {
    type: '@guest/GUEST_FAILURE'
  };
}
