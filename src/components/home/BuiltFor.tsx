import React from "react"
import CopyCodeButton from "../shared/CopyCodeButton"
import {StatsForDevelopers} from "@site/src/constants"
import StatCard from "../shared/StatCard"

const BuiltFor = (): JSX.Element => {
  return (
    <div className="relative flex flex-col items-start lg:justify-center lg:items-center gap-20 lg:flex-row w-full p-10 lg:px-24 lg:py-28 overflow-hidden">
      <img
        src="/images/home/circle-group.svg"
        alt="circle"
        className="hidden xl:block absolute -top-[30rem] overflow-hidden object-contain w-[800px] left-[20%] rotate-[350deg]"
      />
      <div className="flex flex-col items-start">
        {StatsForDevelopers.map(({title, stat}) => {
          return <StatCard title={title} stat={stat} key={title} />
        })}
      </div>
      <div className="relative w-full">
        <span
          className="font-bebas text-display-medium xl:text-display-large xl:font-normal font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal"
        >
          BUILT FOR BUILDERS,
        </span>
        <br />
        <span
          className="font-bebas text-display-medium xl:text-display-large xl:font-normal font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal"
        >
          BACKED BY DATA
        </span>
        <div className="">
          <CopyCodeButton />
        </div>
      </div>
    </div>
  )
}

export default BuiltFor
