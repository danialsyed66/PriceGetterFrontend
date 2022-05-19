import { SET_FILTERS, UPDATE_FILTERS } from '../consts';

export const setFilters = (filters) => (dispatch) => {
  dispatch({
    type: SET_FILTERS,
    payload: filters,
  });
};

export const updateFilters = (filters) => (dispatch, getState) => {
  const { filters: prevFilters } = getState();

  // query,
  // page: currentPage,
  // price: priceRange,
  // leastRating: rating,
  // sellers: seller,
  // categories: category,

  // const { options: prevOptions } = prevProducts;

  let newReq = false;

  if (filters.page === 1) newReq = true;
  if (prevFilters?.query !== filters?.query) newReq = true;
  if (prevFilters?.leastRating !== filters?.leastRating) newReq = true;
  if (prevFilters?.price[0] !== filters?.price[0]) newReq = true;
  if (prevFilters?.price[1] !== filters?.price[1]) newReq = true;
  // if (!arraysEqual(prevFilters?.sellers, filters?.sellers)) newReq = true;
  // if (!arraysEqual(prevFilters?.categories, filters?.categories)) newReq = true;
  // if (!arraysEqual(prevFilters?.sort, filters?.sort)) newReq = true;

  if (newReq) filters.page = 1;

  console.log({ ...filters, newReq });
  dispatch({
    type: UPDATE_FILTERS,
    payload: { ...filters, newReq },
  });
};
