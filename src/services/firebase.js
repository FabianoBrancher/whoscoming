import firebase from '../config/firebase';

class Firebase {
  constructor() {
    this.firebase = firebase.database();
  }

  writeData(nodePath, data) {
    const ref = this.firebase.ref().child(nodePath);
    const id = ref.key;

    console.log(ref);
    console.log(id);

    const newData = {
      ...data,
      event_id: id
    };

    ref.push(newData);
  }
}

export default new Firebase();
