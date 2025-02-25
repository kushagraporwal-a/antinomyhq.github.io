import React from "react"

import Banner from "./Banner"
import Benefits from "./Benefits"
import Configuration from "./Configuration"
import IntroductionVideo from "./IntroductionVideo"
const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      <IntroductionVideo />
      <Benefits />
    </div>
  )
}

export default HomePage
