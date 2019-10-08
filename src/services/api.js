import axios from 'axios';

const api = axios.create({
  baseURL: 'https://whoscoming-app.firebaseio.com/'
});

export default api;
