import React from "react"
import Admonition from "@theme-original/Admonition"
import type AdmonitionType from "@theme-original/Admonition"
import type {WrapperProps} from "@docusaurus/types"

type Props = WrapperProps<typeof AdmonitionType>

export default function AdmonitionWrapper(props: Props): JSX.Element {
  return (
    <div className="custom-cards">
      <Admonition {...props} />
    </div>
  )
}
