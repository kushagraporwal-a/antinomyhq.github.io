import React from "react"
import Heading from "@theme/Heading"

import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {Theme} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"
import Section from "../shared/Section"
import {Star, Github} from "lucide-react"

const Banner = (): JSX.Element => {
  return (
    <main className="grid justify-center">
      <Section className="flex flex-col sm:items-center sm:text-center w-full !pb-0">
        <div className="h-full 2xl:min-h-0">
          <Heading
            as="h1"
            className="hero-banner-title text-title-large max-w-xs sm:text-display-small lg:text-display-large sm:max-w-5xl"
          >
            AI Pair Programmer in Your Terminal
          </Heading>
          <p className="hero-banner-sub-title sm:max-w-2xl sm:m-auto text-content-small sm:text-content-medium lg:text-content-large font-normal max-w-md sm:mt-SPACE_04 mb-0">
            Code • Refactor • Debug • Test • Documentation
            <br />
            <span className="text-sm text-gray-600 mt-2 block">Tap SOTA AI models with your personal Forge Key</span>
          </p>

          {/* Free Access Banner */}
          <div className="flex justify-center mt-6 mb-4">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-300 text-green-800 text-sm font-semibold rounded-full">
              🎉 FREE ACCESS - Limited Time Only!
            </div>
          </div>

          <div className="flex justify-center mt-4 mb-6">
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">500+</span> developers have claimed their Forge Key
            </div>
          </div>

          <div className="hidden sm:flex justify-center mt-SPACE_06 sm:mt-SPACE_10 space-x-SPACE_04 sm:space-x-SPACE_06">
            <LinkButton
              title="Get Early Access"
              href={pageLinks.signup}
              theme={Theme.Dark}
              width="medium"
              onClick={() => analyticsHandler("Home Page", "Click", "Get Early Access")}
            />
            <LinkButton
              title="Get Started"
              href={pageLinks.installation}
              theme={Theme.Light}
              width="small"
              onClick={() => analyticsHandler("Home Page", "Click", "Get Started")}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center">
              <a
                href="https://github.com/antinomyhq/forge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors duration-200 hover:no-underline"
                onClick={() => analyticsHandler("Home Page", "Click", "GitHub Badge")}
              >
                <Github size={16} />
                <Star size={16} className="text-yellow-500" />
                <span>3.6k on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

export default Banner
