import React, { useEffect, useState, useRef } from "react";
import "../../styles/cursor/cursorfollower.css";

function CursorFollower() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection
  const [circlePosition, setCirclePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2, // Start in the middle of the screen
  });

  // Track the cursor's last known position
  const cursorPosition = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  // Function to check if the device is mobile
  const checkIfMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    // Initial check
    setIsMobile(checkIfMobile());

    // Optionally check on resize
    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const totalDuration = 1500; // 1.5 seconds
    const startTime = performance.now();

    // Animation to increment progress
    const animateProgress = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(progress);

      if (progress < 100) {
        requestAnimationFrame(animateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(animateProgress);

    // Mark animation as complete after additional time
    const timeout = setTimeout(() => {
      setIsComplete(true); // Set animation to complete
    }, totalDuration + 500); // Delay before following the cursor

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Update cursor position continuously
    const handleMouseMove = (event) => {
      cursorPosition.current = {
        x: event.clientX, // Use clientX for position relative to the viewport
        y: event.clientY, // Use clientY for position relative to the viewport
      };
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isComplete || isMobile) return;

    // Implement lag effect continuously
    const updatePosition = () => {
      setCirclePosition((prevPosition) => {
        const dx = cursorPosition.current.x - prevPosition.x;
        const dy = cursorPosition.current.y - prevPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
          return cursorPosition.current; // Snap to final position
        }

        // Move the circle towards the cursor position with lag effect
        return {
          x: prevPosition.x + dx * 0.1,
          y: prevPosition.y + dy * 0.1,
        };
      });

      requestAnimationFrame(updatePosition);
    };

    updatePosition();
  }, [isComplete, isMobile]);

  return (
    <div
      className={`circle__loader__container ${
        isComplete ? (isMobile ? "shrink" : "follow") : ""
      }`}
      style={{
        left: `${circlePosition.x}px`,
        top: `${circlePosition.y}px`,
        position: "fixed", // Keep the circle fixed to the screen
        transform: `translate(-50%, -50%) scale(${
          isComplete && !isMobile ? 0.08 : isComplete && isMobile ? 0 : 1
        })`, // Scale to 0 on mobile
      }}
    >
      <svg className="circle__loader" viewBox="0 0 100 100">
        <circle
          className="circle__bg"
          cx="50"
          cy="50"
          r="45"
          style={{ visibility: progress === 100 ? "hidden" : "visible" }}
        ></circle>
        <circle
          className={`circle__progress ${isComplete ? "follow" : ""}`}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray="282.6"
          strokeDashoffset={282.6 - (282.6 * progress) / 100}
        ></circle>
      </svg>
    </div>
  );
}

export default CursorFollower;
