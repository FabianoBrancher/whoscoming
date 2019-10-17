export function createGuestRequest(event_id, data) {
  return {
    type: '@guest/CREATE_GUEST_REQUEST',
    payload: { event_id, data }
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