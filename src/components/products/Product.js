import React, { useEffect, useRef, useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { handleFavourite as handleFavouriteAction } from "../../redux/actions/userActions";
import { loadUser } from "../../redux/actions/authActions";
import { HANDLE_FAVOURITE_RESET } from "../../redux/consts";
import PriceGetter from "../../assets/PriceGetter.png";

const Product = ({ product, col, callbackRef }) => {
  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef(null);

  const { isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (!isUpdated) return;
    dispatch(loadUser());

    dispatch({ type: HANDLE_FAVOURITE_RESET });
  }, [dispatch, isUpdated]);

  useEffect(() => {
    // if (!user || !product) return;
    const favourites = user?.favourites?.map((favourite) => favourite.product);

    setIsFavourite(favourites?.includes(product?._id));
  }, [user, product]);

  const handleFavourite = (e, id) => {
    if (!user) navigate("/login");

    dispatch(handleFavouriteAction(id));
  };
  const isImage = (url) =>
    /\http(|s):(.*?).(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (isImage(entry.target.dataset.src)) {
          entry.target.setAttribute("src", entry.target.dataset.src);
        } else {
          entry.target.classList.remove("lazy-img");
        }
        entry.target.addEventListener("load", function () {
          entry.target.classList.remove("lazy-img");
        });
      }
    });
    const { current: img } = imgRef;
    if (img) observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [imgRef]);

  return (
    <div
      className={`col-sm-10 col-md-6 col-lg-${col}`}
      style={{ borderRadius: "20px" }}
      ref={callbackRef}
      key={product._id}
      data-id={product._id}
    >
      <div className="product_box my-2  ">
        <div className="py-3 px-1">
          <div className="d-flex flex-column justify-content-center align-content-center pl-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite color="red" />}
                className="zoom-box"
                onClick={(e) => handleFavourite(e, product._id)}
                checked={isFavourite}
              />
              {product.discount && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    background: "#FFE6E6",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "4px",

                    height: "20px",
                    width: "40px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: "12px",
                      verticalAlign: "center",
                      textAlign: "center",
                      marginBottom: "0",
                      color: "#E61919",
                    }}
                  >
                    {product.discount}
                  </p>
                </div>
              )}
              {product?.seller?.logo?.url && (
                <img
                  style={{ width: "60px" }}
                  alt="seller pic"
                  src={product?.seller?.logo?.url}
                />
              )}
            </div>

            <img
              style={{ borderRadius: "20px" }}
              className="m-auto card-img-top lazy-img zoom-box"
              alt="product pic"
              src={PriceGetter}
              data-src={product.images[0]?.url}
              ref={imgRef}
            />
          </div>
          <div
            className="card-body d-flex flex-column pl-3"
            style={{
              padding: "auto",
              marginTop: "20px",
              borderRadius: "20px ",
            }}
          >
            <h5 className="card-title">
              {product.name.replace(/^(.{15}[^\s]*).*/, "$1")}{" "}
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
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="card-text"
                  style={{
                    fontSize: "12px",
                    color: "#5B6370",
                    margin: "0",
                  }}
                >
                  {product.oldPrice && <del>Rs.{product.oldPrice}</del>}
                </p>
                <p
                  className="card-text"
                  style={{ fontSize: "16px", color: "#282B30" }}
                >
                  Rs.{product.price}
                </p>
              </div>

              {product.stock === "In Stock" || product.stock > 0 ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    background: "#9aeb91  ",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "4px",

                    height: "20px",
                    width: "50px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: "12px",
                      verticalAlign: "center",
                      textAlign: "center",
                      marginBottom: "0",
                      color: "black",
                    }}
                  >
                    In stock
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
