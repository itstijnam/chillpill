import React from 'react';
import './Footer.scss';
// import IMG1 from './Images/Mountains.png';
// import LOGO from '/icon/Logo.png';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer__background">
        {/* <img src={IMG1} alt="Background Mountains" /> */}
      </div>
      
      <div className="footer__content">
        <div className="footer__sectionn footer__brand">
          <div className="logo_gap">
          <h2 className="footer__logo">
            {/* <img src={LOGO} alt="LOGO" /> */}
          </h2>
          <p className="footer__text">
            Our vision is to provide convenience<br />
            and help increase your sales business.
          </p>
          </div>
          <div className="footer__dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="footer__section">
          <h3>About</h3>
          <ul>
            <li>How it works</li>
            <li>Featured</li>
            <li>Partnership</li>
            <li>Business Relation</li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Community</h3>
          <ul>
            <li>Events</li>
            <li>Blog</li>
            <li>Podcast</li>
            <li>Invite a friend</li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Socials</h3>
          <ul>
            <li>Discord</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>©2022 Auto Fast. All rights reserved</p>
        <div className="footer__links">
          <a href="#">Privacy & Policy</a>
          <a href="#">Terms & Condition</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
