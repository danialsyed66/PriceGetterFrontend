import axios from 'axios';

import { SERVER_URI } from '../redux/consts';

const axiosInstance = axios.create({
  baseURL: SERVER_URI,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  if (!token) return config;

  config.headers['token'] = token;

  return config;
});

export default axiosInstance;
