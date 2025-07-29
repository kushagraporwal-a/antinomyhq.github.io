import React from "react"
import {Banner, TheBenefits, BuiltFor, GetStarted, WhyForge} from "./sections"

const HomePage = (): JSX.Element => {
  return (
    <div className="relative flex flex-col dark:bg-tailCall-dark-700 bg-[#F1F1F1]">
      <Banner />
      <GetStarted />
      <TheBenefits />
      <WhyForge />
      <BuiltFor />
      {/* <FloatingWidget /> */}
      {/* <TheTeams /> */}
    </div>
  )
}

export default HomePage
