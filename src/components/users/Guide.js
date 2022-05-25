import React from "react";
import { Footer, Navbar } from "../layouts";
import job from "../../assets/joboffer.svg";
import data from "../../assets/datahet.svg";
import "./wishlist.css";

const Guide = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="row mt-5">
        <div className="col-md-2 ">
          <img className="m-auto" src={job} alt="" style={{ width: "200px" }} />
        </div>

        <div className="col-md-8">
          <div className="container">
            <div>
              <h2>How does it work?</h2>
              <p className="p_w">
                We the Team of Price Getter scrape data from different gaints
                Ecommerce in Pakistan once a day. PriceGetter enable user to
                save thier liked products into wishlist, without you having to
                do anything. Our own Products can be buy directly from us as we
                authenticate the seller before registerations. It's benefit user
                to quicky search thier required product rather than searching
                product indiviually from different sites
              </p>
            </div>
            <div>
              <h2>What does it cost?</h2>
              <p className="p_w">
                You decide your costs on PriceRunner yourself. All retailers can
                set a monthly budget, which means you always have control over
                your outgoings. You pay for each click (CPC) which allows a
                visitor to be sent to your site. Contact us for a more specific
                price proposal.
              </p>
            </div>
            <div>
              <h2>Seller joined for free</h2>
              <p className="p_w">
                PriceGetter also lists retailers which are not customers of
                PriceGetter. However, customers get almost all of the traffic
                from PriceGetter visitors who are willing to buy. But all
                retailers are welcome to display their prices on PriceGetter.
              </p>
            </div>
            <div>
              <h2>Future Plans</h2>
              <p className="p_w">
                PriceGetter is growing and developing fastly as the users and
                seller increase we will plan to launch a mobile application
                which will the contain a QR code scanner to let user scan
                required product and compare prices across different site. But
                this we happen when the scope of the website will increase to
                help us to grow. Share with your family and friends
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <img
            className="m-auto"
            src={data}
            alt=""
            style={{ width: "200px" }}
          />
        </div>
        <div className="col-md-12 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Guide;
