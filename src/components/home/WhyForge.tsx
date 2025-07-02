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

    const card = cards.querySelector("div")
    const cardStyle = card ? window.getComputedStyle(card) : null
    const cardWidth = card ? card.offsetWidth : 0
    const cardMarginRight = cardStyle ? parseInt(cardStyle.marginRight) : 0
    const visibleScroll = cardWidth + cardMarginRight

    const totalScroll = cards.scrollWidth - window.innerWidth + visibleScroll

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        x: `-${totalScroll + visibleScroll}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert() // cleanup
  }, [])
  return (
    <div className="flex justify-center">
      <div
        ref={sectionRef}
        className="max-w-[1440px] z-0 relative p-4 md:px-20 xl:pl-28 xl:pt-28 h-screen w-full overflow-hidden"
      >
        <div className="relative">
          <SpotlightSpan
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
                  className={`px-8 py-8 rounded-xl min-w-[380px] max-w-[380px] border-[11px] border-[#181D27] border-solid bg-transparent shadow-[0px_0px_4px_0px_#30EDE6] hover:cursor-pointer hover:bg-custom-radial hover:transition-colors hover:duration-500`}
                >
                  <div className="flex flex-col gap-3">
                    <img src={card.imageUrl} alt="Feedback" height={80} width={80} className="grayscale" />
                    <span className="text-[#A1A1A1] font-kanit text-title-small font-light">{card.title}</span>
                    <span className="text-white opacity-50 text-title-tiny font-normal">- {card.author}</span>
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
