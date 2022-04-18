import React from "react";
import "./Detailpage.css";
import cloth from "../../../assets/IMAGE.png";
const DetailPage = () => {
  return (
    <div className="p-2">
      <div className="row">
        <div className="col-md-1 offset-md-2">
          <div className="boxs-img">
            <div className="small_pic p-2 my-2 ">
              <img src={cloth} alt="" />
            </div>
            <div className="small_pic p-2  my-2 ">
              <img src={cloth} alt="" />
            </div>
            <div className="small_pic p-2 my-2  ">
              <img src={cloth} alt="" />
            </div>
            <div className="small_pic p-2 my-2  ">
              <img src={cloth} alt="" />
            </div>
            <div className="small_pic p-2  my-2 ">
              <img src={cloth} alt="" />
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className=" d-flex flex-column justify-content-center align-items-center w-100">
            <p className="discount_bar p-1">32%</p>

            <img className="w-75" src={cloth} alt="" />
          </div>
        </div>
        <div className="col-md-5 heaing_detail">
          <h2>Canada Goose Hybridge Jacket - Black</h2>
          <p className="p_detail">
            Here you can see the latest price of SecuGen Hamster Pro 20
            Fingerprint Scanner. Product design & specifications may vary
            depending on the model and its size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
