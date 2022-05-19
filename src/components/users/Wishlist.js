import React, { Fragment } from "react";
import wish from "../../assets/wishlist.svg";
import heart from "../../assets/hearted.svg";
import "./wishlist.css";
import { Footer, Navbar } from "../layouts";
import { Link } from "react-router-dom";
const Wishlist = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div>
        <Navbar />
        <div className="main mt-5">
          <div className="mr-5 pt-5">
            <div style={{ display: "flex" }}>
              <h1 className="title_wish">My WishList</h1>
              <img style={{ width: "100px" }} src={heart} alt="" />
            </div>
            <p style={{ color: "grey" }}>
              All the products entered in the wishlist can be seen and managed!!
            </p>
          </div>
          <div>
            <img className="imgwishlist" src={wish} alt="" />
          </div>
        </div>
        {/* <div className="col-12 col-lg-8">
          {Items.map(
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
                      <img
                        src={images[0]?.url}
                        alt={"Laptop"}
                        height="90"
                        width="115"
                      />
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
                        onClick={() => {}}
                      ></i>
                    </div>
                  </div>
                </div>
                <hr />
              </Fragment>
            )
          )}
        </div> */}
      </div>
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Wishlist;
