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
import { Product } from '../products';
import { Footer, Navbar, Loader, CATEGORIES, SELLERS } from '../layouts';
import { getProducts } from '../../redux/actions/productActions';
import { updateFilters } from '../../redux/actions/filterActions';

const Filter = () => {
  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const { page, price, leastRating, query, sellers, categories, newReq } =
    useSelector(state => state.filters);

  const [currentPage, setCurrentPage] = useState(page);
  const [priceRange, setPriceRange] = React.useState(price);
  const [rating /*,setRating*/] = useState(leastRating);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState(categories);
  const [seller, setSeller] = useState(sellers);
  const [sort /* , setSort */] = useState();
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
    dispatch(
      updateFilters({
        query,
        page: currentPage,
        price: priceRange,
        leastRating: rating,
        sellers: seller,
        categories: category,
        newReq: true,
      })
    );
  }, [
    dispatch,
    currentPage,
    query,
    priceRange,
    category,
    rating,
    seller,
    sort,
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
      })
    );
  }, [dispatch, page, query, price, leastRating, sellers, categories]);

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
      <div>
        <Navbar />
      </div>
      <section id="products" className="container-fluid mt-5">
        <div className="row mt-4">
          <div className="col-md-2">
            <h4 style={{ fontWeight: 'bold' }}>Filters</h4>
            <div className="mb-3 pl-3">
              <p style={{ margin: '0', fontWeight: 'bold' }}>Price</p>
              <Slider
                color="secondary"
                sx={{ width: '200px' }}
                value={priceRange}
                onChange={handleChange}
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
                />
                <FormControlLabel
                  value={[0, 5000]}
                  control={<Radio color="secondary" />}
                  label="Upto Rs. 5000"
                />
                <FormControlLabel
                  value={[10000, 50000]}
                  control={<Radio color="secondary" />}
                  label="Rs. 10,000 - Rs. 50,000"
                />
                <FormControlLabel
                  value={[50000, 100000]}
                  control={<Radio color="secondary" />}
                  label="Rs. 50,000 - Rs. 100,000"
                />
                <FormControlLabel
                  value={[100000]}
                  control={<Radio color="secondary" />}
                  label={`Atleast Rs. 100,000`}
                />
              </RadioGroup>
            </FormControl>
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
          </div>
          <div className="col-md-10">
            <h1 id="products_heading">Search Related Products</h1>
            <div className="row">
              {length ? (
                <>
                  {(!loading || !newReq) &&
                    products.map((prod, i) => (
                      <Product
                        col={3}
                        key={prod._id}
                        product={prod}
                        callbackRef={
                          i === length - 10 ? observerCallBack : null
                        }
                      />
                    ))}
                  {!loading || <Loader />}
                </>
              ) : (
                <>{!loading || <Loader />}</>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center mt-6 align-content-center"></div>
      <Footer />
    </div>
  );
};

export default Filter;
