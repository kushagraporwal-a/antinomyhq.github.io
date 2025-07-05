import React, {useState, useEffect, useRef} from "react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

import BenefitsCard from "../shared/BenefitsCard"
import {BENEFITS} from "@site/src/constants"
import SpotlightSpan from "./SpotlightCursor"
import clsx from "clsx"

gsap.registerPlugin(ScrollTrigger)
const VISIBLE_HEIGHT = 0.8 // 60% of viewport height
const HEADING_HEIGHT = 120

const TheBenefits = (): JSX.Element => {
  const [focusedIdx, setFocusedIdx] = useState(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || !cards) return

    // Calculate the scroll distance: total height of cards minus the visible area
    const isMobile = window.innerWidth < 768
    const visibleHeight = window.innerHeight * 0.6
    const cardHeight = cards.children[0]?.clientHeight || 1
    const gap = 32
    // Focus point: just before the center of the visible sticky area
    const focusPoint = (window.innerHeight - visibleHeight) / 2 + visibleHeight * 0.48
    const lastCardOffset = focusPoint - visibleHeight / 2 + cardHeight / 2
    // Pin duration: scroll until the last card's center reaches the focus point (no extra scroll)
    const totalScroll = cards.scrollHeight - visibleHeight + lastCardOffset

    // Set the height of the section to allow for the scroll hijack
    section.style.height = `${visibleHeight + totalScroll}px`

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        y: `-${totalScroll}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate the current y offset (negative)
            const y = gsap.getProperty(cards, "y") as number
            // Find the card whose center is closest to the focus point
            let minDist = Infinity
            let focusIdx = 0
            cardRefs.current.forEach((el, idx) => {
              if (!el) return
              // Get the card's center position relative to the viewport
              const rect = el.getBoundingClientRect()
              const cardCenter = rect.top + rect.height / 2
              const dist = Math.abs(cardCenter - focusPoint)
              if (dist < minDist) {
                minDist = dist
                focusIdx = idx
              }
            })
            setFocusedIdx(focusIdx)
          },
        },
      })

      gsap.to(".circle-logo", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert() // cleanup
  }, [])

  return (
    <div className="flex justify-center">
      <div
        ref={sectionRef}
        className="xl:max-w-[1440px] relative w-full h-[200vh] flex flex-col pt-10 z-10 xl:pt-60 overflow-hidden mb-40"
      >
        <div
          className="sticky top-0 flex flex-col items-center bg-[#F1F1F1] dark:bg-black"
          style={{
            height: `calc(${VISIBLE_HEIGHT * 100}vh + ${HEADING_HEIGHT}px)`,
            overflow: "visible",
            zIndex: 2,
          }}
        >
          <div className="relative">
            <img
              src="/images/home/circle-group.svg"
              alt="ellipse"
              className={clsx("circle-logo", "w-full h-screen dark:block hidden")}
            />
            <img
              src="/images/home/circle-group-light.svg"
              alt="ellipse"
              className={clsx("circle-logo", "w-full h-screen block dark:hidden")}
            />
            <img
              src="/images/home/code-logo.svg"
              alt="code"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <SpotlightSpan
            showHighlighted
            text="THE"
            className="absolute top-20 left-8 xl:left-28 font-bebas xl:leading-[133px] text-display-medium md:text-display-large xl:text-[142px] font-normal md:font-normal -tracking-normal"
          />
          <SpotlightSpan
            text="BENEFITS"
            className="absolute top-36 md:top-[10.5rem] md:left-28 xl:top-52 left-24 xl:left-60 xl:leading-[133px] font-bebas text-display-medium md:text-display-large xl:text-[142px] font-normal md:font-normal -tracking-normal"
          />
          <div
            className="absolute left-10 md:left-auto md:right-10 xl:left-[850px] w-auto right-10 lg:right-20 top-[500px] flex flex-col items-center"
            style={{height: "60vh", overflow: "visible"}} // set visible area
          >
            <div ref={cardsRef} className="flex flex-col gap-8">
              {BENEFITS.map(({title, description, imageUrl = ""}, idx) => (
                <div
                  key={title}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="transition-all duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
                  style={{
                    filter: idx === focusedIdx ? "none" : "blur(6px)",
                    opacity: idx === focusedIdx ? 1 : 0.6,
                    zIndex: idx === focusedIdx ? 10 : 1,
                  }}
                >
                  <BenefitsCard title={title} description={description} imageUrl={imageUrl} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheBenefits
