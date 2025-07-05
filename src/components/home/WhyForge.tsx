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
  const whyRef = useRef<HTMLDivElement | null>(null)
  const forgeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    const why = whyRef.current
    const forge = forgeRef.current

    if (!section || !cards || !why || !forge) return

    let ctx: gsap.Context | null = null

    function getViewportHeight() {
      return window.visualViewport?.height || window.innerHeight
    }

    function setupScrollTrigger() {
      if (!section || !cards || !why || !forge) return

      // Kill any existing animations
      gsap.killTweensOf([cards, why, forge])
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })

      const card = cards.querySelector("div")
      const cardStyle = card ? window.getComputedStyle(card) : null
      const cardWidth = card ? card.offsetWidth : 0
      const cardMarginRight = cardStyle ? parseInt(cardStyle.marginRight) : 0
      const gap = 24 // gap-6 = 24px
      const viewportWidth = window.innerWidth
      const viewportHeight = getViewportHeight()
      // Calculate total scroll distance to center the last card
      const totalCardsWidth = cards.scrollWidth
      const lastCardIndex = cardsData.length - 1
      const lastCardPosition = lastCardIndex * (cardWidth + gap)
      const centerOfViewport = viewportWidth / 2
      const cardCenter = cardWidth / 2
      const totalScroll = lastCardPosition + cardCenter - centerOfViewport

      ctx = gsap.context(() => {
        // Phase 1: Text fly in from left
        gsap.set([why, forge], {x: -viewportWidth})
        gsap.to([why, forge], {
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        })

        // Phase 2: Cards slide in from right
        gsap.set(cards, {x: viewportWidth})
        gsap.to(cards, {
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        })

        // Phase 3: Pin section and horizontal scroll
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          onUpdate: (self) => {
            // Move cards horizontally based on scroll progress
            const progress = self.progress
            const xOffset = -progress * totalScroll
            gsap.set(cards, {x: xOffset})
          },
        })
      }, section)
    }

    setupScrollTrigger()
    window.addEventListener("resize", setupScrollTrigger)
    window.addEventListener("orientationchange", setupScrollTrigger)
    window.addEventListener("resize", () => ScrollTrigger.refresh())
    window.addEventListener("orientationchange", () => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener("resize", setupScrollTrigger)
      window.removeEventListener("orientationchange", setupScrollTrigger)
      window.removeEventListener("resize", () => ScrollTrigger.refresh())
      window.removeEventListener("orientationchange", () => ScrollTrigger.refresh())
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <div className="flex justify-center">
      <div
        ref={sectionRef}
        className="max-w-[1440px] z-0 relative p-4 md:px-20 xl:pl-28 h-[500px] md:h-screen w-full overflow-hidden flex flex-col justify-center"
      >
        <div className="relative h-[1px]">
          <div ref={whyRef}>
            <SpotlightSpan
              showHighlighted
              text="WHY THEY LOVE"
              className="absolute -top-[70px] font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[142px] font-normal tracking-normal xl:leading-[130px]"
            />
          </div>
          <div ref={forgeRef}>
            <SpotlightSpan
              text="FORGE CODE"
              className="absolute -top-2 lg:top-4 xl:top-14 sm:top-[23px] md:top-4 left-[15%] font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[142px] font-normal -tracking-tight xl:leading-[130px]"
            />
          </div>
        </div>
        <div ref={cardsRef} className="flex gap-6 p-3 mt-10 md:mt-16 lg:mt-[4.4rem] xl:mt-[9.5rem]">
          {cardsData.map((card, idx) => {
            return (
              <Card key={idx}>
                <div
                  className={`px-8 py-8 rounded-xl min-w-[380px] max-w-[380px] border-[11px] border-tailCall-lightMode---neutral-50 dark:border-[#181D27] border-solid bg-tailCall-lightMode---neutral-200 dark:bg-transparent shadow-[0px_0px_4px_0px_#30EDE6] hover:cursor-pointer hover:bg-custom-radial-light hover:dark:bg-custom-radial hover:transition-colors hover:duration-500`}
                >
                  <div className="flex flex-col gap-3">
                    <img src={card.imageUrl} alt="Feedback" height={80} width={80} className="grayscale" />
                    <span className="text-tailCall-lightMode---neutral-700 dark:text-[#A1A1A1] font-kanit text-title-small font-light">
                      {card.title}
                    </span>
                    <span className="text-tailCall-light-500 dark:text-white opacity-50 text-title-tiny font-normal">
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
