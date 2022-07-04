import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import 'react-multi-carousel/lib/styles.css';

import './Detailpage.css';
import '../Home.css';

import ListReviews from './ListReviews';
import Product from '../Product';
import { Navbar, Footer, Loader, MetaData } from '../../layouts';
import fire from './../../../utils/swal';
import { addToCart } from './../../../redux/actions/cartActions';
import { setFilters } from '../../../redux/actions/filterActions';
import {
  getProductDetails,
  newReview,
} from '../../../redux/actions/productActions';
import { NEW_REVIEW_RESET } from './../../../redux/consts';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sellectedImage, setSellectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');

  const { loading, product, similar, same } = useSelector(
    state => state.productDetails
  );

  const { isAuth } = useSelector(state => state.auth);
  const { success: reviewSuccess, message: reviewMessage } = useSelector(
    state => state.review
  );

  const isImage = url =>
    /http(|s):(.*?).(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

  const {
    _id,
    name,
    price,
    description,
    rating,
    images,
    category,
    // seller,
    shippingCost,
    stock,
    noOfReviews,
    // category,
    reviews,
    // createdAt,
    discount,
    pricegetter,
  } = product;

  const decreaseQuantity = () => {
    if (quantity === 1) return;

    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity >= stock) return;

    setQuantity(quantity + 1);
  };

  const handleAddCart = () => {
    if (stock < 1) return;

    dispatch(addToCart({ ...product, quantity }));

    fire('Product added to cart!', 'success');
  };

  const setUserReview = () => {
    const stars = document.querySelectorAll('.star');

    stars?.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(event => {
        star.addEventListener(event, showRatings);
      });
    });

    function showRatings(e) {
      stars?.forEach((star, index) => {
        if (e.type === 'click')
          if (index < this.starValue) {
            star.classList.add('orange');
            setUserRating(this.starValue);
          } else star.classList.remove('orange');

        if (e.type === 'mouseover')
          if (index < this.starValue) star.classList.add('yellow');
          else star.classList.remove('yellow');

        if (e.type === 'mouseout') star.classList.remove('yellow');
      });
    }
  };

  const submitHandler = e => {
    newReview(_id, {
      review: comment,
      rating: userRating,
    });
  };

  const handleNavigate = category => {
    dispatch(setFilters({ categories: [category] }));

    navigate('/filter?nav=true');
  };

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

  useEffect(() => {
    if (images) {
      if (isImage(images?.[0]?.url)) {
        if (images?.length) setSellectedImage(images?.[0]?.url);
      }
      if (isImage(images?.[1]?.url)) {
        if (images?.length) setSellectedImage(images?.[1]?.url);
      }
    }
  }, [images]);

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (!reviewSuccess) return;

    fire(reviewSuccess, 'success');

    dispatch({ type: NEW_REVIEW_RESET });
  }, [dispatch, id, reviewSuccess, reviewMessage]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <MetaData title="Product Details" />

      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="p-2 m-5">
            <Breadcrumbs
              aria-label="breadcrumb"
              style={{ backgroundColor: 'white' }}
            >
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>
              <div
                underline="hover"
                color="inherit"
                className="pointer underline"
                onClick={() => handleNavigate(category?.search)}
              >
                {category?.search}
              </div>
            </Breadcrumbs>
            <div className="row">
              <div className="col-md-1 offset-md-2">
                <div className="boxs-img " style={{ cursor: 'pointer' }}>
                  {images?.map(image => {
                    if (isImage(image?.url)) {
                      return (
                        <div
                          className="small_pic p-2 my-2"
                          onClick={() => setSellectedImage(image?.url)}
                          key={image?.url}
                        >
                          <img src={image?.url} alt="" />
                        </div>
                      );
                    }
                    return <></>;
                  })}
                </div>
              </div>

              <div
                className="col-md-4 d-flex justify-content-center align-items-center"
                style={{ height: '400px' }}
              >
                <div className=" d-flex flex-column justify-content-center align-items-center w-100">
                  <img
                    className="w-75"
                    style={{ maxHeight: '350px' }}
                    src={sellectedImage}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-5 heaing_detail">
                <h2>{name}</h2>
                {discount && (
                  <p className="discount_bar p-1">{Math.floor(discount)}%</p>
                )}
                <hr />
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">
                  ({noOfReviews} {noOfReviews === 1 ? 'Review' : 'Reviews'})
                </span>
                <hr />
                <p id="product_price">{`RS.${price}`}</p>
                <hr />
                {!pricegetter ? (
                  <>
                    Go To Site:
                    <img
                      style={{ width: '80px', cursor: 'pointer' }}
                      className="ml-3"
                      alt="seller pic"
                      src={product?.seller?.logo?.url}
                      onClick={() => {
                        const newWindow = window.open(product.url, '_blank');
                        if (newWindow) newWindow.opener = null;
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="stockCounter d-flex">
                      <button
                        className="btn btn-danger minus"
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={quantity}
                        readOnly
                      />

                      <button
                        className="btn btn-primary plus"
                        onClick={increaseQuantity}
                        disabled={quantity >= stock}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      id="cart_btn"
                      className="btn btn-primary d-inline  mt-3"
                      onClick={handleAddCart}
                      disabled={stock < 1}
                    >
                      Add to Cart
                    </button>
                  </>
                )}
                <hr />
                {pricegetter && (
                  <>
                    {isAuth ? (
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      // review button
                      <button
                        id="review_btn"
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#ratingModal"
                        onClick={setUserReview}
                      >
                        Submit Your Review
                      </button>
                    ) : (
                      <div className="alert alert-danger" type="danger">
                        Login to post your review.
                      </div>
                    )}
                    <hr />
                  </>
                )}
                <p>
                  Status:
                  <span id="stock_status">
                    {stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
                <hr />
                <p>
                  Delivery:
                  <span id="stock_status">
                    {shippingCost > 0 ? 'Paid' : 'Free'}
                  </span>
                </p>
                <hr />
                <h4>Product Description</h4>
                <p className="p_detail">
                  {description?.split(',').map((val, i) => {
                    return <span kay={i}>{val}</span>;
                  })}{' '}
                </p>
              </div>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  {
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                    // review modal
                  }
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              {' '}
                              <i className="fa fa-star"></i>{' '}
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={submitHandler}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mb-5">
            <div className="row">
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Same Product on Various Sites</h1>
              </div>
              <div className="col-md-12">
                {same?.same?.length > 0 ? (
                  <>
                    {same?.same?.map(
                      ({
                        images,
                        name,
                        price,
                        _id: productId,
                        category,
                        seller,
                        url,
                      }) => (
                        <div
                          key={_id}
                          className="row d-flex justify-content-center"
                        >
                          <div className="col-8">
                            <hr />
                            <div className="cart-item">
                              <div className="row">
                                <div className="col-4 col-lg-2">
                                  <img
                                    src={images?.[0].url}
                                    alt={category?.search}
                                    height="90"
                                    width="115"
                                  />
                                </div>

                                <div className="col-5 col-lg-4">
                                  <Link to={`/product/${productId}`}>
                                    {name}
                                  </Link>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                  <p id="card_item_price">Rs. {price}</p>
                                </div>

                                <div className="col-4 col-lg-1 mt-4 mt-lg-0 pt-4 pl-5 ml-5">
                                  <img
                                    style={{ width: '60px', cursor: 'pointer' }}
                                    alt="seller pic"
                                    src={seller?.logo?.url}
                                    onClick={() => {
                                      const newWindow = window.open(
                                        url,
                                        '_blank'
                                      );
                                      if (newWindow) newWindow.opener = null;
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <hr />
                          </div>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <div key={_id} className="row d-flex justify-content-center">
                    <div className="col-8">
                      <hr />
                      <h2 className="no-products m-5 p-3">
                        This product is not on other sites.
                      </h2>
                      <hr />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container mb-5">
            <div className="row">
              <div className="col-md-12 ml-4">
                <h1 id="products_heading">Related Products</h1>
              </div>
              <div className="col-md-12">
                <Carousel responsive={responsive}>
                  {similar?.similar?.map(prod => (
                    <Product col={10} key={prod._id} product={prod} />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          {reviews?.length > 0 && (
            <ListReviews reviews={reviews} productId={_id} />
          )}
        </>
      )}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default DetailPage;
