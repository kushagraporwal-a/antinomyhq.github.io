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
      className={`
        transition-all duration-200
        bg-clip-text text-transparent 
        dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_100%)]
        bg-[radial-gradient(closest-side,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%)]
        ${className}
      `}
      style={{
        backgroundSize: `${spotlightSize}px ${spotlightSize}px`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: showHighlighted ? "left center" : "",
        ...style,
      }}
    >
      {text}
    </span>
  )
}

export default SpotlightSpan
