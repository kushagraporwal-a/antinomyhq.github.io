import React, {type ReactNode} from "react"
import {useDocsVersionCandidates} from "@docusaurus/plugin-content-docs/client"
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem"
import type {Props} from "@theme/NavbarItem/DocsVersionNavbarItem"
import type {GlobalVersion} from "@docusaurus/plugin-content-docs/client"

const getVersionMainDoc = (version: GlobalVersion) => version.docs.find((doc) => doc.id === version.mainDocId)!

export default function DocsVersionNavbarItem({
  label: staticLabel,
  to: staticTo,
  docsPluginId,
  ...props
}: Props): ReactNode {
  const version = useDocsVersionCandidates(docsPluginId)[0]
  const label = staticLabel ?? version.label
  const path = staticTo ?? getVersionMainDoc(version).path
  return <DefaultNavbarItem {...props} label={label} to={path} />
}
