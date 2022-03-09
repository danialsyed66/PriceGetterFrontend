import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from 'react-router-dom';

import './Home.css';
import { Product } from '../products';
import { Category, Footer, Navbar, Loader } from '../layouts';
import { getProducts } from '../../redux/actions/productActions';

const Filter = () => {
  const [queryParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange /*,setPriceRange*/] = useState([1, 1000]);
  // const [sliderRange, setSliderRange] = useState([1, 1000]);
  // const [category /*,setCategory*/] = useState();
  const [rating /*,setRating*/] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [category /* , setCategory */] = useState(queryParams.get('cat'));
  const [query, setQuery] = useState(queryParams.get('q'));

  const observer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, totalProducts } = useSelector(
    state => state.products
  );
  const length = products.length;
  // const { currentProduct } = useSelector(state => state.productDetails);

  const [queryObject, setQueryObject] = useState({});

  useEffect(() => {
    queryParams.set('q', query);
    const obj = {};
    [...queryParams.keys()].forEach(element => {
      obj[element] = queryParams.get(element);
    });

    setQueryObject(obj);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    navigate({
      path: '/filter',
      search: `?${createSearchParams(queryObject)}`,
    });
  }, [navigate, queryObject]);

  useEffect(() => {
    dispatch(getProducts(currentPage, query, priceRange, category, rating));
  }, [dispatch, currentPage, query, priceRange, category, rating]);

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
        <Navbar setQuery={setQuery} />
        <Category />
      </div>
      <section id="products" className="container mt-5">
        <h1 id="products_heading">Find the best deals in the Pakistan here</h1>
        <div className="row mt-4">
          {length ? (
            <>
              {products.map((prod, i) => (
                <Product
                  col={3}
                  key={prod._id}
                  product={prod}
                  callbackRef={i === length - 10 ? observerCallBack : null}
                />
              ))}
              {!loading || <Loader />}
            </>
          ) : (
            <>{!loading || <Loader />}</>
          )}
        </div>
      </section>
      <div className="d-flex justify-content-center mt-6 align-content-center"></div>
      <Footer />
    </div>
  );
};

export default Filter;
