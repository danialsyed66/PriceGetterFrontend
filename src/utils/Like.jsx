import React from 'react';

import Heart from './Heart';

const Like = ({ color, likes }) => {
  return (
    <span className="border rounded p-2 m-1">
      <Heart color={color} /> Like {likes > 0 && likes}
    </span>
  );
};

export default Like;
