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

export const getProducts = filters => async (dispatch, getState) => {
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
      onSale,
      discount,
    } = filters;

    const seller = sellers?.join(',');
    const category = categories?.join(',');
    const sortQuery = sort?.join(',');

    const link = `/api/v1/products?page=${currentPage}
      &rating[gte]=${rating}
      &price[gte]=${priceRange?.[0]}
      ${priceRange?.[1] ? `&price[lte]=${priceRange?.[1]}` : ''}
      ${keyword ? `&keyword=${keyword}` : ''}
      ${onSale ? `&onSale=true` : ''}
      ${discount?.[0] ? `&discount[gte]=${discount?.[0]}` : ''}
      ${discount?.[1] ? `&discount[lte]=${discount?.[1]}` : ''}
      ${category?.length ? `&category=${category}` : ''}
      ${sortQuery?.length ? `&sort=${sortQuery}` : ''}
      ${seller?.length ? `&seller=${seller}` : ''}`;

    const {
      data: { data },
    } = await axios.get(link);

    const { products: prevProducts, filters: options } = getState();

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
        options,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: {
        error: error?.response?.data?.message || 'Could not get all products',
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
        data: { product, similar, same },
      },
    } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: { product, similar, same },
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

export const newReview = (productId, review) => async dispatch => {
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

export const deleteReview = (productId, reviewId) => async dispatch => {
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
