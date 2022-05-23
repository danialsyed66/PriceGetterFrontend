import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from '@mui/material';

import './Home.css';
import { Product } from '.';
import { Navbar, Loader, CATEGORIES, SELLERS, MetaData } from '../layouts';
import { getProducts } from '../../redux/actions/productActions';
import { updateFilters } from '../../redux/actions/filterActions';

const Filter = () => {
  const {
    onSale,
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
  const [currentPage, setCurrentPage] = useState(page);
  const [priceRange, setPriceRange] = useState(price);
  const [rating /*,setRating*/] = useState(leastRating);
  const [seller, setSeller] = useState(sellers);
  const [category, setCategory] = useState(categories);
  const [sortObj, setSortObj] = useState({ val: sort[0], order: sort[1] });

  const [priceRadio, setPriceRadio] = useState(0);
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

  const handleSliderChange = (e, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceRadioChange = (e, radioIndex) => {
    setPriceRadio(radioIndex);
    setPriceRange(e.target.value.split(','));
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

    setCategory(pushOrPullFromArray(category, CATEGORIES[pos].val));
  };

  const sellerCheckBoxHandler = pos => {
    setSellerCheckBox(
      sellerCheckBox.map((item, i) => (i === pos ? !item : item))
    );

    setSeller(pushOrPullFromArray(seller, SELLERS[pos].val));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let sortArr = [];
      if (sortObj.val?.length && sortObj.order?.length)
        sortArr = [sortObj.val, sortObj.order];

      dispatch(
        updateFilters({
          query,
          page: currentPage,
          price: priceRange,
          leastRating: rating,
          sellers: seller,
          categories: category,
          sort: sortArr,
        })
      );

      // TODO Scroll to top
      /* 









       */
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    dispatch,
    currentPage,
    query,
    priceRange,
    category,
    rating,
    seller,
    sortObj,
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
      })
    );
  }, [dispatch, page, query, price, leastRating, sellers, categories, sort]);

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

      <Navbar />
      <section id="products" className="container-fluid mt-5">
        <div className="row mt-4">
          <aside className="col-md-2 sidebar">
            <h4 style={{ fontWeight: 'bold' }}>Filters</h4>
            <div className="radio-toolbar">
              <input
                type="radio"
                id="radioApple"
                name="radioFruit"
                value="apple"
                onClick={() => {
                  setSale(!sale);
                }}
                checked={sale}
              />
              <label htmlFor="radioApple">Sale</label>
            </div>
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

            <div className="d-flex mb-2">
              <p style={{ margin: '0', fontWeight: 'bold' }}>Categorys</p>
            </div>
            {CATEGORIES.map(({ val }, i) => (
              <div className="d-flex mb-2" key={val}>
                <Checkbox
                  aria-label="checks"
                  color="secondary"
                  className="p-0"
                  name={val}
                  value={val}
                  checked={categoriesCheckBox[i]}
                  onChange={() => categoriesCheckBoxHandler(i)}
                />
                <p style={{ margin: '0' }}>{val}</p>
              </div>
            ))}
            <hr />

            <div className="d-flex mb-2">
              <p style={{ margin: '0', fontWeight: 'bold' }}>From Sites</p>
            </div>
            {SELLERS.map(({ val, text }, i) => (
              <div className="d-flex mb-2" key={val}>
                <Checkbox
                  aria-label="checks"
                  color="secondary"
                  className="p-0"
                  name={text}
                  value={val}
                  checked={sellerCheckBox[i]}
                  onChange={() => sellerCheckBoxHandler(i)}
                />
                <p style={{ margin: '0' }}>{text}</p>
              </div>
            ))}
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
                aria-labelledby="demo-radio-buttons-group-label2"
                defaultValue="female"
                name="radio-buttons-group2"
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
              </RadioGroup>
            </FormControl>
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
      </section>
    </div>
  );
};

export default Filter;
