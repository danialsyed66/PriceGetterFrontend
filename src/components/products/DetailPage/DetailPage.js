import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Detailpage.css";

import { getProductDetails } from "../../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const DetailPage = () => {
  const {
    _id,
    name,
    price,
    description,
    rating,
    images,
    seller,
    stock,
    numOfReviews,
    category,
    reviews,
    createdAt,
    discount,
  } = useSelector((state) => state.productDetails?.product);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sellectedImage, setSellectedImage] = useState("");

  useEffect(() => {
    if (images?.length) setSellectedImage(images[0]?.url);
  }, [images]);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <div className="p-2">
      <div className="row">
        <div className="col-md-1 offset-md-2">
          <div className="boxs-img">
            {images?.map((image) => (
              <div
                className="small_pic p-2 my-2"
                onClick={() => setSellectedImage(image?.url)}
              >
                <img src={image?.url} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className=" d-flex flex-column justify-content-center align-items-center w-100">
            <p className="discount_bar p-1">{discount}</p>

            <img className="w-75" src={sellectedImage} alt="" />
          </div>
        </div>
        <div className="col-md-5 heaing_detail">
          <h2>{name}</h2>
          <p className="p_detail">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
