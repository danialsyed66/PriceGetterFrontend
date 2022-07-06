import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import x from '../../../assets/x.svg';
import fire from '../../../utils/swal';
import styles from './modal.module.css';

const Refundmodel = ({ modalStyle, show, onClose, backdropStyle, id }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const modalRef = useRef(null);

  const handleSubmit = () => {
    if (!message || message === '') return fire('Message is required.');

    onClose();

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

export default Refundmodel;
