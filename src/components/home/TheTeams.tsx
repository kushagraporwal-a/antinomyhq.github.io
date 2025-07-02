import React, { useEffect, useRef, useState } from "react"
import CopyCodeButton from "../shared/CopyCodeButton"
import TechCard from "../shared/TechCard"
import { TechDetails, TECHS } from "@site/src/constants"

const AUTO_SCROLL_INTERVAL = 2000 // 2 seconds

const TheTeams = (): JSX.Element => {
  const [activeIdx, setActiveIdx] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardsContainerRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  console.log(activeIdx)

  // Auto-advance the highlight and scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TECHS.length)
    }, AUTO_SCROLL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  // Scroll the active card into view within the cards container (without scrolling the page)
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TECHS.length)
    }, 2000)

    const card = cardRefs.current[activeIdx]
    const container = cardsContainerRef.current
    if (card && container) {
      const cardTop = card.offsetTop
      const cardHeight = card.offsetHeight
      const containerHeight = container.offsetHeight
      const scrollTo = cardTop - containerHeight / 2 + cardHeight / 2
      container.scrollTo({ top: scrollTo, behavior: "smooth" })
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeIdx])

  const handleTechClick = (idx: number) => {
    setActiveIdx(idx)
    // The interval will reset due to the dependency on activeIdx
  }

  return (
    <div className="flex justify-center z-[99]">
      <div className="max-w-[1440px] relative flex flex-col h-screen w-full xl:flex-row justify-between px-5 md:px-20 xl:px-24 xl:py-28">
        <div className="flex flex-col gap-24">
          <div className=" flex flex-col">
            <span
              className="absolute top-3 font-bebas text-display-medium md:text-display-large xl:text-[140px] md:font-normal font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal xl:leading-[130px]"
            >
              THE TEAMS
            </span>
            <br />
            <span
              className="absolute top-32 font-bebas text-display-medium md:text-display-large xl:text-[140px] md:font-normal font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal xl:leading-[130px]"
            >
              AT WORK
            </span>
          </div>
          <ul className="flex pl-0 flex-row xl:flex-col list-none gap-6 font-kanit md:text-title-medium md:font-normal xl:font-normal xl:text-title-large font-normal dark:text-white mt-40">
            {TECHS.map((tech, idx) => (
              <li
                key={tech}
                onClick={() => handleTechClick(idx)}
                className={`opacity-30 hover:opacity-100 cursor-pointer transition-opacity duration-500 ${idx === activeIdx ? "!opacity-100 font-bold scale-105" : ""
                  } ${idx === activeIdx ? 'font-bold' : 'font-normal'}
  text-tailCall-text-gray-200 dark:text-tailCall-white`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div ref={cardsContainerRef} className="flex flex-col gap-10 overflow-y-auto h-[60vh] scroll-smooth">
          {TechDetails.map(({ title, descriptions, avatars }, idx) => (
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
      </div>
    </div>
  )
}

export default TheTeams
