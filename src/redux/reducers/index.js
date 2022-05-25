import { combineReducers } from "redux";

import productsReducer from "./productsReducer";
import productReducer, { newProductReducer } from "./productReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import cartReducer from "./cartReducer";
import orderReducer, {
  myOrdersReducer,
  orderDetailsReducer,
} from "./orderReducer";
import reviewReducer from "./reviewReducer";
import homeReducer from "./homeReducer";
import filtersReducer from "./filtersReducer";
import forumsReducer from "./forumsReducer";

export default combineReducers({
  newProduct: newProductReducer,
  products: productsReducer,
  productDetails: productReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  review: reviewReducer,
  home: homeReducer,
  filters: filtersReducer,
  forums: forumsReducer,
});
