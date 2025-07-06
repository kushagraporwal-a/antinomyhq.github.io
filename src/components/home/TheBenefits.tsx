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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    // Only run animation if not mobile and isMobile is known
    if (isMobile === undefined) return;
    if (isMobile) {
      // Clean up all ScrollTriggers and transforms on mobile
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (cardsRef.current) {
        gsap.set(cardsRef.current, { clearProps: "all" });
      }
      if (sectionRef.current) {
        sectionRef.current.style.height = '';
      }
      return;
    }
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;
    function getViewportHeight() {
      return window.visualViewport?.height || window.innerHeight;
    }
    function setupScrollTrigger() {
      if (!section || !cards) return;
      const isMobile = window.innerWidth < 768;
      const viewportHeight = getViewportHeight();
      const visibleHeight = isMobile ? viewportHeight * 0.8 : viewportHeight * 0.6;
      const cardHeight = cards.children[0]?.clientHeight || 1;
      const gap = 32;
      const focusPoint = (viewportHeight - visibleHeight) / 2 + visibleHeight * 0.48;
      const lastCardOffset = focusPoint - visibleHeight / 2 + cardHeight / 2;
      const extraScroll = isMobile ? visibleHeight * 0.8 : 0;
      const totalScroll = cards.scrollHeight - visibleHeight + lastCardOffset + extraScroll;
      section.style.height = `${visibleHeight + totalScroll}px`;
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
              const y = gsap.getProperty(cards, "y") as number;
              let minDist = Infinity;
              let focusIdx = 0;
              cardRefs.current.forEach((el, idx) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const dist = Math.abs(cardCenter - focusPoint);
                if (dist < minDist) {
                  minDist = dist;
                  focusIdx = idx;
                }
              });
              setFocusedIdx(focusIdx);
            },
          },
        });
        gsap.to(".circle-logo", {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: true,
          },
        });
      }, section);
    }
    setupScrollTrigger();
    window.addEventListener("resize", setupScrollTrigger);
    window.addEventListener("orientationchange", setupScrollTrigger);
    window.addEventListener("resize", () => ScrollTrigger.refresh());
    window.addEventListener("orientationchange", () => ScrollTrigger.refresh());
    return () => {
      window.removeEventListener("resize", setupScrollTrigger);
      window.removeEventListener("orientationchange", setupScrollTrigger);
      window.removeEventListener("resize", () => ScrollTrigger.refresh());
      window.removeEventListener("orientationchange", () => ScrollTrigger.refresh());
    };
  }, [isMobile]);

  return (
    <div className="flex justify-center">
      <div
        ref={sectionRef}
        className="xl:max-w-[1440px] relative w-full h-[100vh] flex flex-col pt-10 z-10 xl:pt-24 overflow-hidden mb-0 md:mb-40"
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
              "absolute left-10 md:left-auto md:right-10 xl:left-[850px] w-auto right-10 lg:right-20 top-[500px] flex flex-col items-center",
              "max-md:top-[52%]"
            )}
            style={{height: "100%", overflow: "visible"}} // set visible area
          >
            <div
              ref={cardsRef}
              className={clsx(
                isMobile
                  ? "flex flex-row w-full gap-6 overflow-x-auto items-stretch scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-full pr-2"
                  : "flex flex-col gap-8"
              )}
              style={isMobile ? {scrollbarWidth: 'thin', scrollbarColor: '#8888 #0000'} : {}}
            >
              {BENEFITS.map(({title, description, imageUrl = "", smallText}, idx) => (
                <div
                  key={title}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={clsx(
                    isMobile
                      ? "min-w-[320px] max-w-[320px] min-h-[320px] h-full flex-shrink-0 overflow-hidden flex flex-col"
                      : "transition-all duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
                  )}
                  style={
                    isMobile
                      ? {}
                      : {
                          filter: idx === focusedIdx ? "none" : "blur(6px)",
                          opacity: idx === focusedIdx ? 1 : 0.6,
                          zIndex: idx === focusedIdx ? 10 : 1,
                        }
                  }
                >
                  <div className="flex flex-col h-full">
                    <BenefitsCard
                      title={title}
                      description={description}
                      imageUrl={imageUrl}
                      small={smallText}
                    />
                  </div>
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
