import React, { useEffect, useRef, useState } from "react";
import "../../styles/preloader/preloader.css";

function Preloader() {
  const [counter, setCounter] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const cursorPosition = useRef({ x: 0, y: 0 });
  const boxRef = useRef(null);

  useEffect(() => {
    const totalDuration = 1500; // 1.5 seconds
    const totalAnimationDuration = 3000; // 1.5 seconds
    const incrementValue = 100;
    const intervalTime = totalDuration / incrementValue;

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 1;
        } else {
          clearInterval(interval);
          return prevCounter;
        }
      });
    }, intervalTime);

    const updateCursorPosition = (e) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", updateCursorPosition);

    setTimeout(() => {
      setIsAnimationComplete(true);

      // Ensure the box is initially positioned correctly
      if (boxRef.current) {
        boxRef.current.style.left = `${cursorPosition.current.x}px`;
        boxRef.current.style.top = `${cursorPosition.current.y}px`;
        boxRef.current.style.transform = `translate(-50%, -50%) scale(0.12)`;
      }
    }, totalAnimationDuration);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  useEffect(() => {
    if (isAnimationComplete) {
      let targetX = cursorPosition.current.x;
      let targetY = cursorPosition.current.y;
      let currentX = targetX;
      let currentY = targetY;

      const moveBoxToCursor = (e) => {
        cursorPosition.current = { x: e.clientX, y: e.clientY };
        targetX = cursorPosition.current.x;
        targetY = cursorPosition.current.y;
      };

      const animateBox = () => {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        if (boxRef.current) {
          boxRef.current.style.left = `${currentX}px`;
          boxRef.current.style.top = `${currentY}px`;
          boxRef.current.style.transform = `translate(-50%, -50%) scale(0.12)`;
        }

        requestAnimationFrame(animateBox);
      };

      window.addEventListener("mousemove", moveBoxToCursor);
      requestAnimationFrame(animateBox);

      return () => {
        window.removeEventListener("mousemove", moveBoxToCursor);
      };
    }
  }, [isAnimationComplete]);

  return (
    <div className="preloader">
      <div className="preloader__content">
        <div className="preloader__header">
          <h2>Hello, I'm</h2>
          <h1>JAZPHER CARPIO</h1>
        </div>

        <div className="preloader__counter">{counter}/100</div>

        <div
          className={`preloader__box ${isAnimationComplete ? "cursor" : ""}`}
          ref={boxRef}
        ></div>
      </div>
    </div>
  );
}

export default Preloader;
