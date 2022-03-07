import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Home.css';
import Product from './Product';
import Loader from '../components/loader/Loader';
import { Navbar } from '../components';
import { Category, Footer, Header } from '../containers';
import { getProducts } from '../redux/actions/productActions';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange /*,setPriceRange*/] = useState([1, 1000]);
  // const [sliderRange, setSliderRange] = useState([1, 1000]);
  const [category /*,setCategory*/] = useState();
  const [rating /*,setRating*/] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { keyword } = useParams();
  const observer = useRef();
  const dispatch = useDispatch();

  const { products, loading, totalProducts } = useSelector(
    state => state.products
  );

  const { home, loading: load } = useSelector(state => state.home);

  const length = products.length;
  // const { currentProduct } = useSelector(state => state.productDetails);

  useEffect(() => {
    if (length >= totalProducts) setHasMore(false);
  }, [length, totalProducts]);

  useEffect(() => {
    dispatch(getProducts(currentPage, keyword, priceRange, category, rating));
  }, [dispatch, currentPage, keyword, priceRange, category, rating]);

  // useEffect(() => {
  //   if (!currentProduct) return;

  //   document
  //     .querySelector(`[data-id='${currentProduct}']`)
  //     .scrollIntoView({ behavior: 'smooth' });
  // }, [currentProduct]);

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
        <Header />
        <Category />
      </div>
      <section id="products" className="container mt-5">
        <div className="row mt-4">
          {home?.categories ? (
            <>
              {' '}
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Escape the real world with a book</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  <Product col={10} product={home?.categories?.books[0]} />
                  <Product col={10} product={home?.categories?.books[1]} />
                  <Product col={10} product={home?.categories?.books[2]} />
                  <Product col={10} product={home?.categories?.books[3]} />
                  <Product col={10} product={home?.categories?.books[4]} />
                  <Product col={10} product={home?.categories?.books[5]} />
                  <Product col={10} product={home?.categories?.books[6]} />
                  <Product col={10} product={home?.categories?.books[7]} />
                  <Product col={10} product={home?.categories?.books[8]} />
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">food and refreshments </h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.food.map((prod, i) => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Clothes And Wears</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.clothes.map((prod, i) => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Cameras and lens</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.cameras.map((prod, i) => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">New Laptops</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.laptops.map((prod, i) => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Phone offers </h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.smartPhones.map((prod, i) => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Dive into sports</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.sports.map((prod, i) => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
            </>
          ) : (
            <div />
          )}

          {/* <div className="col-md-12 ml-4">
            <h1 id="products_heading">food</h1>
          </div>
          <div className="col-md-12">
            <Carousals home={home?.categories?.food} />
          </div> */}
          <div className="col-md-12 ml-4">
            <h1 id="products_heading">Find the best deals in the Pk here</h1>
          </div>

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

export default Home;
