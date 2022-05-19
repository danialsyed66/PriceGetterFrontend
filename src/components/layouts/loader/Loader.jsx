import React from 'react';

import './Loader.css';
import PriceGetter from '../../../assets/PriceGetter.png';

const Loader = () => {
  // return <div className="loader"></div>;
  return (
    <img
      style={{ width: '200px' }}
      src={PriceGetter}
      alt="loader"
      className="shimmer center"
    />
  );
};

export default Loader;
