import React from "react";
import { Link } from "react-router-dom";
import ".././products/Home.css";

const Sidebar = () => {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="sidebar-wrapper">
            <nav id="sidebar">
              <ul className="list-unstyled components">
                <li>
                  <Link to="/dashboard">
                    <i className="fa fa-tachometer-alt"></i> Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/seller/products">
                    <i className="fa fa-product-hunt"></i> All Products
                  </Link>
                </li>
                <li>
                  <Link to="/seller/product">
                    <i className="fa fa-plus"></i> Create Products
                  </Link>
                </li>

                <li>
                  <Link to="/seller/orders">
                    <i className="fa fa-shopping-basket"></i> Orders
                  </Link>
                </li>

                <li>
                  <Link to="/seller/reviews">
                    <i className="fa fa-users"></i> Review
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
