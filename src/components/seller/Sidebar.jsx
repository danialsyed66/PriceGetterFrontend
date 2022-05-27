import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Sidebar.css';
import DashboardIcon from '../../assets/images/dashboard';
import AppointmentIcon from '../../assets/images/appointment';
import BookIcon from '../../assets/images/bookIcon';
import Triage from '../../assets/images/triage';
import pricegetter from '../../assets/PriceGetter.png';

// doctor component
function SideBar({ active, setHandleActive }) {
  // side bar items
  const itemsData = useMemo(
    () => [
      {
        component: DashboardIcon,
        name: 'Dashboard',
        link: '/seller/dashboard',
      },
      {
        name: 'Products',
        component: AppointmentIcon,
        link: '/seller/products',
      },
      {
        name: 'Add Product',
        component: BookIcon,
        link: '/seller/product',
      },
      {
        name: 'Orders',
        component: Triage,
        link: '/seller/orders',
      },
    ],
    []
  );

  const [activeItem, setActiveItem] = useState(itemsData[0]);
  // make svg compoennt
  const makeSvgComponent = (Component, isActive) => {
    const activeColorOne = '#01676B';
    const activeColorTwo = '#FFF';
    const disableColorOne = '#FFFFFF';
    const disableColorTwo = '#01676b';
    return (
      <Component
        colorOne={isActive ? activeColorOne : disableColorOne}
        colorTwo={isActive ? activeColorTwo : disableColorTwo}
      />
    );
  };

  // getting active path
  const path = useLocation().pathname;
  // setting current active tab
  useEffect(() => {
    const currnetItem = itemsData.find(el => path === el.link);
    if (currnetItem) setActiveItem(currnetItem);
    return () => {
      setActiveItem(itemsData[0]);
    };
  }, [itemsData, path]);

  // main return

  return (
    <>
      <div className="sideBar sideBarDiv d-none d-md-block">
        <div className="centerDiv">
          <Link to="/">
            <img src={pricegetter} className="logo" alt="logo"></img>
          </Link>
        </div>

        <div className="itemsFlex">
          <div className="w-100">
            {itemsData.map((item, index) => {
              const isActive = activeItem.link === item.link;
              return (
                <Link to={item.link} key={index}>
                  <div
                    onClick={() => setActiveItem(item)}
                    key={index}
                    className={
                      isActive
                        ? 'DashboardSideBarItem sideBarItemActive'
                        : 'DashboardSideBarItem'
                    }
                  >
                    <div style={{ width: '40px' }}>
                      {item.component &&
                        makeSvgComponent(item.component, isActive)}
                    </div>
                    <div className="title" style={{ color: '#01676b' }}>
                      {item.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* mobile Side Bar */}
      <div className="d-block d-md-none">
        <div
          onClick={() => setHandleActive(false)}
          className={
            active ? 'sideBarModal sideBarModalActive' : 'sideBarModal'
          }
        ></div>
        <div
          className={
            active
              ? 'sideBarM sideBarDiv sideBarMActive'
              : 'sideBarM sideBarDiv'
          }
        >
          <div className="centerDiv" style={{ marginBottom: '20rem' }}>
            <img src="/images/logo.svg" className="logo" alt=""></img>
          </div>

          <div className="itemsFlex" style={{ marginTop: '20rem' }}>
            <div className="w-100">
              {itemsData.map((item, index) => {
                const isActive = activeItem.link === item.link;
                return (
                  <Link to={item.link} key={index}>
                    <div
                      onClick={() => {
                        setActiveItem(item);
                        setHandleActive(false);
                      }}
                      key={index}
                      className={
                        isActive
                          ? 'DashboardSideBarItem sideBarItemActive'
                          : 'DashboardSideBarItem'
                      }
                    >
                      <div style={{ width: '40px' }}>
                        {item.component &&
                          makeSvgComponent(item.component, isActive)}
                      </div>
                      <div className="title">{item.name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SideBar;
