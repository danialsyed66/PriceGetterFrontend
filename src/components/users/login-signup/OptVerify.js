import React, {  useState } from "react";
import "./Login.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
import priceGetter from "../../../assets/PriceGetter.svg";

function OptVerify({ history }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const ResendOpt = async (e) => {
    e.preventDefault();
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  // const dispatch = useDispatch();

  const verifyy = (e) => {
    setOtp([...otp.map((v) => "")]);
    // const newopt = otp.join("");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row align-items-center Background">
          <div
            className="offset-md-4 col-md-4 offset-md-3 h-100  d-flex   align-items-center justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <img
              src={priceGetter}
              style={{ width: "220px", cursor: "pointer" }}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <h1
              style={{
                textAlign: "center",
                fontSize: "25px",
                color: "#5A5A5A",
                fontFamily: "Ubuntu",
                fontStyle: "normal",
                fontWeight: "900",
              }}
            >
              Verify your new account
            </h1>
            <span className="mb-4 w-75" style={{ textAlign: "center" }}>
              Enter the 6-digit confirmation code sent to your email
            </span>

            <div className="w-75">
              <div className="form-group d-flex mb-3 justify-content-between">
                {otp.map((data, index) => {
                  return (
                    <input
                      className="otp-field"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>
              <p>OTP Entered: {otp.join("")}</p>
              <button
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  height: "40px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setOtp(["", "", "", "", "", ""]);
                }}
                className="btn btn-secondary"
              >
                Clear
              </button>
              <button
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  height: "40px",
                  color: "#FFFFFF",
                  backgroundColor: " #3EE18F",
                }}
                onClick={verifyy}
                className="btn btn-light"
              >
                Verify OPT
              </button>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>Didn't Get The Code? </span>
                <span
                  onClick={ResendOpt}
                  className="d-sm-inline d-block"
                  style={{
                    color: " #3EE18F",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  Resend OPT
                </span>
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link
                  to="/"
                  style={{ color: " #3EE18F", fontWeight: "bolder" }}
                >
                  Return To Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptVerify;
