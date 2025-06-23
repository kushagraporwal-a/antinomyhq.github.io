import React from "react"
import "./style.css"

const IntroductionGif: React.FC = () => {
  return (
    <div className="gif-wrapper py-16 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-title-large sm:text-display-tiny mb-4">See Forge in Action</h2>
        <p className="text-content-small sm:text-content-medium max-w-3xl mx-auto text-gray-600">
          Ask questions, request code implementations, solve bugs, and more – all without leaving your terminal.
        </p>
      </div>

      <div className="gif-container relative">
        {/* GIF Demo */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <img
            src={require("@site/static/images/home/introduction-animation.gif").default}
            alt="Code Forge Demonstration"
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default IntroductionGif
