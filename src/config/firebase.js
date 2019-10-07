import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBbXzM4p9CT7EXQix7Sehb1kAmUbWetHpE',
  authDomain: 'whoscoming-app.firebaseapp.com',
  databaseURL: 'https://whoscoming-app.firebaseio.com',
  projectId: 'whoscoming-app',
  storageBucket: '',
  messagingSenderId: '880137926397',
  appId: '1:880137926397:web:8b0503692e080c2d027094'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
