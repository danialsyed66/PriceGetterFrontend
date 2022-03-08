import axios from 'axios';

export default axios.create({
  // withCredentials: true,
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://price-getter-backend.herokuapp.com',
});
