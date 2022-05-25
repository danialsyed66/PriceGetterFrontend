import { SET_FILTERS, UPDATE_FILTERS } from '../consts';

const reducer = (
  state = {
    page: 1,
    price: [0, 500000],
    leastRating: 0,
    onSale: false,
    discount: [],
    sellers: [],
    categories: [],
    sort: [],
  },
  { type, payload }
) => {
  switch (type) {
    case SET_FILTERS:
      const setfilters = {
        page: 1,
        price: [0, 500000],
        leastRating: 0,
        onSale: false,
        discount: [],
        sellers: [],
        categories: [],
        sort: [],
        ...payload,
      };

      return {
        ...setfilters,
        discount: setfilters.onSale ? setfilters.discount : [],
      };

    case UPDATE_FILTERS:
      const updatefilters = {
        ...state,
        ...payload,
      };

      return {
        ...updatefilters,
        discount: updatefilters.onSale ? updatefilters.discount : [],
      };

    default:
      return state;
  }
};

export default reducer;
