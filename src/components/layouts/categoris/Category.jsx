import React from 'react';
import { useDispatch } from 'react-redux';

import icons from './icons';
import { setFilters } from '../../../redux/actions/filterActions';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = category => {
    dispatch(setFilters({ categories: [category] }));

    navigate('/filter?nav=true');
  };

  return (
    <div className="p-4">
      <div className="row">
        {icons.map(({ src, text, val }) => {
          return (
            <div
              className="col-md-2 col-6 d-flex flex-column justify-content-center align-items-center py-2"
              style={{ cursor: 'pointer' }}
              key={text}
              onClick={() => handleNavigate(val)}
            >
              <img className="w- w-25" src={src} alt={text} />
              <h4>{text}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
