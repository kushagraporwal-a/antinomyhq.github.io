import React, { useRef, useState } from "react";

const SPOTLIGHT_SIZE = 250; // Increased size

type SpotlightSpanProps = {
  children: React.ReactNode;
  className?: string;
};

const SpotlightSpan: React.FC<SpotlightSpanProps> = ({ children, className }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const animationFrame = useRef<number>();

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!spanRef.current || !spotlightRef.current) return;
    const rect = spanRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - SPOTLIGHT_SIZE / 2;
    const y = e.clientY - rect.top - SPOTLIGHT_SIZE / 2;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${x}px`;
        spotlightRef.current.style.top = `${y}px`;
      }
    });
  };

  return (
    <span
      ref={spanRef}
      className={`relative inline-block ${className || ""}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMouseMove}
      style={{ position: "relative" }}
    >
      {show && (
        <div
          ref={spotlightRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: SPOTLIGHT_SIZE,
            height: SPOTLIGHT_SIZE,
            pointerEvents: "none",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 60%, rgba(0,0,0,0.0) 85%)",
            mixBlendMode: "lighten",
            zIndex: 2,
            transition: "left 0.08s linear, top 0.08s linear",
            willChange: "left, top",
          }}
        />
      )}
      {children}
    </span>
  );
};

export default SpotlightSpan;