import React, { useEffect, useRef, useState } from 'react';
import { BsList } from 'react-icons/bs';
import { ImCross } from 'react-icons/all';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Navbar.css';
import searchs from '../../../assets/search.svg';
import priceGetter from '../../../assets/headericon.svg';
import cart from '../../../assets/cart2.svg';

import { logout } from '../../../redux/actions/authActions';
import { setFilters } from '../../../redux/actions/filterActions';

const Menu = ({ path }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { onSale } = useSelector(state => state.filters);

  const handleNavigate = category => {
    dispatch(setFilters({ onSale: true }));

    navigate('/filter?nav=true');
  };

  return (
    <>
      <p>
        <span
          className={
            (path === '/filter?nav=true' || path === '/filter') && onSale
              ? `nav-a nav-permanent pointer`
              : `nav-a pointer`
          }
          onClick={handleNavigate}
        >
          Sales
        </span>
      </p>
      <p>
        <Link
          className={path === '/wishlist' ? `nav-a nav-permanent ` : `nav-a`}
          to="/wishlist"
        >
          Wishlist
        </Link>
      </p>
      <p>
        <Link
          className={path === '/forums' ? `nav-a nav-permanent ` : `nav-a`}
          to="/forums"
        >
          Forums
        </Link>
      </p>
      <p>
        <Link
          className={path === '/guide' ? `nav-a nav-permanent ` : `nav-a`}
          to="/guide"
        >
          Guide
        </Link>
      </p>
    </>
  );
};
const Navbar = () => {
  const path = useLocation().pathname;

  const [Toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropDownMenu = useRef(null);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const { isAuth, loading, user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [setQuery, search]);

  useEffect(() => {
    if (!query.length) return;

    dispatch(setFilters({ query }));
    navigate('/filter?nav=true');
  }, [dispatch, navigate, query]);

  const renderCartIcon = () => (
    <>
      <Link
        to="/cart"
        style={{
          textDecoration: 'none',
          margin: '-30px 0 0 -2px',
        }}
      >
        <img style={{ width: '30px' }} src={cart} alt="" />
        <span id="cart_count">{cartItems?.length}</span>
      </Link>
    </>
  );

  const renderProfileDropDown = () => (
    <div className="ml-4 dropdown d-inline">
      <Link
        to="#!"
        className="btn dropdown-toggle text-white mr-4"
        type="button"
        id="dropDownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          dropDownMenu.current.classList.toggle('show');
        }}
      >
        <figure className="avatar avatar-nav">
          <img
            src={user.avatar?.url}
            alt={user.name}
            className="rounded-circle"
          />
        </figure>
        <span style={{ color: 'black' }}>{user.name}</span>
      </Link>

      <div
        className="dropdown-menu"
        aria-labelledby="dropDownMenuButton"
        ref={dropDownMenu}
      >
        <Link to="/profile" className="dropdown-item">
          Profile
        </Link>
        {['seller', 'seller-pending'].includes(user.role) && (
          <Link to="/seller/dashboard" className="dropdown-item">
            Dashboard
          </Link>
        )}
        <Link to="/orders" className="dropdown-item">
          Orders
        </Link>
        <Link
          to="/"
          className="dropdown-item text-danger"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <Link to={'/'}>
            <img src={priceGetter} style={{ width: '100px' }} alt="logo" />
          </Link>
        </div>
        <div className="gpt3__navbar-links_container">
          <div className="d-flex justify-content-between align-items-center">
            <Menu path={path} />
            {path === '/' ? (
              <div />
            ) : (
              <div className="form-control">
                <input
                  className="search"
                  style={{ width: '300px', marginLeft: '10px', border: 'none' }}
                  type="text"
                  placeholder="What are u looking for today?"
                  onChange={e => setSearch(e.target.value)}
                />
                <img src={searchs} alt="" />
              </div>
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
            {isAuth && renderProfileDropDown()}
          </div>
          <div>{renderCartIcon()}</div>
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
                  <Menu path={path} />
                </div>
                <div className="d-flex  justify-content-end align-items-end">
                  <div className="gpt3__navbar-sign-menu">
                    {isAuth ? (
                      renderProfileDropDown()
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          navigate('/login');
                        }}
                      >
                        Sign in
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
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
