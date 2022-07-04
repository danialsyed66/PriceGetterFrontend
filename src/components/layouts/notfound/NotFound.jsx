import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';
import priceGetter from '../../../assets/headericon.svg';

import { Footer, Navbar, MetaData } from '../';

const Forum = ({ forSeller }) => {
  return (
    <>
      <MetaData title={`${forSeller ? 'Not Authorized' : 'Not Found'}`} />

      <Navbar />
      <div className="site">
        <div className="sketch">
          <Link to={'/'}>
            <img
              src={priceGetter}
              style={{ width: '25rem' }}
              alt="PriceGetterIcon"
            />
          </Link>
        </div>

        <h1 className="h1">
          {`${forSeller ? '401:' : '404:'}`}
          <small className="small">{`${
            forSeller ? 'OOPS!!! You are Not' : 'OOPS!!!'
          }`}</small>
          <small className="small">{`${
            forSeller ? 'Authorized by the Admin Yet!' : 'Page Not Found!'
          }`}</small>
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default Forum;
