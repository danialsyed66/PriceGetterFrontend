import React, { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { ImCross } from 'react-icons/all';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Navbar.css';
import priceGetter from '../../../assets/logoh.svg';
import { logout } from '../../../redux/actions/authActions';

const Menu = () => (
  <>
    <p>
      <Link className="nav-a" to="/login">
        Sales
      </Link>
    </p>

    <p>
      <Link className="nav-a" to="/login">
        Discounts
      </Link>
    </p>
    <p>
      <Link className="nav-a" to="/login">
        Wishlist
      </Link>
    </p>
    <p>
      <Link className="nav-a" to="/login">
        Forems
      </Link>
    </p>
    <p>
      <Link className="nav-a" to="/login">
        Guide
      </Link>
    </p>
  </>
);
const Navbar = () => {
  const path = useLocation().pathname;

  const { isAuth, loading } = useSelector(state => state.auth);
  const [Toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <Link to={'/'}>
            <img src={priceGetter} alt="logo" />
          </Link>
        </div>
        <div className="gpt3__navbar-links_container">
          <div className="d-flex justify-content-between align-items-center">
            <Menu />
            {path === '/' ? (
              <div />
            ) : (
              <input
                style={{ width: '300px', marginLeft: '10px' }}
                type="text"
                placeholder="What are u looking for today?"
                className="form-control"
              />
            )}
          </div>
        </div>
      </div>

      {!loading && (
        <>
          <div className="gpt3__navbar-sign">
            {isAuth ? null : (
              <button
                type="button"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Sign in{' '}
              </button>
            )}
          </div>
          <div className=" mx-1 gpt3__navbar-sign">
            {isAuth ? null : (
              <button
                type="button"
                onClick={() => {
                  navigate('/register');
                }}
              >
                Register now
              </button>
            )}
          </div>
          <div className=" mx-1 gpt3__navbar-sign">
            {isAuth ? (
              <button type="button" onClick={() => dispatch(logout())}>
                Log Out
              </button>
            ) : null}
          </div>
          <div className="gpt__navbar-menu">
            {Toggle ? (
              <ImCross
                size={26}
                color="black"
                onClick={() => setToggle(false)}
              />
            ) : (
              <BsList size={26} color="black" onClick={() => setToggle(true)} />
            )}
            {Toggle && (
              <div className="gpt3__navbar-menu_container scale-up-center">
                <div className="gpt3__navbar-menu_container-links">
                  <Menu />
                </div>
                <div className="gpt3__navbar-sign-menu">
                  {isAuth ? null : (
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      Sign in{' '}
                    </button>
                  )}
                </div>
                <div className="mx-1 gpt3__navbar-sign-menu">
                  {isAuth ? null : (
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/signin');
                      }}
                    >
                      Register now
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
