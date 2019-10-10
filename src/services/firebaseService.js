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
}

export default new FirebaseService();
