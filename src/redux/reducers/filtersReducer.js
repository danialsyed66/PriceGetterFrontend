import { SET_FILTERS, UPDATE_FILTERS } from '../consts';

const reducer = (
  state = {
    page: 1,
    price: [0, 500000],
    leastRating: 0,
    sellers: [],
    categories: [],
  },
  { type, payload }
) => {
  switch (type) {
    case SET_FILTERS:
      return {
        page: 1,
        price: [0, 500000],
        leastRating: 0,
        sellers: [],
        categories: [],
        ...payload,
      };

    case UPDATE_FILTERS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default reducer;
