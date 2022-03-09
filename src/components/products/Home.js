import React from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import './Home.css';
import Product from './Product';
import { Category, Footer, Navbar, Header } from '../layouts';

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
  const { home } = useSelector(state => state.home);

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
                  {home?.categories?.books.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">food and refreshments </h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.food.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Clothes And Wears</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.clothes.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Cameras and lens</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.cameras.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">New Laptops</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.laptops.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Phone offers </h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.smartPhones.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Dive into sports</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {home?.categories?.sports.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
            </>
          ) : (
            <div />
          )}
        </div>
      </section>
      <div className="d-flex justify-content-center mt-6 align-content-center"></div>
      <Footer />
    </div>
  );
};

export default Home;
