import React from 'react';
import whatsapp from '../../../assets/whatsapp.svg';
import email from '../../../assets/envelope.svg';
import youtube from '../../../assets/youtube.svg';

import linkdn from '../../../assets/linkedin.svg';
import gameday from '../../../assets/gameday.svg';
import wishlist from '../../../assets/tolly.svg';
import facebook from '../../../assets/facebook.svg';
import './Footer.css';

const Footer = () => {
  return (
    <div className="background_color d-flex flex-column   ">
      <div className=" lists_footer">
        <ul className="lists_ul">
          <li>About us</li>
          <li>Press Release</li>
          <li>Terms of Service</li>
          <li>Privacy</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className=" lists_footer">
        <ul className="lists_ul">
          <li>Research</li>
          <li>Guide</li>
          <li>Blogs</li>
          <li>Our Success</li>
          <li>Our Story</li>
        </ul>
      </div>
      <div className="icons_list">
        <img src={whatsapp} alt="" />
        <img src={email} alt="" />
        <img src={youtube} alt="" />
        <img src={linkdn} alt="" />
        <img src={facebook} alt="" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          style={{ width: '200px', marginLeft: '10px' }}
          src={gameday}
          alt=""
        />
        <img
          src={wishlist}
          style={{ width: '200px', marginLeft: '10px' }}
          alt=""
        />
      </div>
    </div>
  );
};

export default Footer;
