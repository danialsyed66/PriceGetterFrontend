import React from 'react';
import icons from './icons';

const Category = () => {
  return (
    <div className="p-4">
      <div className="row">
        {icons.map(({ src, text, val }) => {
          return (
            <div
              className="col-md-2 col-6 d-flex flex-column justify-content-center align-items-center py-2"
              key={text}
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
