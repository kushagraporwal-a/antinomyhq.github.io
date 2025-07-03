import React, {CSSProperties, useEffect, useRef} from "react"

interface SpotlightSpanProps {
  text: string
  className?: string
  style?: CSSProperties
}

const SpotlightSpan: React.FC<SpotlightSpanProps> = ({text, className = "", style}) => {
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const spotlightSize = 400

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const el = spanRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = event.clientX - spotlightSize / 2 - rect.left
      const y = event.clientY - spotlightSize / 2 - rect.top

      el.style.backgroundPosition = `${x}px ${y}px`
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <span
      ref={spanRef}
      className={`text-transparent bg-clip-text transition-all duration-0 ${className}`}
      style={{
        color: "hsla(0, 0%, 100%, 0.2)",
        backgroundImage: "radial-gradient(closest-side, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "400px 400px",
        ...style,
      }}
    >
      {text}
    </span>
  )
}

export default SpotlightSpan
