import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import homeReducer from './homeReducer';

export default combineReducers({
  products: productsReducer,
  productDetails: productReducer,
  auth: authReducer,
  user: userReducer,
  home: homeReducer,
});
