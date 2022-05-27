import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Header.css';
import ai from '../../../assets/ai-low.png';

import { setFilters } from '../../../redux/actions/filterActions';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">
          Let&apos;s find and compare prices accross different <br />
          E-commerce Stores
        </h1>

        <div className="gpt3__header-content__input">
          <input
            type="email"
            placeholder="What are u looking for today?"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              dispatch(setFilters({ query }));
              navigate('/filter?nav=true');
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="gpt3__header-image">
        <img src={ai} alt="theme" />
      </div>
    </div>
  );
};

export default Header;
