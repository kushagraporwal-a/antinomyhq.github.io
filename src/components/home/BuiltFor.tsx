import React from "react"
import CopyCodeButton from "../shared/CopyCodeButton"
import {StatsForDevelopers} from "@site/src/constants"
import StatCard from "../shared/StatCard"
import SpotlightSpan from "./SpotlightCursor"

const BuiltFor = (): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1440px] z-30 mt-28 relative flex flex-col h-screen items-start lg:justify-center lg:items-center gap-10 md:gap-20 md:flex-row w-full p-5 md:px-20 lg:px-32 lg:py-28 overflow-hidden">
        <div className="flex flex-col md:gap-14 gap-5 items-start">
          {StatsForDevelopers.map(({title, stat, suffix, decimals}) => {
            return <StatCard title={title} stat={stat} suffix={suffix} key={title} decimals={decimals} />
          })}
        </div>
        <div className="w-full flex flex-col items-baseline justify-center xl:pb-36">
          <SpotlightSpan
            showHighlighted
            text="BUILT FOR BUILDERS,"
            className="font-bebas text-display-medium md:text-display-large md:font-normal xl:text-[120px] xl:font-normal font-normal -tracking-normal leading-[60px] md:leading-[90px] xl:leading-[140px]"
          />
          <br />

          <SpotlightSpan
            text="BACKED BY DATA"
            style={{display: "ruby-text"}}
            className="-mt-8 md:-mt-6 xl:-mt-14 font-bebas text-display-medium md:text-display-large md:font-normal xl:text-[120px] xl:font-normal font-normal -tracking-normal md:leading-[90px] xl:leading-[140px]"
          />

          <div className="xl:mt-2">
            <CopyCodeButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuiltFor
