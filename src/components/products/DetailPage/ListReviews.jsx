import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteReview } from '../../../redux/actions/productActions';

const ListReviews = ({ reviews, productId }) => {
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector(state => state.auth);

  const handleDelete = review => {
    dispatch(deleteReview(productId, review._id));
  };

  return (
    <div className="reviews m-auto w-75">
      <h3>User's Reviews:</h3>
      <hr />
      {reviews?.map(review => (
        <div className="review-card my-3" key={review._id}>
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(review.rating / 5) * 100}%` }}
            ></div>
          </div>
          <p className="review_comment">{review.review}</p>
          {isAuth && user._id === review.user && (
            <button
              type="button"
              className="btn btn-danger d-inline ml-4"
              onClick={() => handleDelete(review)}
            >
              Delete
            </button>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
