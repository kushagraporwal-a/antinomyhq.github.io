import React, {useEffect, useRef, useState} from "react"
import SpotlightSpan from "./SpotlightCursor"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import clsx from "clsx"

gsap.registerPlugin(ScrollTrigger)

const GetStarted = (): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)
  const getStartedRef = useRef(null)
  const withRef = useRef(null)
  const onTerminalRef = useRef(null)

  // Check if screen is mobile (below tablet breakpoint)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical tablet breakpoint
    }

    // Check on mount
    checkScreenSize()

    // Add resize listener
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isCopied) {
      interval = setInterval(() => setIsCopied(false), 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isCopied])

  useEffect(() => {
    // Only run animations on tablet and desktop (not mobile)
    if (isMobile) return

    const section = sectionRef.current
    const getStarted = getStartedRef.current
    const withEl = withRef.current
    const onTerminal = onTerminalRef.current
    if (!section || !getStarted || !withEl || !onTerminal) return

    const leftStart = -window.innerWidth
    const leftEnd = window.innerWidth
    const rightStart = window.innerWidth
    const rightEnd = -window.innerWidth

    const ctx = gsap.context(() => {
      // Set initial positions
      gsap.set([getStarted, withEl], {x: leftStart})
      gsap.set([onTerminal], {x: rightStart})

      // Animate left group: from left edge, through center, to right edge
      gsap.to([getStarted, withEl], {
        x: leftEnd,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Animate right group: from right edge, through center, to left edge
      gsap.to([onTerminal], {
        x: rightEnd,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile]) // Re-run when isMobile changes

  const handleCopy = async () => {
    await navigator.clipboard.writeText("npm install -g @antinomyhq/forge")
    setIsCopied(true)
  }

  return (
    <div ref={sectionRef} className={clsx("flex justify-center items-center overflow-x-hidden", "get-started-section")}>
      <div className="relative max-w-[1440px] w-full px-5 pt-20 md:px-20 lg:pt-20 xl:pt-28 xl:pl-28 xl:pr-24 xl:pb-20 h-[600px] md:h-screen">
        <div className="flex flex-col gap-3 relative">
          <div ref={getStartedRef}>
            <SpotlightSpan
              showHighlighted
              text="GET STARTED"
              className={clsx(
                "absolute top-2 font-bebas text-[64px] md:text-[76px] xl:text-[140px] font-normal -tracking-normal",
                "max-[390px]:text-[64px]",
                "max-[320px]:text-[45px]",
              )}
            />
          </div>
          <div ref={withRef}>
            <SpotlightSpan
              text="with"
              className={clsx(
                "text-title-tiny xl:text-title-large xl:font-normal font-kanit absolute top-14 left-48 md:top-20 md:left-72 xl:top-28 xl:left-[560px]",
                "max-[390px]:left-[75%]",
                "max-[320px]:left-[63%]",
                "max-[425px]:left-[68%]",
              )}
            />
          </div>
          <SpotlightSpan
            text="FORGE CODE"
            className={clsx(
              "absolute top-16 left-[15%] md:top-20 xl:top-32 font-bebas text-[64px] md:text-[76px] xl:text-[140px] font-normal -tracking-normal",
              "max-[390px]:text-[64px]",
              "max-[320px]:text-[45px]",
            )}
          />
          <div ref={onTerminalRef}>
            <SpotlightSpan
              text="ON YOUR TERMINAL"
              className={clsx(
                "absolute top-20 left-0 sm:left-40 md:top-32 xl:top-56 xl:left-[300px] font-bebas text-[60px] md:text-[76px] xl:text-[132px] font-normal -tracking-normal",
                // Mobile-specific positioning (below 768px)
                "max-md:top-[125px] max-md:left-[0%]",
                // Extra spacing for very small screens when text wraps
                "max-[300px]:top-[120px]",
                // Font size for very small screens
                "max-[390px]:text-[58px]",
                "max-[320px]:text-[45px]",
                "max-[425px]:text-[64px]",
              )}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 absolute top-80 md:top-96 lg:top-96 xl:top-[600px] xl:left-[550px] min-w-fill md:w-fit xl:min-w-[700px] dark:bg-gradient-315 rounded-2xl p-[1px]">
            <div className="bg-tailCall-lightMode---neutral-200 dark:bg-[#1E1C21] flex flex-col rounded-2xl relative">
              <div className="flex items-center gap-1 px-4 py-3 bg-tailCall-lightMode---neutral-300 dark:bg-[#18171A] rounded-t-2xl">
                <div className="h-4 w-4 bg-tailCall-lightMode---neutral-600 dark:bg-[#D9D9D9] rounded-full opacity-50"></div>
                <div className="h-4 w-4 bg-tailCall-lightMode---neutral-600 dark:bg-[#D9D9D9] rounded-full opacity-20"></div>
                <div className="h-4 w-4 bg-tailCall-lightMode---neutral-600 dark:bg-[#D9D9D9] rounded-full opacity-10"></div>
              </div>
              <button onClick={handleCopy} className="absolute right-2 top-2 border-none bg-transparent cursor-pointer">
                {isCopied ? (
                  <img
                    src="/icons/basic/copy-done.svg"
                    className="text-tailCall-lightMode---primary-600 dark:text-tailCall-cyan h-5 w-5"
                    alt="Copy"
                  />
                ) : (
                  <img
                    src="/icons/basic/copy.svg"
                    alt="Copy"
                    className="h-5 w-5 text-tailCall-lightMode---primary-600 dark:text-tailCall-cyan"
                  />
                )}
              </button>
              <div className="pt-4 px-3 pb-2 md:pt-6 md:px-8 md:pb-4 lg:pt-8 lg:px-12 lg:pb-6 xl:pt-12 xl:px-16 xl:pb-8">
                <span className="text-tailCall-lightMode---primary-600 dark:text-[#30EDE6] font-space text-content-tiny md:text-content-small xl:text-title-small xl:font-normal font-normal md:font-normal -tracking-wide">
                  # Install Forge globally using npm
                </span>
                <br />
                <span className="text-tailCall-lightMode---primary-600 dark:text-[#30EDE6] block font-space text-content-tiny md:text-content-small xl:text-title-small xl:font-normal font-normal md:font-normal -tracking-wide">
                  npx forgecode@latest
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
