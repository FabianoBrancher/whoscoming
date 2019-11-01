import { database } from '../config/firebase';

class FirebaseService {
  constructor() {
    this.db = database;
  }

  setData(path, data) {
    const ref = this.db.ref().child(path);
    ref.set(data);
  }

  pushData(path, data) {
    const ref = this.db.ref().child(path);
    ref.push(data);
  }

  updateData(path, data) {
    const ref = this.db.ref().child(path);
    ref.update(data);
  }

  createGuestList(path, data) {
    const updates = {};

    data.forEach(guest => {
      const { key } = database.ref().push();
      updates[key] = guest;
    });

    const ref = this.db.ref().child(path);
    ref.update(updates);
  }

  // updateListData(path, data) {
  //   const { eventId } = data;

  //   const guests = data.previewData;
  //   const updates = {};
  //   const parentKey = this.db.ref().push().key;

  //   guests.forEach((element, index) => {
  //     const { key } = database.ref().push();
  //     if (index === 0) {
  //       updates[`${eventId}/${parentKey}`] = {
  //         ...element,
  //         parent: ''
  //       };
  //     } else {
  //       updates[`${eventId}/${key}`] = {
  //         ...element,
  //         parent: parentKey
  //       };
  //     }
  //   });

  //   const ref = this.db.ref().child(path);
  //   ref.update(updates);
  // }

  removeData(path) {
    const ref = this.db.ref(path);
    ref.remove();
  }
}

export default new FirebaseService();
