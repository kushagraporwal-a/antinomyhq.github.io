import React from "react"
import {Banner, TheBenefits, BuiltFor, GetStarted, WhyForge} from "./sections"
// import {VerticalBadge} from "./components/VerticalBadge"

const HomePage = (): JSX.Element => {
  return (
    <div className="relative flex flex-col dark:bg-tailCall-dark-700 bg-[#F1F1F1]">
      <Banner />
      <GetStarted />
      <TheBenefits />
      <WhyForge />
      <BuiltFor />
      {/* <VerticalBadge
        icon={<span>P</span>}
        bgColor="#632F2F"
        rightOffset="-right-14"
        top="top-[170px]"
        title="Featured on"
        subtitle="Product Hunt"
      />
      <VerticalBadge
        icon={<img src="/icons/basic/GithubLogo.svg" alt="Github Logo" />}
        bgColor="#545454"
        rightOffset="-right-14"
        top="top-[340px]"
        title="Featured on"
        subtitle="Github"
      /> */}
      {/* <TheTeams /> */}
    </div>
  )
}

export default HomePage
