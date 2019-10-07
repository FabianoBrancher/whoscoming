import firebase from '../config/firebase';

class Firebase {
  constructor() {
    this.firebase = firebase.database();
    this.baseUrl = 'https://whoscoming-app.firebaseio.com/';
  }

  writeData(path, data) {
    console.log(path, data);
    this.firebase.ref(path).set({
      fullname: data.fullname,
      email: data.email,
      password: data.password
    });
  }
}

export default new Firebase();
