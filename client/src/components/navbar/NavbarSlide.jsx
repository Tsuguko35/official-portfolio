import React, { useEffect } from "react";
import "../../styles/navbar/navbarslide.css";

function NavbarSlide({ isOpen }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className={`navbarslide ${isOpen ? "open" : "close"}`}>
      <div className="wrapper">
        <nav className="nav__contianer">
          <ul className="nav__items">
            <li className="nav__item">
              <a href="/" className="reveal">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="/" className="reveal">
                Projects
              </a>
            </li>
            <li className="nav__item">
              <a href="/" className="reveal">
                About
              </a>
            </li>
            <li className="nav__item">
              <a href="/" className="reveal">
                Contact
              </a>
            </li>
          </ul>
          <span className="nav__divider"></span>
          <div className="nav__socials">
            <div className="nav__socials__container">
              <div className="text__container">
                <a href="/" className="logo reveal">
                  <span>J</span>AZPHER <span>C</span>ARPIO
                </a>
              </div>
              <div className="text__container">
                <p className="reveal">Web Developer</p>
              </div>
            </div>
            <div className="nav__socials__container">
              <div className="text__container">
                <p className="title reveal">CONTACT</p>
              </div>

              <div className="text__container">
                <p className="reveal">carpio.johnjazpher.dc.3188@gmail.com</p>
              </div>
            </div>
            <div className="nav__socials__container">
              <div className="text__container">
                <p className="title reveal">SOCIALS</p>
              </div>
              <div className="text__container">
                <p className="reveal">carpio.johnjazpher.dc.3188@gmail.com</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarSlide;
