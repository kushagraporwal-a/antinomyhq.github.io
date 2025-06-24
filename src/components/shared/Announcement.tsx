import React from "react"

interface AnnouncementProps {
  text: string
  refLink?: string
  refText?: string
  variant?: "default" | "gradient"
}

const Announcement: React.FC<AnnouncementProps> = ({text, refLink, refText, variant = "default"}) => {
  const isGradient = variant === "gradient"

  return (
    <div
      className={`w-full h-auto flex items-center justify-center p-2 sm:p-3 ${
        isGradient ? "bg-black text-white" : "bg-black text-white"
      }`}
    >
      <div className="text-center">
        <span className={`text-sm sm:text-base md:text-lg font-bold ${isGradient ? "tracking-wide" : ""}`}>
          {text}
          {refLink && refText && (
            <a
              className={`font-bold ml-2 ${
                isGradient
                  ? "text-tailCall-white bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition hover:bg-white/20 hover:text-tailCall-yellow no-underline inline-block"
                  : "text-tailCall-yellow"
              }`}
              href={refLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {refText}
            </a>
          )}
        </span>
      </div>
    </div>
  )
}

export default Announcement
