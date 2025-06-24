import React from "react"
import Heading from "@theme/Heading"
import LinkButton from "../shared/LinkButton"
import {Theme} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"
import Section from "../shared/Section"
import {analyticsHandler} from "@site/src/utils"

interface FinalCTAProps {
  showPricingButton?: boolean
}

const FinalCTA = ({showPricingButton = true}: FinalCTAProps): JSX.Element => {
  return (
    <Section className="bg-gradient-to-r from-tailCall-dark-600 to-tailCall-dark-500 grid-background text-center py-16 text-tailCall-white">
      <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-8">
        Ready to Get Started?
      </Heading>
      <p className="text-content-medium max-w-2xl mx-auto mb-4">
        Join thousands of developers already using ForgeCode. Start free today.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <LinkButton
          title="Sign Up"
          href={pageLinks.signup}
          theme={Theme.Gray}
          width="small"
          onClick={() => analyticsHandler("Home Page", "Click", "Final CTA - Get Early Access")}
        />
        {showPricingButton && (
          <LinkButton
            title="View Pricing"
            href={pageLinks.pricing}
            theme={Theme.Gray}
            width="small"
            onClick={() => analyticsHandler("Home Page", "Click", "Final CTA - View Pricing")}
          />
        )}
      </div>
    </Section>
  )
}

export default FinalCTA
