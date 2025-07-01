import React from "react"

import Aside from "./Aside"
import Navbar from "../shared/Navbar."
import Banner from "./NewBanner"
import GetStarted from "./GetStarted"
import WhyForge from "./WhyForge"
import TheBenefits from "./TheBenefits"
import BuiltFor from "./BuiltFor"
import TheTeams from "./TheTeams"
import Footer from "./Footer"
import SpotlightCursor from "./SpotlightCursor"

const HomePage = (): JSX.Element => {
  return (
    <div className="relative flex flex-col bg-black">
      <SpotlightCursor />
      <Navbar />
      <Banner />
      <GetStarted />
      <WhyForge />
      <TheBenefits />
      <BuiltFor />
      <TheTeams />
      <Footer />
    </div>
  )
}

export default HomePage
