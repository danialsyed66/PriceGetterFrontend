import React from "react";
import { Link } from "react-router-dom";

import MetaData from "../layouts/MetaData";

const Success = () => {
  return (
    <>
      <MetaData title="Order Success" />

      <div className="col-6 mt-5 text-center">
        <img
          className="my-5 img-fluid d-block mx-auto"
          src="https://freepngimg.com/thumb/success/6-2-success-png-image.png"
          alt="Order Success"
          width="200"
          height="200"
        />

        <h2>Your Order has been placed successfully.</h2>

        <Link to="/orders">Go to Orders</Link>
      </div>
    </>
  );
};

export default Success;
