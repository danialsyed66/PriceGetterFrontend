import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import './Detailpage.css';

import ListReviews from './ListReviews';
import {
  getProductDetails,
  newReview,
} from '../../../redux/actions/productActions';
import { addToCart } from './../../../redux/actions/cartActions';
import { NEW_REVIEW_RESET } from './../../../redux/consts';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [sellectedImage, setSellectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');

  const { /* loading, */ product } = useSelector(
    (state) => state.productDetails
  );
  const { isAuth } = useSelector((state) => state.auth);
  const { success: reviewSuccess, message: reviewMessage } = useSelector(
    (state) => state.review
  );

  const {
    _id,
    name,
    price,
    description,
    rating,
    images,
    // seller,
    stock,
    noOfReviews,
    // category,
    reviews,
    // createdAt,
    discount,
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

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart',
      showConfirmButton: true,
      timer: 2000,
    });
  };

  const setUserReview = () => {
    const stars = document.querySelectorAll('.star');

    stars?.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach((event) => {
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

  const submitHandler = (e) => {
    newReview(_id, {
      review: comment,
      rating: userRating,
    });
  };

  useEffect(() => {
    if (images?.length) setSellectedImage(images[0]?.url);
  }, [images]);

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (!reviewSuccess) return;

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: reviewMessage,
      showConfirmButton: true,
      timer: 2000,
    });

    dispatch({ type: NEW_REVIEW_RESET });
  }, [dispatch, id, reviewSuccess, reviewMessage]);

  return (
    <>
      <div className="p-2">
        <div className="row">
          <div className="col-md-1 offset-md-2">
            <div className="boxs-img">
              {images?.map((image) => (
                <div
                  className="small_pic p-2 my-2"
                  onClick={() => setSellectedImage(image?.url)}
                  key={image?.url}
                >
                  <img src={image?.url} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div className=" d-flex flex-column justify-content-center align-items-center w-100">
              <p className="discount_bar p-1">{discount}</p>

              <img className="w-75" src={sellectedImage} alt="" />
            </div>
          </div>
          <div className="col-md-5 heaing_detail">
            <h2>{name}</h2>
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
            <p id="product_price">{`$${price}`}</p>
            <div className="stockCounter d-inline">
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
              className="btn btn-primary d-inline ml-4"
              onClick={handleAddCart}
              disabled={stock < 1}
            >
              Add to Cart
            </button>
            <hr />
            <p>
              Status:{' '}
              <span id="stock_status">
                {stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
            <hr />
            <p className="p_detail">{description}</p>
          </div>

          {isAuth ? (
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
              onClick={setUserReview}
            >
              Submit Your Review
            </button>
          ) : (
            <div className="alert alert-danger mt-5" type="danger">
              Login to post your review.
            </div>
          )}
          <div className="row mt-2 mb-5">
            <div className="rating w-50">
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
                        onChange={(e) => setComment(e.target.value)}
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
      {reviews?.length && <ListReviews reviews={reviews} productId={_id} />}
    </>
  );
};

export default DetailPage;
