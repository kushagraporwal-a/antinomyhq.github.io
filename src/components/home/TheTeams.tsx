import React, {useEffect, useRef, useState} from "react"
import TechCard from "../shared/TechCard"
import {TechDetails, TECHS} from "@site/src/constants"
import SpotlightSpan from "./SpotlightCursor"
import {ChevronDown, ChevronUp} from "lucide-react"

const AUTO_SCROLL_INTERVAL = 2000 // 2 seconds

const TheTeams = (): JSX.Element => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardsContainerRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (window.innerWidth < 768) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev === null) return 0
        return (prev + 1) % TECHS.length
      })
    }, AUTO_SCROLL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  // Scroll the active card into view within the cards container (without scrolling the page)
  useEffect(() => {
    if (window.innerWidth < 768) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev === null) return 0
        return (prev + 1) % TECHS.length
      })
    }, 2000)

    if (activeIdx === null) return
    const card = cardRefs.current[activeIdx]
    const container = cardsContainerRef.current
    if (card && container) {
      const cardTop = card.offsetTop
      const cardHeight = card.offsetHeight
      const containerHeight = container.offsetHeight
      const scrollTo = cardTop - containerHeight / 2 + cardHeight / 2
      container.scrollTo({top: scrollTo, behavior: "smooth"})
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeIdx])

  const handleTechClick = (idx: number) => {
    if (window.innerWidth < 768) {
      setActiveIdx(activeIdx === idx ? null : idx)
    } else {
      setActiveIdx(idx)
    }
  }

  return (
    <div className="flex justify-center z-[99]">
      <div className="max-w-[1440px] relative flex flex-col h-screen w-full xl:flex-row justify-between px-5 md:px-20 xl:px-24 xl:py-28">
        <div className="flex flex-col gap-32">
          <div className=" flex flex-col">
            <SpotlightSpan
              text="THE TEAMS"
              className="absolute top-3 font-bebas text-display-medium md:text-display-large xl:text-[140px] md:font-normal font-normal -tracking-normal xl:leading-[130px]"
            />
            <br />
            <SpotlightSpan
              text="AT WORK"
              className="absolute top-20 md:top-32 xl:top-36 font-bebas text-display-medium md:text-display-large xl:text-[140px] md:font-normal font-normal -tracking-normal xl:leading-[130px]"
            />
          </div>
          <ul className="hidden md:flex pl-0 flex-row xl:flex-col list-none gap-6 font-kanit md:text-title-medium md:font-normal xl:font-normal xl:text-title-large font-normal text-white mt-28 xl:mt-10">
            {TECHS.map((tech, idx) => (
              <li
                key={tech}
                onClick={() => handleTechClick(idx)}
                className={`opacity-30 hover:opacity-100 cursor-pointer transition-opacity duration-500 ${
                  idx === activeIdx ? "text-white !opacity-100 font-bold scale-105" : "text-[#a1a1a1]"
                }`}
                style={{
                  fontWeight: idx === activeIdx ? 700 : undefined,
                }}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div ref={cardsContainerRef} className="hidden md:flex flex-col gap-10 overflow-y-auto h-[60vh] scroll-smooth">
          {TechDetails.map(({title, descriptions, avatars}, idx) => (
            <div
              key={title}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`w-fit xl:w-[650px] odd:rotate-2 even:-rotate-2 hover:rotate-0 transition-all duration-300 ${idx === activeIdx ? "z-10" : "opacity-60"}`}
              style={{
                borderRadius: 16,
              }}
            >
              <TechCard title={title} description={descriptions} avatars={avatars} selected={idx === activeIdx} />
            </div>
          ))}
        </div>
        {/* Accordion for mobile only */}
        <div className="block md:hidden">
          {TechDetails.map(({title, descriptions, avatars}, idx) => {
            const isOpen = activeIdx === idx
            return (
              <div key={title} className="mb-4 border border-gray-700 rounded overflow-hidden">
                <button
                  onClick={() => handleTechClick(idx)}
                  className="border-none w-full text-left px-4 py-3 bg-[#18171A] text-white font-semibold flex justify-between items-center"
                >
                  <span className={`font-kanit text-title-tiny ${isOpen ? "text-white" : "text-[#5D5D5D]"}`}>
                    {TECHS[idx]}
                  </span>
                  <span>{isOpen ? <ChevronUp /> : <ChevronDown className="text-[#5D5D5D]" />}</span>
                </button>
                {isOpen && (
                  <div className="bg-[#121212] px-4 py-4">
                    <TechCard title={title} description={descriptions} avatars={avatars} selected={true} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TheTeams
