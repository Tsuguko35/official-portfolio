import React, { useEffect, useState } from "react";
import "../../styles/navbar/navbar.css";
import NavbarSlide from "./NavbarSlide";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled && !isOpen ? "scrolled" : ""}`}>
      <nav>
        <a href="/" className="logo">
          <span>J</span>AZPHER <span>C</span>ARPIO
        </a>
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
        </div>
      </nav>

      <NavbarSlide isOpen={isOpen} />
    </header>
  );
}

export default Navbar;
