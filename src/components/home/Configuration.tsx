import React from "react"
import Heading from "@theme/Heading"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import Link from "@docusaurus/Link"
import Section from "../shared/Section"

const Configuration = (): JSX.Element => {
  return (
    <Section className="flex flex-col lg:flex-row justify-center gap-10" innerClassName="xl:flex md:gap-10">
      <div className="max-w-2xl">
        <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04">
          Get <span className="rounded-lg px-SPACE_02 bg-tailCall-yellow">Started</span>
        </Heading>
        <p className="text-content-small sm:text-content-medium mb-SPACE_11">TODO</p>
        <div>
          <h5>More</h5>
          <p className="text-content-small sm:text-content-medium mb-SPACE_11">
            To dive deeper into Code Forge checkout our <Link href="/docs">docs</Link>
          </p>
        </div>
      </div>
      <div>{CodeTabItem({code: INSTALLATION, language: "bash", showLineNumbers: false})}</div>
    </Section>
  )
}

const CodeTabItem = ({
  code,
  language,
  showLineNumbers,
}: {
  code: string
  language: "bash" | "json" | "yaml" | "graphql"
}) => (
  <TabItem value={language} label={language}>
    <CodeBlock
      language={language}
      showLineNumbers={showLineNumbers}
      className="overflow-y-auto md:min-w-[45rem] min-w-[100%]"
    >
      {code}
    </CodeBlock>
  </TabItem>
)

export default Configuration
const INSTALLATION = `brew tap antinomyhq/code-forge
brew install code-forge
`
