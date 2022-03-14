import React from 'react';

import './Loader.css';
import PriceGetter from '../../../assets/PriceGetter.png';

const Loader = () => {
  // return <div className="loader"></div>;
  return <img src={PriceGetter} alt="loader" className="shimmer center" />;
};

export default Loader;
