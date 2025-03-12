import React from "react"
import "./style.css"

const IntroductionGif: React.FC = () => {
  return (
    <div className="gif-wrapper">
      <div className="gif-container">
        <img
          src={require("@site/static/images/home/introduction-animation.gif").default}
          alt="Code Forge Demonstration"
          className="w-full h-full object-fill"
          loading="lazy"
          style={{ objectPosition: "center" }}
        />
      </div>
    </div>
  )
}

export default IntroductionGif