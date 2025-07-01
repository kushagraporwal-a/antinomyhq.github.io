import React, { useEffect, useRef } from "react";

const SPOTLIGHT_SIZE = 250;

const SpotlightCursor: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX - SPOTLIGHT_SIZE / 2}px`;
        spotlightRef.current.style.top = `${e.clientY - SPOTLIGHT_SIZE / 2}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: SPOTLIGHT_SIZE,
        height: SPOTLIGHT_SIZE,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.0) 70%)",
        mixBlendMode: "lighten",
        zIndex: 9999,
        transition: "left 0.08s linear, top 0.08s linear",
      }}
    />
  );
};

export default SpotlightCursor;
