import axios from 'axios';

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const getProducts =
  (currentPage = 1, keyword, priceRange, category, rating) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ALL_PRODUCTS_REQUEST,
      });

      const link = `https://price-getter-backend.herokuapp.com/api/v1/products?page=${currentPage}
      &price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}
      &rating[gte]=${rating}
      ${keyword ? `&keyword=${keyword}` : ''}
      ${category ? `&category=${category}` : ''}`;

      const {
        data: { data },
      } = await axios.get(link);

      const { products: prevProducts } = getState();

      const { options: prevOptions } = prevProducts;

      let newReq = false;

      if (prevOptions) {
        if (prevOptions.keyword !== keyword) newReq = true;
        if (prevOptions.category !== category) newReq = true;
        if (prevOptions.rating !== rating) newReq = true;
        if (prevOptions.priceRange[0] !== priceRange[0]) newReq = true;
        if (prevOptions.priceRange[1] !== priceRange[1]) newReq = true;
      }

      if (
        !(prevProducts.length + data.data.length === data.numOfDocs) &&
        !data.data.length
      )
        return dispatch({
          type: ALL_PRODUCTS_FAIL,
          payload: {
            error: 'There are no products by this name',
          },
        });

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: {
          products: data.data,
          totalProducts: data.numOfDocs,
          resPerPage: data.resPerPage,
          options: {
            currentPage,
            keyword,
            priceRange,
            category,
            rating,
            newReq,
          },
        },
      });
    } catch (err) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: {
          error: err?.response?.data?.message || 'Could not get all products',
        },
      });
    }
  };

export const getProductDetails = id => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const {
      data: {
        data: { data },
      },
    } = await axios.get(
      `https://price-getter-backend.herokuapp.com/api/v1/products/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: { product: data },
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: {
        error: err?.response?.data?.message || 'Could not get the product',
      },
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
