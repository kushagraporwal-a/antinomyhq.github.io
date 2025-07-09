import React, {useState, useEffect, useRef} from "react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

import BenefitsCard from "../shared/BenefitsCard"
import {BENEFITS} from "@site/src/constants"
import SpotlightSpan from "./SpotlightCursor"
import clsx from "clsx"
import Carousel from "../shared/Carousel"

gsap.registerPlugin(ScrollTrigger)
const VISIBLE_HEIGHT = 0.8 // 60% of viewport height
const HEADING_HEIGHT = 120

const TheBenefits = (): JSX.Element => {
  const [focusedIdx, setFocusedIdx] = useState(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [activeDot, setActiveDot] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Create array with cloned items for infinite loop
  const extendedBenefits = [...BENEFITS.slice(-1), ...BENEFITS, ...BENEFITS.slice(0, 1)]

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Function to handle card transitions
  const moveToCard = (index: number, smooth = true, isDotClick = false) => {
    const cards = cardsRef.current
    if (!cards || isAnimating) return

    const cardNodes = Array.from(cards.querySelectorAll(":scope > div"))
    if (cardNodes.length === 0) return

    const cardWidth = (cardNodes[0] as HTMLElement).offsetWidth
    const gap = 24 // gap-6 = 24px
    const itemWidth = cardWidth + gap

    // Adjust index for cloned items (add 1 because we have one clone at the start)
    const adjustedIndex = index + 1
    const targetScroll = adjustedIndex * itemWidth

    setIsAnimating(true)

    if (smooth) {
      cards.style.transition = "transform 0.3s ease-out"
    } else {
      cards.style.transition = "none"
    }

    // Don't animate if it's a dot click
    cards.style.transform = `translateX(-${targetScroll}px)`

    // Handle the loop transition
    setTimeout(
      () => {
        setIsAnimating(false)

        // If we're at the cloned last card, jump to the real last card
        if (index >= BENEFITS.length) {
          cards.style.transition = "none"
          cards.style.transform = `translateX(-${itemWidth}px)` // Jump to first real card
          setActiveDot(0)
        }
        // If we're at the cloned first card, jump to the real first card
        else if (index < 0) {
          cards.style.transition = "none"
          cards.style.transform = `translateX(-${BENEFITS.length * itemWidth}px)` // Jump to last real card
          setActiveDot(BENEFITS.length - 1)
        } else {
          setActiveDot(index)
        }
      },
      smooth ? 300 : 0,
    )
  }

  // Initialize carousel position
  useEffect(() => {
    if (!cardsRef.current || !isMobile) return
    const cardWidth = cardsRef.current.querySelector(":scope > div")?.clientWidth || 0
    const gap = 24
    // Position at first real card (after the clone)
    cardsRef.current.style.transform = `translateX(-${cardWidth + gap}px)`
  }, [isMobile])

  // Handle manual scroll
  useEffect(() => {
    if (!isMobile) return
    const cards = cardsRef.current
    if (!cards) return

    let startX: number
    let currentTranslate = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      if (isAnimating) return
      isDragging = true
      startX = e.touches[0].clientX
      currentTranslate = getCurrentTranslate(cards)
      cards.style.transition = "none"
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      const currentX = e.touches[0].clientX
      const diff = startX - currentX
      cards.style.transform = `translateX(${-currentTranslate - diff}px)`
    }

    const handleTouchEnd = () => {
      if (!isDragging) return
      isDragging = false
      const currentX = getCurrentTranslate(cards)
      const cardWidth = cards.querySelector(":scope > div")?.clientWidth || 0
      const gap = 24
      const itemWidth = cardWidth + gap
      // Subtract 1 to account for the cloned item at start
      const index = Math.round(currentX / itemWidth) - 1
      moveToCard(index)
    }

    const getCurrentTranslate = (element: HTMLElement) => {
      const transform = window.getComputedStyle(element).transform
      const matrix = new DOMMatrix(transform)
      return -matrix.m41
    }

    cards.addEventListener("touchstart", handleTouchStart)
    cards.addEventListener("touchmove", handleTouchMove)
    cards.addEventListener("touchend", handleTouchEnd)

    return () => {
      cards.removeEventListener("touchstart", handleTouchStart)
      cards.removeEventListener("touchmove", handleTouchMove)
      cards.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isMobile, isAnimating])

  // Function to scroll to a specific card
  const scrollToCard = (index: number) => {
    moveToCard(index, true, true)
  }

  useEffect(() => {
    // Only run animation if not mobile and isMobile is known
    if (isMobile === undefined) return
    if (isMobile) {
      // Clean up all ScrollTriggers and transforms on mobile
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      if (cardsRef.current) {
        gsap.set(cardsRef.current, {clearProps: "all"})
      }
      if (sectionRef.current) {
        sectionRef.current.style.height = ""
      }
      return
    }
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return
    function getViewportHeight() {
      return window.visualViewport?.height || window.innerHeight
    }
    function setupScrollTrigger() {
      if (!section || !cards) return
      const isMobile = window.innerWidth < 768
      const viewportHeight = getViewportHeight()
      const visibleHeight = isMobile ? viewportHeight * 0.8 : viewportHeight * 0.6
      const cardHeight = cards.children[0]?.clientHeight || 1
      const gap = 32
      const focusPoint = (viewportHeight - visibleHeight) / 2 + visibleHeight * 0.48
      const lastCardOffset = focusPoint - visibleHeight / 2 + cardHeight / 2
      const extraScroll = isMobile ? visibleHeight * 0.8 : 0
      const totalScroll = cards.scrollHeight - visibleHeight + lastCardOffset + extraScroll
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
              const y = gsap.getProperty(cards, "y") as number
              let minDist = Infinity
              let focusIdx = 0
              cardRefs.current.forEach((el, idx) => {
                if (!el) return
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
            onLeave: () => {
              if (section) section.style.height = "100vh"
            },
            onLeaveBack: () => {
              if (section) section.style.height = "100vh"
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
    }
  }, [isMobile])

  // Mobile: Track scroll position to update active dot
  useEffect(() => {
    if (!isMobile) return
    const cards = cardsRef.current
    if (!cards) return

    const handleScroll = () => {
      const cardNodes = Array.from(cards.querySelectorAll(":scope > div"))
      if (cardNodes.length === 0) return
      const scrollLeft = cards.scrollLeft
      const cardWidth = (cardNodes[0] as HTMLElement).offsetWidth
      const gap = 24 // gap-6 = 24px
      // Calculate which card is most in view
      const idx = Math.round(scrollLeft / (cardWidth + gap))
      setActiveDot(Math.min(idx, cardNodes.length - 1))
    }
    cards.addEventListener("scroll", handleScroll)
    // Initial update
    handleScroll()
    return () => cards.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  return (
    <div className="flex justify-center">
      <div
        ref={sectionRef}
        className="xl:max-w-[1440px] relative w-full h-screen md:h-[120vh] flex flex-col pt-10 z-10 xl:pt-24 overflow-hidden mb-0 md:mb-40"
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
            className={clsx(
              "absolute md:left-auto md:right-10 xl:left-[850px] w-full md:w-auto lg:right-20 top-[500px] flex flex-col md:items-center",
              "max-md:top-[52%]",
            )}
            style={{height: "100%", overflow: "visible"}} // set visible area
          >
            {isMobile ? (
              <Carousel>
                {BENEFITS.map(({title, description, imageUrl = "", smallText}, idx) => (
                  <BenefitsCard title={title} description={description} imageUrl={imageUrl} small={smallText} />
                ))}
              </Carousel>
            ) : (
              <div ref={cardsRef} className="hidden md:flex flex-col gap-8">
                {BENEFITS.map(({title, description, imageUrl = "", smallText}, idx) => (
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
                    <div className="flex flex-col h-full">
                      <BenefitsCard title={title} description={description} imageUrl={imageUrl} small={smallText} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheBenefits
