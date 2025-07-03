import React, {CSSProperties, useRef} from "react"

interface SpotlightSpanProps {
  text: string
  className?: string
  style?: CSSProperties
  showHighlighted?: boolean
}

const SpotlightSpan: React.FC<SpotlightSpanProps> = ({text, className = "", style, showHighlighted = false}) => {
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const spotlightSize = 400

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const el = spanRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left - spotlightSize / 2
    const y = event.clientY - rect.top - spotlightSize / 2

    el.style.backgroundPosition = `${x}px ${y}px`
  }

  return (
    <span
      ref={spanRef}
      onMouseMove={handleMouseMove}
      className={`text-transparent bg-clip-text transition-all duration-0 ${className}`}
      style={{
        color: "hsla(0, 0%, 100%, 0.2)",
        backgroundImage: "radial-gradient(closest-side, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${spotlightSize}px ${spotlightSize}px`,
        backgroundPosition: showHighlighted ? "left" : "",
        ...style,
      }}
    >
      {text}
    </span>
  )
}

export default SpotlightSpan
