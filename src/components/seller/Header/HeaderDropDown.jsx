import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderProfileImg() {
  return (
    <div className="headerProfile" style={{ minHeight: 'fit-content' }}>
      <div className="dropDown" style={{ maxHeight: 'auto !important' }}>
        <Link to="/">
          <div className="item">Home</div>
        </Link>
        <div className="divider"></div>
        <Link>
          <div className="item">Profile</div>
        </Link>
      </div>
    </div>
  );
}
