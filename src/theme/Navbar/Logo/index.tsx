import React from "react"
import Link from "@docusaurus/Link"
import {useBaseUrlUtils} from "@docusaurus/useBaseUrl"
import {useThemeConfig} from "@docusaurus/theme-common"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import type {Props} from "@theme/Navbar/Logo"

export default function NavbarLogo({className, imageClassName}: Props): JSX.Element {
  const {
    navbar: {logo = {src: ""}},
  } = useThemeConfig()
  const {siteConfig} = useDocusaurusContext()
  const {withBaseUrl} = useBaseUrlUtils()

  return (
    <Link to="/" className={`navbar__brand ${className ?? ""}`} aria-label={siteConfig.title || "Forge"}>
      <div className="navbar__logo">
        <img
          src={withBaseUrl(logo.src)}
          alt={logo.alt || siteConfig.title}
          className={`navbar__logo ${imageClassName ?? ""}`}
          height={logo.height || 48}
          width={logo.width || 48}
        />
      </div>
    </Link>
  )
}
