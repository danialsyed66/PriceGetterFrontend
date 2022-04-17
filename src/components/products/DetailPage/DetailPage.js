import React from "react";
import "./Detailpage.css";
import cloth from "../../../assets/IMAGE.png";
const DetailPage = () => {
  return (
    <div className="p-5">
      <div className="row">
        <div className="col-md-1">
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

        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div className=" d-flex flex-column justify-content-center align-items-center w-100">
            <p className="discount_bar p-1">32%</p>

            <img className="w-50" src={cloth} alt="" />
          </div>
        </div>
        <div className="col-md-5"></div>
      </div>
    </div>
  );
};

export default DetailPage;
