import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://price-getter-backend.herokuapp.com',
  headers: {
    token: localStorage.getItem('token'),
  },
});
