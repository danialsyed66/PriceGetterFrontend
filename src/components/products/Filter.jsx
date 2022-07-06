import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  useScrollTrigger,
  Zoom,
} from '@mui/material';

import './Home.css';
import uparrow from '../../assets/arrow-up-short.svg';

import { Product } from '.';
import { Navbar, Loader, CATEGORIES, SELLERS, MetaData } from '../layouts';
import { getProducts } from '../../redux/actions/productActions';
import { setFilters, updateFilters } from '../../redux/actions/filterActions';

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Filter = props => {
  const {
    onSale,
    discount,
    page,
    price,
    leastRating,
    sellers,
    categories,
    sort,
    query,
    newReq,
  } = useSelector(state => state.filters);

  const [hasMore, setHasMore] = useState(true);

  const [sale, setSale] = useState(onSale);
  const [saleRange, setSaleRange] = useState(discount);
  const [currentPage, setCurrentPage] = useState(page);
  const [priceRange, setPriceRange] = useState(price);
  const [rating /*,setRating*/] = useState(leastRating);
  const [seller, setSeller] = useState(sellers);
  const [category, setCategory] = useState(categories);
  const [sortObj, setSortObj] = useState({ val: sort[0], order: sort[1] });

  const [priceRadio, setPriceRadio] = useState(0);
  const [saleRadio, setSaleRadio] = useState(0);
  const [sortRadioOrder, setSortRadioOrder] = useState(sortObj.order || 0);
  const [sortRadioVal, setSortRadioVal] = useState(sortObj.val || 0);
  const [categoriesCheckBox, setCategoriesCheckBox] = useState(
    CATEGORIES.map(({ val }) => category.includes(val))
  );
  const [sellerCheckBox, setSellerCheckBox] = useState(
    SELLERS.map(({ val }) => seller.includes(val))
  );

  const observer = useRef();
  const dispatch = useDispatch();
  const { products, loading, totalProducts } = useSelector(
    state => state.products
  );
  const length = products.length;
  // const { currentProduct } = useSelector(state => state.productDetails);

  const clearFilters = () => {
    dispatch(setFilters());

    setSale(false);
    setSaleRange([]);
    setCurrentPage(1);
    setPriceRange([0, 500000]);
    setSeller([]);
    setCategory([]);
    setSortObj({});
    setPriceRadio(0);
    setSaleRadio(0);
    setSortRadioOrder(0);
    setSortRadioVal(0);
    setCategoriesCheckBox(CATEGORIES.map(({ val }) => false));
    setSellerCheckBox(SELLERS.map(({ val }) => false));
  };

  const handleSliderChange = (e, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceRadioChange = (e, radioIndex) => {
    setPriceRadio(radioIndex);
    setPriceRange(e.target.value.split(','));
  };

  const handleSaleRadioChange = (e, radioIndex) => {
    setSaleRadio(radioIndex);
    setSaleRange(e.target.value.split(','));
  };

  const handleSortRadioOrderChange = e => {
    const { value } = e.target;

    setSortRadioOrder(value);
    setSortObj({ ...sortObj, order: value });
  };

  const handleSortRadioValChange = e => {
    const { value } = e.target;

    setSortRadioVal(value);
    setSortObj({ ...sortObj, val: value });
  };

  const pushOrPullFromArray = (array, val) => {
    const arr = [...array];
    const likeIndex = arr.indexOf(val);

    if (likeIndex >= 0) arr.splice(likeIndex, 1);
    else arr.push(val);

    return arr;
  };

  const categoriesCheckBoxHandler = pos => {
    setCategoriesCheckBox(
      categoriesCheckBox.map((item, i) => (i === pos ? !item : item))
    );

    setCategory(pushOrPullFromArray(category, CATEGORIES?.[pos].val));
  };

  const sellerCheckBoxHandler = pos => {
    setSellerCheckBox(
      sellerCheckBox.map((item, i) => (i === pos ? !item : item))
    );

    setSeller(pushOrPullFromArray(seller, SELLERS?.[pos].val));
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const nav = useRef(useQuery().get('nav'));

  useEffect(() => {
    if (nav.current) {
      nav.current = false;
      return;
    }

    let sortArr = [];
    if (sortObj.val?.length && sortObj.order?.length)
      sortArr = [sortObj.val, sortObj.order];

    if (page !== currentPage) {
      return dispatch(
        updateFilters({
          query,
          page: currentPage,
          price: priceRange,
          leastRating: rating,
          sellers: seller,
          categories: category,
          sort: sortArr,
          onSale: sale,
          discount: saleRange,
        })
      );
    }

    const timer = setTimeout(() => {
      dispatch(
        updateFilters({
          query,
          page: currentPage,
          price: priceRange,
          leastRating: rating,
          sellers: seller,
          categories: category,
          sort: sortArr,
          onSale: sale,
          discount: saleRange,
        })
      );

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    currentPage,
    query,
    priceRange,
    category,
    rating,
    seller,
    sortObj,
    sale,
    saleRange,
  ]);

  useEffect(() => {
    dispatch(
      getProducts({
        page,
        query,
        price,
        leastRating,
        sellers,
        categories,
        sort,
        onSale,
        discount,
      })
    );
  }, [
    dispatch,
    page,
    query,
    price,
    leastRating,
    sellers,
    categories,
    sort,
    onSale,
    discount,
  ]);

  // useEffect(() => {
  //   if (!currentProduct) return;

  //   document
  //     .querySelector(`[data-id='${currentProduct}']`)
  //     .scrollIntoView({ behavior: 'smooth' });
  // }, [currentProduct]);

  useEffect(() => {
    if (length >= totalProducts) setHasMore(false);
  }, [length, totalProducts]);

  const observerCallBack = useCallback(
    node => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setCurrentPage(currentPage => currentPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <MetaData title="Filters Page" />
      <div id="back-to-top-anchor">
        <ElevationScroll {...props}>
          <AppBar>
            <Navbar />
          </AppBar>
        </ElevationScroll>
      </div>
      <section id="products" className="container-fluid mt-5">
        <div className="row mt-4">
          <aside
            className="col-md-2 sidebar mt-5"
            style={{ borderRight: '1px solid grey' }}
          >
            <h4 style={{ fontWeight: 'bold' }}>Filters</h4>
            <div className="radio-toolbar">
              <input
                type="radio"
                id="radioApple"
                value="apple"
                checked={sale}
                onClick={() => setSale(!sale)}
                onChange={() => {}}
              />
              <label style={{ cursor: 'pointer' }} htmlFor="radioApple">
                Sale Filters
              </label>
            </div>
            {sale && (
              <FormControl className="pl-1">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label1"
                  defaultValue="female"
                  name="radio-buttons-group1"
                >
                  <FormControlLabel
                    value={[0, 25]}
                    control={<Radio color="secondary" />}
                    label="Upto 25% Sale"
                    checked={saleRadio === 1}
                    onChange={e => handleSaleRadioChange(e, 1)}
                  />
                  <FormControlLabel
                    value={[25, 50]}
                    control={<Radio color="secondary" />}
                    label="25% - 50% Sale"
                    checked={saleRadio === 2}
                    onChange={e => handleSaleRadioChange(e, 2)}
                  />
                  <FormControlLabel
                    value={[50, 75]}
                    control={<Radio color="secondary" />}
                    label="50% - 75% Sale"
                    checked={saleRadio === 3}
                    onChange={e => handleSaleRadioChange(e, 3)}
                  />
                  <FormControlLabel
                    value={[75, 100]}
                    control={<Radio color="secondary" />}
                    label="More Than 75% Sale"
                    checked={saleRadio === 4}
                    onChange={e => handleSaleRadioChange(e, 4)}
                  />
                </RadioGroup>
              </FormControl>
            )}
            <hr />
            <div className="mb-3 pl-3">
              <p style={{ margin: '0', fontWeight: 'bold' }}>Price</p>
              <Slider
                color="secondary"
                sx={{ width: '200px' }}
                value={priceRange}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                max={500000}
              />
            </div>
            <FormControl className="pl-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={[0, 1000]}
                  control={<Radio color="secondary" />}
                  label="Upto Rs. 1000"
                  checked={priceRadio === 1}
                  onChange={e => handlePriceRadioChange(e, 1)}
                />
                <FormControlLabel
                  value={[0, 5000]}
                  control={<Radio color="secondary" />}
                  label="Upto Rs. 5000"
                  checked={priceRadio === 2}
                  onChange={e => handlePriceRadioChange(e, 2)}
                />
                <FormControlLabel
                  value={[10000, 50000]}
                  control={<Radio color="secondary" />}
                  label="Rs. 10,000 - Rs. 50,000"
                  checked={priceRadio === 3}
                  onChange={e => handlePriceRadioChange(e, 3)}
                />
                <FormControlLabel
                  value={[50000, 100000]}
                  control={<Radio color="secondary" />}
                  label="Rs. 50,000 - Rs. 100,000"
                  checked={priceRadio === 4}
                  onChange={e => handlePriceRadioChange(e, 4)}
                />
                <FormControlLabel
                  value={[100000]}
                  control={<Radio color="secondary" />}
                  label={`Atleast Rs. 100,000`}
                  checked={priceRadio === 5}
                  onChange={e => handlePriceRadioChange(e, 5)}
                />
              </RadioGroup>
            </FormControl>
            <hr />

            <div className="d-flex mb-3">
              <p style={{ margin: '0', fontWeight: 'bold' }}>Categorys</p>
            </div>
            <FormControl>
              {CATEGORIES.map(({ val }, i) => (
                <div className="d-flex mb-2" key={val}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        aria-label="checks"
                        color="secondary"
                        className="p-0 ml-2"
                        name={val}
                        value={val}
                        checked={categoriesCheckBox[i]}
                        onChange={() => categoriesCheckBoxHandler(i)}
                      />
                    }
                    label={val}
                  />
                </div>
              ))}
            </FormControl>
            <hr />

            <div className="d-flex mb-3">
              <p style={{ margin: '0', fontWeight: 'bold' }}>From Sites</p>
            </div>

            <FormControl>
              {SELLERS.map(({ val, text }, i) => (
                <div className="d-flex mb-2" key={val}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        aria-label="checks"
                        color="secondary"
                        className="p-0 ml-2"
                        name={text}
                        value={val}
                        checked={sellerCheckBox[i]}
                        onChange={() => sellerCheckBoxHandler(i)}
                      />
                    }
                    label={text}
                  />
                </div>
              ))}
            </FormControl>
            <hr />

            <div className="d-flex mb-2">
              <p style={{ margin: '0', fontWeight: 'bold' }}>Sort</p>
            </div>
            <FormControl className="pl-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label2"
                defaultValue="female"
                name="radio-buttons-group2"
              >
                <FormControlLabel
                  value={'asd'}
                  control={<Radio color="secondary" />}
                  label="Asd"
                  checked={sortRadioOrder === 'asd'}
                  onChange={e => handleSortRadioOrderChange(e)}
                />
                <FormControlLabel
                  value={'desd'}
                  control={<Radio color="secondary" />}
                  label="Desd"
                  checked={sortRadioOrder === 'desd'}
                  onChange={e => handleSortRadioOrderChange(e)}
                />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl className="pl-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label3"
                defaultValue="female"
                name="radio-buttons-group3"
              >
                <FormControlLabel
                  value={'price'}
                  control={<Radio color="secondary" />}
                  label="By Price"
                  checked={sortRadioVal === 'price'}
                  onChange={e => handleSortRadioValChange(e)}
                />
                <FormControlLabel
                  value={'rating'}
                  control={<Radio color="secondary" />}
                  label="By Rating"
                  checked={sortRadioVal === 'rating'}
                  onChange={e => handleSortRadioValChange(e)}
                />
                <FormControlLabel
                  value={'noOfReviews'}
                  control={<Radio color="secondary" />}
                  label="By Reviews"
                  checked={sortRadioVal === 'noOfReviews'}
                  onChange={e => handleSortRadioValChange(e)}
                />
                {sale && (
                  <FormControlLabel
                    value={'discount'}
                    control={<Radio color="secondary" />}
                    label="By Discount"
                    checked={sortRadioVal === 'discount'}
                    onChange={e => handleSortRadioValChange(e)}
                  />
                )}
              </RadioGroup>
            </FormControl>

            <hr />
            <button className="btn btn-success" onClick={clearFilters}>
              Clear Filters
            </button>
            <hr className="mb-5" />
          </aside>
          <div className="col-md-10">
            <h1 id="products_heading">Search Related Products</h1>
            <div className="row filter_box">
              {length ? (
                <>
                  {newReq && loading ? (
                    <Loader />
                  ) : (
                    <>
                      {products.map((prod, i) => (
                        <Product
                          col={4}
                          key={prod._id}
                          product={prod}
                          callbackRef={
                            i === length - 10 ? observerCallBack : null
                          }
                        />
                      ))}
                      {loading && <Loader />}
                    </>
                  )}
                </>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
        <ScrollTop {...props}>
          <Fab
            color="secondary"
            size="small"
            aria-label="scroll back to top"
            style={{ backgroundColor: 'green' }}
          >
            <img src={uparrow} alt="" />
          </Fab>
        </ScrollTop>
      </section>
    </div>
  );
};

export default Filter;
