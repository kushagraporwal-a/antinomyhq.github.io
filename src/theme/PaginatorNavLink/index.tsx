import React from "react"
import Link from "@docusaurus/Link"
import type {Props} from "@theme/PaginatorNavLink"
import ArrowLeft from "@site/static/icons/basic/circle-arrow-left.svg"
import ArrowRight from "@site/static/icons/basic/circle-arrow-right.svg"

function NavigatorIcon({isNext}: {isNext: boolean}): JSX.Element {
  return isNext ? <ArrowRight /> : <ArrowLeft />
}

export default function PaginatorNavLink(props: Props): JSX.Element {
  const {permalink, title, subLabel, isNext} = props
  return (
    <Link className="!no-underline flex gap-3 items-center" to={permalink}>
      {!isNext && <NavigatorIcon isNext={isNext!} />}
      <div className="hidden md:block">
        {subLabel && (
          <div
            className={`text-tailCall-dark-100 text-[12px] font-kanit font-medium ${!isNext ? "text-end" : "text-start"}`}
          >
            {subLabel}
          </div>
        )}
        <div className="pagination-nav__label text-tailCall-cyan font-kanit text-content-medium font-medium">
          {title}
        </div>
      </div>
      {isNext && <NavigatorIcon isNext={isNext} />}
    </Link>
  )
}
