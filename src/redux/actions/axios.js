import axios from 'axios';

import { SERVER_URI } from '../consts';

export default axios.create({
  baseURL: SERVER_URI,
  headers: {
    token: localStorage.getItem('token'),
  },
});
