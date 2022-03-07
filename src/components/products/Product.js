import React, { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Home.css';
import { handleFavourite as handleFavouriteAction } from '../../redux/actions/userActions';
import { loadUser } from '../../redux/actions/authActions';
import { HANDLE_FAVOURITE_RESET } from '../../redux/consts';

const Product = ({ product, col, callbackRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUpdated } = useSelector(state => state.user);
  const { user } = useSelector(state => state.auth);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (!isUpdated) return;
    dispatch(loadUser());

    dispatch({ type: HANDLE_FAVOURITE_RESET });
  }, [dispatch, isUpdated]);

  useEffect(() => {
    // if (!user || !product) return;
    const favourites = user?.favourites?.map(favourite => favourite.product);

    setIsFavourite(favourites?.includes(product?._id));
  }, [user, product]);

  const handleFavourite = (e, id) => {
    if (!user) navigate('/login');

    dispatch(handleFavouriteAction(id));
  };

  return (
    <div
      className={`col-sm-10 col-md-6 col-lg-${col}`}
      style={{ borderRadius: '20px' }}
      ref={callbackRef}
      key={product._id}
      data-id={product._id}
    >
      <div className="product_box m-3 zoom-box">
        <div className="py-3 px-1">
          <div className="d-flex flex-column justify-content-center align-content-center pl-2">
            <div className="d-flex justify-content-between align-items-center">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite color="red" />}
                className="zoom-box"
                onClick={e => handleFavourite(e, product._id)}
                checked={isFavourite}
              />
              {product?.seller?.logo?.url ? (
                <img
                  style={{ width: '60px' }}
                  alt="product pic"
                  src={product?.seller?.logo?.url}
                />
              ) : (
                ''
              )}
            </div>

            <img
              style={{ borderRadius: '20px' }}
              className="m-auto card-img-top"
              alt="product pic"
              src={product.images[0]?.url}
            />
          </div>
          <div
            className="card-body d-flex flex-column pl-3"
            style={{
              padding: 'auto',
              marginTop: '20px',
              borderRadius: '20px ',
            }}
          >
            <h5 className="card-title">
              {product.name.replace(/^(.{15}[^\s]*).*/, '$1')}{' '}
            </h5>

            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.rating / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">{product.noOfReviews}</span>
            </div>
            <p className="card-text">Rs. {product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
