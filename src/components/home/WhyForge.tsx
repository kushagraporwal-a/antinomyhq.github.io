import React, {useEffect, useRef} from "react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

import Card from "../shared/Card"
import SpotlightSpan from "./SpotlightCursor"

gsap.registerPlugin(ScrollTrigger)

const cardsData = [
  {
    imageUrl: "/images/home/people1.png",
    title: "Forge feels like pair programming with someone who actually understands my stack.",
    author: "Raj, Full-Stack Developer",
  },
  {
    imageUrl: "/images/home/people2.png",
    title: "Forge feels like pair programming with someone who actually understands my stack.",
    author: "Raj, Full-Stack Developer",
  },
  {
    imageUrl: "/images/home/people3.png",
    title: "Forge feels like pair programming with someone who actually understands my stack.",
    author: "Raj, Full-Stack Developer",
  },
  {
    imageUrl: "/images/home/people4.png",
    title: "Forge feels like pair programming with someone who actually understands my stack.",
    author: "Raj, Full-Stack Developer",
  },
  {
    imageUrl: "/images/home/people1.png",
    title: "Forge feels like pair programming with someone who actually understands my stack.",
    author: "Raj, Full-Stack Developer",
  },
  {
    imageUrl: "/images/home/people2.png",
    title: "Forge feels like pair programming with someone who actually understands my stack.",
    author: "Raj, Full-Stack Developer",
  },
]

const WhyForge = (): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || !cards) return

    let ctx: gsap.Context | null = null
    let scrollTriggerInstance: ScrollTrigger | null = null

    function setupScrollTrigger() {
      if (!section || !cards) return
      const card = cards.querySelector("div")
      const cardStyle = card ? window.getComputedStyle(card) : null
      const cardWidth = card ? card.offsetWidth : 0
      const cardMarginRight = cardStyle ? parseInt(cardStyle.marginRight) : 0
      const visibleScroll = cardWidth + cardMarginRight
      // Use the actual viewport width for mobile/tablet
      const viewportWidth = window.innerWidth
      const totalScroll = cards.scrollWidth - viewportWidth + visibleScroll
      // Set the height of the section to allow for the scroll hijack
      section.style.height = `${Math.max(window.innerHeight, totalScroll)}px`
      if (section && cards) {
        ctx = gsap.context(() => {
          gsap.killTweensOf(cards)
          gsap.set(cards, {x: 0})
          gsap.to(cards, {
            x: `-${totalScroll + visibleScroll}px`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 20%",
              end: () => `+=${totalScroll}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {},
            },
          })
        }, section)
      }
    }

    setupScrollTrigger()
    window.addEventListener("resize", setupScrollTrigger)

    return () => {
      window.removeEventListener("resize", setupScrollTrigger)
      if (ctx) ctx.revert()
    }
  }, [])
  return (
    <div className="flex justify-center">
      <div
        ref={sectionRef}
        className="max-w-[1440px] z-0 relative p-4 md:px-20 xl:pl-28 xl:pt-28 h-screen w-full overflow-hidden"
      >
        <div className="relative">
          <SpotlightSpan
            showHighlighted
            text="WHY THEY LOVE"
            className="absolute font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[142px] font-normal tracking-normal xl:leading-[130px]"
          />

          <SpotlightSpan
            text="FORGE CODE"
            className="absolute top-16 left-20 md:top-24 md:left-60 xl:top-32 xl:left-36 font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[142px] font-normal -tracking-tight xl:leading-[130px]"
          />
        </div>
        <div ref={cardsRef} className="flex absolute gap-6 top-40 md:top-72 p-3 xl:top-[320px]">
          {cardsData.map((card, idx) => {
            return (
              <Card key={idx}>
                <div
                  className={`px-8 py-8 rounded-xl min-w-[380px] max-w-[380px] border-[11px] border-tailCall-lightMode---neutral-50 dark:border-[#181D27] border-solid bg-tailCall-lightMode---neutral-200 dark:bg-transparent shadow-[0px_0px_4px_0px_#30EDE6] hover:cursor-pointer hover:bg-custom-radial hover:transition-colors hover:duration-500`}
                >
                  <div className="flex flex-col gap-3">
                    <img src={card.imageUrl} alt="Feedback" height={80} width={80} className="grayscale" />
                    <span className="text-tailCall-lightMode---neutral-700 dark:text-[#A1A1A1] font-kanit text-title-small font-light">
                      {card.title}
                    </span>
                    <span className="text-tailCall-light-800 dark:text-white opacity-50 text-title-tiny font-normal">
                      - {card.author}
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WhyForge
