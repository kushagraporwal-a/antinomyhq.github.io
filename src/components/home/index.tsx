import React from "react"

import Aside from "./Aside"
import Navbar from "../shared/Navbar."
import Banner from "./NewBanner"
import GetStarted from "./GetStarted"
import WhyForge from "./WhyForge"

const HomePage = (): JSX.Element => {
  return (
    <div className="flex h-screen bg-black">
      <Aside />
      <div className="overflow-auto w-full">
        <Navbar />
        <Banner />
        <GetStarted />
        <WhyForge />
      </div>
    </div>
  )
}

export default HomePage
