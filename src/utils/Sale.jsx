import React from 'react';

import Heart from './Heart';

const Like = ({ color }) => {
  return (
    <span className="border rounded p-2 m-1">
      <svg
        // xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={color}
        className="bi bi-heart-fill"
        viewBox="0 0 16 16"
      >
        {/* <path
          fillRule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        /> */}
      </svg>
      Sale
    </span>
  );
};

export default Like;
