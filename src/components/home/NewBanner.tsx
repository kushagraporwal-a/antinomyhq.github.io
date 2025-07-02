import React from "react"
import TrustedByMarquee from "./TrustedByMarquee"
import {companies} from "@site/src/constants"
import TerminalWithTabs from "../shared/TerminalWithTabs"
import SpotlightSpan from "./SpotlightCursor"

const Banner = (): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1440px] relative p-10 xl:p-0 flex flex-col w-full h-screen overflow-auto">
        <div className="flex justify-around flex-col lg:flex-row gap-60">
          <div className="flex md:hidden lg:flex flex-col">
            <p className="text-white font-thin md:font-thin lg:font-thin text-title-medium lg:text-display-tiny opacity-80 max-w-[500px] md:mt-24 font-kanit">
              Forge is a non-intrusive light-weight AI assistant for - the terminal.
            </p>
            <div className="relative flex flex-col">
              <SpotlightSpan>
                <span className="-tracking-normal font-normal absolute -top-12 text-[75px] lg:text-[120px] xl:text-[180px] opacity-90 text-transparent bg-clip-text bg-[linear-gradient(280deg,_#fff_57.22%,_#373737_96.04%)] font-bebas">
                  AI PAIR PRO
                </span>
              </SpotlightSpan>
              <SpotlightSpan>
                <span className="-tracking-normal absolute top-10 lg:top-28 left-5 lg:left-0 text-[75px] lg:text-[120px] xl:text-[180px] opacity-90 text-transparent bg-clip-text bg-custom-radial-gradient font-bebas">
                  PROGRAMMER
                </span>
              </SpotlightSpan>
            </div>
          </div>
          <div className="relative hidden md:flex lg:hidden flex-col">
            <div className="relative flex flex-col">
              <span className="absolute -tracking-normal font-normal text-[118px] opacity-90 text-transparent bg-clip-text bg-[linear-gradient(280deg,_#fff_57.22%,_#373737_96.04%)] font-bebas">
                AI PAIR
              </span>
              <span className="absolute top-24 left-16 -tracking-normal text-[118px] opacity-90 text-transparent bg-clip-text bg-[linear-gradient(90deg,_#fff_57.22%,_#373737_96.04%)] font-bebas">
                PROGRAMMING
              </span>
            </div>
            <p className="absolute left-80 -top-20 text-white font-thin text-title-semi-large lg:text-display-tiny opacity-80 max-w-[500px] mt-24 font-kanit">
              Forge is a non-intrusive light-weight AI assistant for - the terminal.
            </p>
          </div>
          <div className="flex justify-center md:mt-5 lg:mt-10">
            <TerminalWithTabs />
          </div>
        </div>
        <div className="w-full px-10">
          <TrustedByMarquee title="Trusted by Engineers" logos={companies} isHorizontal />
        </div>
      </div>
    </div>
  )
}

export default Banner
