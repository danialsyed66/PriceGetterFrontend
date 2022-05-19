import React from "react";
import wish from "../../assets/wishlist.svg";
import heart from "../../assets/hearted.svg";
import "./wishlist.css";
import { Footer, Navbar } from "../layouts";
const Wishlist = () => {
  return (
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
          <img style={{ width: "400px" }} src={wish} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
