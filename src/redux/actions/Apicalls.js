import axios from 'axios';
export const getsproducts = async () =>
  axios.get('https://price-getter-backend.herokuapp.com/api/v1/products/');
export const getDetailProduct = id => axios.get(`/api/product/${id}`);
