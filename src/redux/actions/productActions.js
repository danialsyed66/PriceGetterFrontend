import axios from '../../utils/axios';

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const getProducts = (filters) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });

    const {
      page: currentPage,
      query: keyword,
      price: priceRange,
      leastRating: rating,
      sellers,
      categories,
      sort,
    } = filters;

    const seller = sellers.join(',');
    const category = categories.join(',');

    const link = `/api/v1/products?page=${currentPage}
      &price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}
      &rating[gte]=${rating}
      ${keyword ? `&keyword=${keyword}` : ''}
      ${category.length ? `&category=${category}` : ''}
      ${sort ? `&sort=${sort}` : ''}
      ${seller.length ? `&seller=${seller}` : ''}`;

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
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: {
        error: error?.response?.data?.message || 'Could not get all products',
      },
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const {
      data: {
        data: { data },
      },
    } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: { product: data },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: {
        error: error?.response?.data?.message || 'Could not get the product',
      },
    });
  }
};

export const newReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const { data } = await axios.patch(`/api/v1/products/review`, {
      productId,
      review,
    });

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: {
        success: data.status === 'success' ? true : false,
        message: data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: {
        error: error?.response?.data?.message || 'Could not get the product',
      },
    });
  }
};

export const deleteReview = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });

    const { data } = await axios.patch(`/api/v1/products/review/delete`, {
      productId,
      reviewId,
    });

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: {
        success: data.status === 'success' ? true : false,
        message: data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: {
        error: error?.response?.data?.message || 'Could not get the product',
      },
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
