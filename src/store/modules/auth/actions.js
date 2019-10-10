export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password }
  };
}

export function signInWithFacebook() {
  return {
    type: '@auth/SIGN_IN_FACEBOOK_REQUEST',
    payload: {}
  };
}

export function signInWithGoogle() {
  return {
    type: '@auth/SIGN_IN_GOOGLE_REQUEST',
    payload: {}
  };
}

export function signInSuccess(user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user }
  };
}

export function signUpRequest(fullname, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { fullname, email, password }
  };
}

export function signUpSuccess(user) {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
    payload: { user }
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE'
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT'
  };
}
