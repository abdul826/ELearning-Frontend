import React from "react";
import "./footer.css";
import { FaFacebook,FaInstagramSquare,FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
          with ❤️ <a href="">Abdul Rahman</a>
        </p>
        <div className="social-links">
          <a href="">
            <FaFacebook />
          </a>
          <a href="">
            <FaInstagramSquare />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;