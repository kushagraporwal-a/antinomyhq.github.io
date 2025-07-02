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
import { ThemeProvider } from "../../theme/ThemeProvider/ThemeProvider";

const HomePage = (): JSX.Element => {
  return (
    <ThemeProvider>
      <div className="relative flex flex-col bg-tailCall-light-900 dark:bg-tailCall-dark-700">
        <Navbar />
        <Banner />
        <GetStarted />
        <WhyForge />
        <TheBenefits />
        <BuiltFor />
        <TheTeams />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default HomePage
