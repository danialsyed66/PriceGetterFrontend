import React, { Fragment, useEffect } from 'react';
import wish from '../../assets/wishlist.svg';
import heart from '../../assets/hearted.svg';
import './wishlist.css';
import { Footer, Loader, MetaData, Navbar } from '../layouts';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFavourites,
  handleFavourite,
} from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { loadUser } from '../../redux/actions/authActions';
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
      <div>
        <MetaData title="Wishlist" />

        <Navbar />
        {gettingFavourites ? (
          <Loader />
        ) : favourites?.length > 0 ? (
          <div className="container">
            {favourites?.map(
              ({ _id, product: { url, name, price, _id: productId } }) => (
                <Fragment key={_id}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-2">
                        <img src={url} alt={name} height="90" width="115" />
                      </div>

                      <div className="col-5 col-lg-4">
                        <Link to={`/product/${_id}`}>{name}</Link>
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
                </Fragment>
              )
            )}
          </div>
        ) : (
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
        )}
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Wishlist;