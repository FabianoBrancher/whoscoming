export function checkInRequest(eventId, guestId, arrived) {
  return {
    type: '@check/CHECKIN_REQUEST',
    payload: { eventId, guestId, arrived }
  };
}

export function checkInSuccess() {
  return {
    type: '@check/CHECKIN_SUCCESS'
  };
}

export function checkOutRequest(eventId, guestId, arrived) {
  return {
    type: '@check/CHECKOUT_REQUEST',
    payload: { eventId, guestId, arrived }
  };
}

export function checkOutSuccess() {
  return {
    type: '@check/CHECKOUT_SUCCESS'
  };
}

export function checkFailure() {
  return {
    type: '@check/CHECK_FAILURE'
  };
}
