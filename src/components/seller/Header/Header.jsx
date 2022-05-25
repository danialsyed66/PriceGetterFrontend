import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export default function Header({ active, setHandleActive }) {
  const path = useLocation().pathname;

  const [title, setTitle] = useState('Dashboard');
  useEffect(() => {
    switch (path) {
      case '/seller/dashboard':
        setTitle('Seller Dashboard');
        break;
      case '/seller/allproduct':
        setTitle('Products');
        break;

      case '/seller/product':
        setTitle('New Product');
        break;
      case '/seller/Orders':
        setTitle('Orders');
        break;
      default:
        setTitle('Dashboard');
        break;
    }
  }, [path]);

  // main return
  return (
    <div>
      <nav className="flexBetweenCenter dashboardNavBar ">
        {/* SideBarButton */}
        <div className="d-inline d-md-none">
          <div
            onClick={() => setHandleActive(!active)}
            className={
              active
                ? ' dashboardNavaBarButton activeSideBar '
                : 'dashboardNavaBarButton'
            }
          >
            <div className="dashboardNavBarLine dashboardNavBarLine1"></div>
            <div className="dashboardNavBarLine dashboardNavBarLine2"></div>
            <div className="dashboardNavBarLine dashboardNavBarLine3"></div>
          </div>
        </div>
        <h4 class="navBrand">{title}</h4>

        <div className="flexCenter navIcons">{/* <HeaderProfileImg /> */}</div>
      </nav>
    </div>
  );
}
