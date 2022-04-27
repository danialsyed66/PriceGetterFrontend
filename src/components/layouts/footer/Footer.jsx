import React from "react";
import whatsapp from "../../../assets/whatsapp.svg";
import email from "../../../assets/envelope.svg";
import phone from "../../../assets/headset.svg";
import youtube from "../../../assets/youtube.svg";
import linkdn from "../../../assets/linkedin.svg";

import facebook from "../../../assets/facebook.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="background_color d-flex flex-column justify-content-between mt-auto">
      <div>
        <h3 className="text_white text-center">We’re always ready to help.</h3>
        <div
          className="d-flex justify-content-between align-items-center w-50 m-auto"
          style={{ paddingTop: "30px" }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={whatsapp} alt="" />
            <p className="p_white ">03224916205</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={email} alt="" />
            <p className="p_white  ">naumanashraf30@gmail.com</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={phone} alt="" />
            <p className="p_white  "> 03224916205</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center ">
        <p className="p_white">@2022PriceGetter.pk</p>
        <div>
          <img style={{ padding: "10px" }} src={youtube} alt="" />
          <img style={{ padding: "10px" }} src={linkdn} alt="" />
          <img
            style={{ padding: "10  px", marginRight: "20px" }}
            src={facebook}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
