import React from "react"

import Navbar from "../shared/Navbar."
import Banner from "./NewBanner"
import GetStarted from "./GetStarted"
import WhyForge from "./WhyForge"
import TheBenefits from "./TheBenefits"
import BuiltFor from "./BuiltFor"
import TheTeams from "./TheTeams"
import Footer from "./Footer"

const HomePage = (): JSX.Element => {
  return (
    <div className="relative flex flex-col bg-black">
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
