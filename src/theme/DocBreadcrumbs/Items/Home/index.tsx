import React from "react"
import Link from "@docusaurus/Link"
import useBaseUrl from "@docusaurus/useBaseUrl"
import {translate} from "@docusaurus/Translate"
import IconHome from "@theme/Icon/Home"

import styles from "./styles.module.css"

export default function HomeBreadcrumbItem(): JSX.Element {
  const homeHref = useBaseUrl("/")

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: "theme.docs.breadcrumbs.home",
          message: "Home page",
          description: "The ARIA label for the home page in the breadcrumbs",
        })}
        className="breadcrumbs__link text-tailCall-lightMode---neutral-500 dark:text-tailCall-darkMode---neutral-500"
        href={homeHref}
      >
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  )
}
