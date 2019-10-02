import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import firebase from './config/firebase';

firebase.auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
  } else {
    // No user is signed in.
    console.log('não logado');
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
