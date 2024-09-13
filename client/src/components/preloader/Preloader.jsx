import React, { useEffect, useState } from "react";
import "../../styles/preloader/preloader.css";

function Preloader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const totalDuration = 1500; // 1.5 seconds
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

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader">
      <div className="preloader__content">
        <div className="preloader__header">
          <h1>
            <span>JAZPHER</span>
            <span>CARPIO</span>
          </h1>
          <h2>Web Developer</h2>
        </div>

        <div className="preloader__counter">{counter}%</div>
      </div>
    </div>
  );
}

export default Preloader;
