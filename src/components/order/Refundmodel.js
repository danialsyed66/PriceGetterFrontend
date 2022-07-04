import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import styles from './modal.module.css';
import x from '../../assets/x.svg';

const Refundmodel = ({ modalStyle, show, onClose, backdropStyle, id }) => {
  const [message, setMessage] = useState('');
  const modalRef = useRef(null);
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
          e.stopPropagation();
        }}
      >
        <div style={modalStyle} className={styles.modal}>
          <div className="p-3">
            <img
              onClick={() => {
                onClose();
              }}
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              src={x}
              alt=""
            />

            <div className="p-2">
              <h3>State your reason for Refund</h3>
              <textarea
                className="form-control mt-4"
                id="exampleFormControlTextarea1"
                rows="5"
              ></textarea>
            </div>
            <div className="d-flex">
              <button className="btn btn-primary m-auto">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Refundmodel;
