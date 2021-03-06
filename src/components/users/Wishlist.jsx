import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './wishlist.css';
import wish from '../../assets/wishlist.svg';
import heart from '../../assets/hearted.svg';
import PriceGetter from '../../assets/hearted.svg';

import { Footer, Loader, MetaData, Navbar } from '../layouts';
import { loadUser } from '../../redux/actions/authActions';
import {
  getFavourites,
  handleFavourite,
} from '../../redux/actions/userActions';
import { HANDLE_FAVOURITE_RESET } from '../../redux/consts';

const Wishlist = () => {
  const dispatch = useDispatch();

  const { favourites, gettingFavourites } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getFavourites());

    return () => {
      dispatch(loadUser());
      dispatch({ type: HANDLE_FAVOURITE_RESET });
    };
  }, [dispatch]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <MetaData title="Wishlist" />

      <Navbar />

      {gettingFavourites ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="main mt-5">
            <div className="mr-5 pt-5">
              <div style={{ display: 'flex' }}>
                <h1 className="title_wish">My WishList</h1>
                <img style={{ width: '100px' }} src={heart} alt="" />
              </div>
              <p style={{ color: 'grey' }}>
                All the products entered in the wishlist can be seen and
                managed!!
              </p>
            </div>
            <div>
              <img className="imgwishlist" src={wish} alt="" />
            </div>
          </div>

          {favourites?.map(
            ({
              _id,
              product: { images, name, price, _id: productId, category },
            }) => (
              // <div key={_id} className="ml-3">
              <div key={_id} className="row d-flex justify-content-center">
                <div className="col-8">
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-2">
                        <img
                          src={images?.[0].url || PriceGetter}
                          alt={category?.search}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-4">
                        <Link to={`/product/${productId}`}>{name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">Rs. {price}</p>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => {
                            dispatch(handleFavourite(productId, _id));
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            )
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Wishlist;
