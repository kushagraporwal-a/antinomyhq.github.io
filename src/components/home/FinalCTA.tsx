import React from "react"
import Heading from "@theme/Heading"
import LinkButton from "../shared/LinkButton"
import {Theme} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"
import Section from "../shared/Section"
import {analyticsHandler} from "@site/src/utils"

const FinalCTA = (): JSX.Element => {
  return (
    <Section className="bg-tailCall-dark-600 text-white text-center py-16">
      <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-8">
        Need a CLI Coding Co-pilot?
      </Heading>
      <p className="text-content-medium max-w-2xl mx-auto mb-4">
        Get ForgeCode free while it lasts. Early-access invite – join free today and keep your plan forever.
      </p>
      <p className="text-sm text-gray-300 max-w-xl mx-auto mb-10">
        Transform your development workflow with AI assistance that respects your privacy and integrates seamlessly with
        your terminal.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <LinkButton
          title="Sign Up"
          href={pageLinks.signup}
          theme={Theme.Gray}
          width="small"
          onClick={() => analyticsHandler("Home Page", "Click", "Final CTA - Get Early Access")}
        />
        <LinkButton
          title="View Pricing"
          href={pageLinks.pricing}
          theme={Theme.Gray}
          width="small"
          onClick={() => analyticsHandler("Home Page", "Click", "Final CTA - View Pricing")}
        />
      </div>
    </Section>
  )
}

export default FinalCTA
