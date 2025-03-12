import React from "react"

import Banner from "./Banner"
import Benefits from "./Benefits"
import Configuration from "./Configuration"
import IntroductionGif from "./IntroductionGif"
const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      <IntroductionGif />
      <Benefits />
    </div>
  )
}

export default HomePage
