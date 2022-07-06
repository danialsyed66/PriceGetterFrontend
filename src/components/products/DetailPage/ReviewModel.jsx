import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import x from '../../../assets/x.svg';
import { newReview } from '../../../redux/actions/productActions';
import fire from '../../../utils/swal';
import styles from './modal.module.css';

const ReviewModel = ({ modalStyle, show, onClose, backdropStyle, id }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
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
            setRating(this.starValue);
          } else star.classList.remove('orange');

        if (e.type === 'mouseover')
          if (index < this.starValue) star.classList.add('yellow');
          else star.classList.remove('yellow');

        if (e.type === 'mouseout') star.classList.remove('yellow');
      });
    }
  }, []);

  const handleSubmit = () => {
    if (!message || message === '') return fire('Message is required.');
    if (rating === 0) return fire('Please sellect a rating.');

    onClose();

    dispatch(
      newReview(id, {
        review: message,
        rating: rating,
      })
    );

    setMessage('');
    setMessage('');
  };

  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);
  return (
    <React.Fragment>
      <div
        ref={modalRef}
        style={backdropStyle}
        className={`${styles.modal__wrap}`}
        onClick={e => {
          onClose();

          e.stopPropagation();
        }}
      >
        <div
          style={modalStyle}
          className={styles.modal}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="p-3">
            <img
              onClick={() => {
                onClose();
              }}
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              src={x}
              alt=""
            />
            <ul className="stars">
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
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
            </ul>
            <div className="p-2">
              <h3>Your Review</h3>
              <textarea
                className="form-control mt-4"
                id="exampleFormControlTextarea1"
                rows="5"
                value={message}
                onChange={e => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex">
              <button className="btn btn-primary m-auto" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReviewModel;
