import React from "react"
import CopyCodeButton from "../shared/CopyCodeButton"
import {StatsForDevelopers} from "@site/src/constants"
import StatCard from "../shared/StatCard"
import SpotlightSpan from "./SpotlightCursor"

const BuiltFor = (): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1440px] z-30 mt-96 relative flex flex-col h-screen items-start lg:justify-center lg:items-center gap-10 md:gap-20 md:flex-row w-full p-5 md:px-20 lg:px-24 lg:py-28 overflow-hidden">
        <div className="flex flex-col md:gap-14 gap-5 items-start">
          {StatsForDevelopers.map(({title, stat}) => {
            return <StatCard title={title} stat={stat} key={title} />
          })}
        </div>
        <div className="w-full justify-center">

        <SpotlightSpan>
          <span
            className="font-bebas text-display-medium md:text-display-large md:font-normal xl:text-[120px] xl:font-normal font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal"
          >
            BUILT FOR BUILDERS,
          </span>

          </SpotlightSpan>
          <br />

          <SpotlightSpan>
          <span
            style={{display: "ruby-text"}}
            className="mt-5 font-bebas text-display-medium md:text-display-large md:font-normal xl:text-[120px] xl:font-normal font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal"
          >
            BACKED BY DATA
          </span>

          </SpotlightSpan>
          <div>
            <CopyCodeButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuiltFor
