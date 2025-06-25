import React from "react"
import Heading from "@theme/Heading"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import Link from "@docusaurus/Link"
import { clientLogos } from "@site/src/constants"
import Section from "../shared/Section"
import TrustedByMarquee from "./TrustedByMarquee"

const Configuration = (): JSX.Element => {
  return (
    <Section className="flex flex-col" innerClassName="xl:flex flex-col md:gap-10">
      <div className="flex flex-col justify-center gap-10 lg:flex-row">
      <div className="max-w-2xl">
        <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04">
          Get <span className="rounded-lg px-SPACE_02 bg-tailCall-yellow">Started</span>
        </Heading>
        <p className="text-content-small sm:text-content-medium mb-SPACE_06">
          Install Forge globally and get started in seconds.
        </p>
        <div className="mb-SPACE_06">
          <h5 className="font-semibold">Need help?</h5>
          <p className="text-content-small sm:text-content-medium mb-SPACE_11">
            Explore our <Link href="/docs">documentation</Link> to learn about Forge's powerful capabilities and how to
            leverage AI models in your development workflow.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Install Forge</h4>
        <pre className="md:min-w-[45rem] min-w-[100%] main-install-command">npx forgecode@latest</pre>
        <p className="text-content-tiny mt-4 text-gray-600">
          After installing, create a <code>.env</code> file in your home directory with your API key, then type{" "}
          <code>forge</code> in your terminal.
        </p>
      </div>
      </div>
      <div className="mt-5">
        <TrustedByMarquee title="Trusted by developers at" logos={clientLogos}/>
      </div>
    </Section>
  )
}

export default Configuration

const NPM_INSTALLATION = `npx forgecode@latest`
