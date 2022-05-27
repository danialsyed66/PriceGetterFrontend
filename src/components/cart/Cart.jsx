import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../products/Home.css';
import MetaData from '../layouts/MetaData';
import { removeFromCart, updateCart } from '../../redux/actions/cartActions';
import Navbar from '../layouts/navbar/Navbar';
import { Footer } from '../layouts';
// import Footer from "../layouts/footer/Footer";

const Cart = () => {
  const { cartItems } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const unitsAndPrice = cartItems.reduce(
      (acc, cur) => [acc[0] + cur.quantity, acc[1] + cur.quantity * cur.price],
      [0, 0]
    );

    setTotalUnits(unitsAndPrice[0]);
    setTotalPrice(unitsAndPrice[1]);
  }, [cartItems]);

  const decreaseQuantity = (id, quantity) => {
    if (quantity === 1) return;

    quantity -= 1;

    dispatch(updateCart(id, quantity));
  };

  const increaseQuantity = (id, quantity, stock) => {
    if (quantity >= stock) return;

    quantity += 1;

    dispatch(updateCart(id, quantity));
  };

  return (
    <>
      <MetaData title="Cart" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <div className="container">
          {!cartItems.length ? (
            <h2 className="text-center mt-5">Your Cart is empty Right Now</h2>
          ) : (
            <>
              <h2 className="mt-5">
                Your Cart: <b> {cartItems.length} items</b>
              </h2>

              <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8">
                  {cartItems.map(
                    ({
                      _id,
                      name,
                      price,
                      description,
                      rating,
                      images,
                      seller,
                      stock,
                      noOfReviews,
                      category,
                      reviews,
                      createdAt,
                      quantity,
                    }) => (
                      <Fragment key={_id}>
                        <hr />
                        <div className="cart-item">
                          <div className="row">
                            <div className="col-4 col-lg-2">
                              {/* <img
                                src={images[0]?.url}
                                alt={'Laptop'}
                                height="90"
                                width="115"
                              /> */}
                            </div>

                            <div className="col-5 col-lg-4">
                              <Link to={`/product/${_id}`}>{name}</Link>
                            </div>

                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                              <p id="card_item_price">Rs. {price}</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                              <div className="stockCounter d-inline">
                                <button
                                  className="btn btn-danger minus"
                                  onClick={() =>
                                    decreaseQuantity(_id, quantity)
                                  }
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
                                  onClick={() =>
                                    increaseQuantity(_id, quantity, stock)
                                  }
                                  disabled={quantity >= stock}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                              <i
                                id="delete_cart_item"
                                className="fa fa-trash btn btn-danger"
                                onClick={() => dispatch(removeFromCart(_id))}
                              ></i>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    )
                  )}
                </div>

                <div className="col-12 col-lg-3 my-4">
                  <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>
                      Subtotal:{' '}
                      <span className="order-summary-values">
                        {totalUnits} (Units)
                      </span>
                    </p>
                    <p>
                      Est. total:{' '}
                      <span className="order-summary-values">
                        Rs. {totalPrice.toFixed(2)}
                      </span>
                    </p>

                    <hr />
                    <button
                      id="checkout_btn"
                      className="btn btn-primary btn-block"
                      onClick={() => navigate('/shipping')}
                    >
                      Check out
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Cart;
