import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBJd7bAKyF34DhDKgLgHgxdr3Xo9n_dUEA',
  authDomain: 'dinnert-app.firebaseapp.com',
  databaseURL: 'https://dinnert-app.firebaseio.com',
  projectId: 'dinnert-app',
  storageBucket: 'dinnert-app.appspot.com',
  messagingSenderId: '852252849167',
  appId: '1:852252849167:web:84cf248352fef25ae75f7a'
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
