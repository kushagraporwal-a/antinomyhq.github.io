import React, {useEffect, useRef, useState} from "react"
import TechCard from "../shared/TechCard"
import {TechDetails, TECHS} from "@site/src/constants"
import SpotlightSpan from "./SpotlightCursor"
import {ChevronDown, ChevronUp} from "lucide-react"

import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
const AUTO_SCROLL_INTERVAL = 2000 // 2 seconds

const TheTeams = (): JSX.Element => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardsContainerRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // Scroll the active card into view within the cards container (without scrolling the page)
  useEffect(() => {
    if (window.innerWidth < 1024) return

    const cards = cardsContainerRef.current
    const section = sectionRef.current
    if (!cards || !section) return

    // 1. Calculate how much scroll is needed
    const totalScroll = cards.scrollHeight - window.innerHeight * 0.6

    // 2. Set the section height = scroll distance + visible area
    section.style.height = `${window.innerHeight + totalScroll}px`

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        y: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: () => `+=${totalScroll}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleTechClick = (idx: number) => {
    if (window.innerWidth < 768) {
      setActiveIdx(activeIdx === idx ? null : idx)
    } else {
      setActiveIdx(idx)
    }
  }

  return (
    <div ref={sectionRef} className="flex justify-center z-[99] h-screen overflow-visible">
      <div className="max-w-[1440px] relative flex flex-col w-full xl:flex-row justify-between px-5 md:px-20 xl:px-24 xl:py-28">
        <div className="flex flex-col gap-32">
          <div className=" flex flex-col">
            <SpotlightSpan
              showHighlighted
              text="THE TEAMS"
              className="absolute top-3 font-bebas text-display-medium md:text-display-large xl:text-[140px] md:font-normal font-normal -tracking-normal xl:leading-[130px]"
            />
            <br />
            <SpotlightSpan
              text="AT WORK"
              className="absolute top-20 md:top-32 xl:top-36 font-bebas text-display-medium md:text-display-large xl:text-[140px] md:font-normal font-normal -tracking-normal xl:leading-[130px]"
            />
          </div>
          <ul className="hidden lg:flex pl-0 flex-row xl:flex-col list-none gap-6 font-kanit md:text-title-medium md:font-normal xl:font-normal xl:text-title-large font-normal text-white mt-28 xl:mt-10">
            {TECHS.map((tech, idx) => (
              <li
                key={tech}
                onClick={() => handleTechClick(idx)}
                className={`hover:opacity-100 cursor-pointer hover:text-tailCall-light-800 hover:dark:text-white transition-opacity duration-500 font-normal ${
                  idx === activeIdx
                    ? "text-tailCall-light-800 dark:text-white dark:!opacity-100"
                    : "text-tailCall-light-800 opacity-30 dark:text-[#737373]"
                }`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div
          ref={cardsContainerRef}
          className="hidden lg:h-[60vh] xl:h-auto lg:overflow-scroll lg:flex flex-col gap-10 xl:overflow-hidden"
        >
          {TechDetails.map(({title, descriptions, avatars}, idx) => (
            <div
              key={title}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`w-fit xl:w-[650px] odd:rotate-2 even:-rotate-2 hover:rotate-0 opacity-60 hover:opacity-100 transition-all duration-300`}
              style={{
                borderRadius: 16,
              }}
            >
              <TechCard title={title} description={descriptions} avatars={avatars} selected={idx === activeIdx} />
            </div>
          ))}
        </div>
        {/* Accordion for mobile only */}
        <div className="block lg:hidden mt-32 sm:mt-0">
          {TechDetails.map(({title, descriptions, avatars}, idx) => {
            const isOpen = activeIdx === idx
            return (
              <div key={title} className="mb-4 border border-gray-700 rounded overflow-hidden">
                <button
                  onClick={() => handleTechClick(idx)}
                  className="border-none w-full text-left px-4 py-3 bg-tailCall-lightMode---neutral-500 dark:bg-[#18171A] text-white font-semibold flex justify-between items-center"
                >
                  <span className={`font-kanit text-title-tiny ${isOpen ? "text-white" : "text-[#5D5D5D]"}`}>
                    {TECHS[idx]}
                  </span>
                  <span>{isOpen ? <ChevronUp /> : <ChevronDown className="text-[#5D5D5D]" />}</span>
                </button>
                {isOpen && (
                  <div className="bg-tailCall-lightMode---neutral-300 dark:bg-[#121212] px-4 py-4">
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
