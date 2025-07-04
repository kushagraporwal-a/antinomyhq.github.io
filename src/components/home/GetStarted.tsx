import React, {useEffect, useRef, useState} from "react"
import SpotlightSpan from "./SpotlightCursor"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import clsx from "clsx"

gsap.registerPlugin(ScrollTrigger)

const GetStarted = (): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false)
  const sectionRef = useRef(null)
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".get-started-text",
        {x: -1000, opacity: 0},
        {
          x: 10,
          opacity: 1,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: ".get-started-text",
            start: "top 70%",
            end: "bottom",
            toggleActions: "restart pause reverse pause", // play on enter, reverse on leave (optional)
          },
        },
      )
      gsap.fromTo(
        ".get-with-text",
        {x: -1000, opacity: 0},
        {
          x: 10,
          opacity: 1,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: ".get-with-text",
            start: "top 70%",
            end: "bottom",
            toggleActions: "restart pause reverse pause", // play on enter, reverse on leave (optional)
          },
        },
      )
      gsap.fromTo(
        ".get-terminal-text",
        {x: -1000, opacity: 0},
        {
          x: 30,
          opacity: 1,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: ".get-terminal-text",
            start: "top 70%",
            end: "bottom",
            toggleActions: "restart pause reverse pause", // play on enter, reverse on leave (optional)
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText("npm install -g @antinomyhq/forge")
    setIsCopied(true)
  }

  return (
    <div ref={sectionRef} className={clsx("flex justify-center", "get-started-section")}>
      <div className="relative max-w-[1440px] w-full p-5 md:px-20 xl:pt-28 xl:pl-28 xl:pr-24 xl:pb-20 h-screen">
        <div className="flex flex-col gap-3 relative">
          <SpotlightSpan
            showHighlighted
            text="GET STARTED"
            className={clsx(
              "absolute top-0 font-bebas text-[48px] md:text-[76px] xl:text-[140px] font-normal -tracking-normal",
              "get-started-text",
            )}
          />
          <SpotlightSpan
            text="with"
            className={clsx(
              " text-title-tiny xl:text-title-large xl:font-normal font-kanit absolute top-10 left-48 md:left-72 md:top-20 xl:top-28 xl:left-[560px]",
              "get-with-text",
            )}
          />
          <SpotlightSpan
            text="FORGE CODE"
            className="absolute top-14 left-[15%] md:top-20 xl:top-32 font-bebas text-[48px] md:text-[76px] xl:text-[140px] font-normal -tracking-normal"
          />
          <SpotlightSpan
            text="ON YOUR TERMINAL"
            className={clsx(
              "get-terminal-text",
              "absolute top-28 left-24 sm:left-40 md:top-40 xl:top-64 xl:left-[300px] font-bebas text-[48px] md:text-[76px] xl:text-[132px] font-normal -tracking-normal",
            )}
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 absolute top-60 md:top-80 xl:top-[600px] xl:left-[550px] min-w-fill md:w-fit xl:min-w-[700px] dark:bg-gradient-315 rounded-2xl p-[1px]">
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
                    className="text-tailCall-lightMode---primary-700 dark:text-tailCall-cyan h-5 w-5"
                    alt="Copy"
                  />
                ) : (
                  <img
                    src="/icons/basic/copy.svg"
                    alt="Copy"
                    className="h-5 w-5 text-tailCall-lightMode---primary-700 dark:text-tailCall-cyan"
                  />
                )}
              </button>
              <div className="pt-8 px-8 pb-4">
                <span className="text-tailCall-lightMode---primary-700 dark:text-[#30EDE6] font-space text-content-tiny md:text-content-small xl:text-title-small xl:font-normal font-normal md:font-normal -tracking-wide">
                  # Install Forge globally using npm
                </span>
                <br />
                <span className="text-tailCall-lightMode---primary-700 dark:text-[#30EDE6] mt-3 block font-space text-content-tiny md:text-content-small xl:text-title-small xl:font-normal font-normal md:font-normal -tracking-wide">
                  npm install -g @antinomyhq/forge
                </span>
              </div>
              <span className="text-white xl:text-[30px] inline-block w-auto xl:font-normal font-normal font-kanit absolute right-0 -top-10 xl:-top-14 xl:right-0">
                Install Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
