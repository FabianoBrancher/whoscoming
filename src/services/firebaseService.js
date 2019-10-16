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

  updateListData(path, data) {
    const updates = {};
    const parentKey = this.db.ref().push().key;
    data.forEach((element, index) => {
      const { key } = this.db.ref().push();
      if (index === 0) {
        updates[parentKey] = { ...element, parent: parentKey };
      } else {
        updates[key] = { ...element, parent: parentKey };
      }
    });

    const ref = this.db.ref().child(path);
    ref.update(updates);
  }

  removeData(path) {
    const ref = this.db.ref(path);
    ref.remove();
  }
}

export default new FirebaseService();
