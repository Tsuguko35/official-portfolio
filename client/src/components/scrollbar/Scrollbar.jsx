import React, { useEffect, useRef, useState } from "react";
import "../../styles/scrollbar/scrollbar.css";

function Scrollbar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbPosition, setThumbPosition] = useState(0);
  const scrollTimeoutRef = useRef(null);

  const handleScroll = () => {
    // Show scrollbar when scrolling
    setIsScrolling(true);

    // Clear previous timeout if any
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Calculate the thumb position
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const trackHeight = windowHeight;

    // Set thumb height and position based on scroll
    const newThumbHeight = (windowHeight / documentHeight) * trackHeight;
    const newThumbPosition =
      (scrollTop / (documentHeight - windowHeight)) *
      (trackHeight - newThumbHeight);

    setThumbHeight(newThumbHeight);
    setThumbPosition(newThumbPosition);

    // Hide scrollbar after 1.5 seconds of no scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  useEffect(() => {
    // Update the thumb height initially
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // Recalculate on resize

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className={`scrollbar ${isScrolling ? "visible" : ""}`}>
      <div className="track">
        <div
          className="thumb"
          style={{
            height: `${thumbHeight}px`,
            top: `${thumbPosition}px`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Scrollbar;
