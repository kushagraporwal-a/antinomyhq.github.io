import React, {type ReactNode} from "react"
import clsx from "clsx"

import type {Props} from "@theme/NavbarItem/HtmlNavbarItem"

export default function HtmlNavbarItem({value, className, mobile = false, isDropdownItem = false}: Props): ReactNode {
  const Comp = isDropdownItem ? "li" : "div"
  return (
    <Comp
      className={clsx(
        {
          navbar__item: !mobile && !isDropdownItem,
          "menu__list-item": mobile,
        },
        className,
      )}
      dangerouslySetInnerHTML={{__html: value}}
    />
  )
}
