import React, {type ReactNode} from "react"
import {useNavbarMobileSidebar} from "@docusaurus/theme-common/internal"
import {translate} from "@docusaurus/Translate"
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle"
import IconClose from "@theme/Icon/Close"
import NavbarLogo from "@theme/Navbar/Logo"
import {X} from "lucide-react"

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar()
  return (
    <button
      type="button"
      aria-label={translate({
        id: "theme.docs.sidebar.closeSidebarButtonAriaLabel",
        message: "Close navigation bar",
        description: "The ARIA label for close button of mobile sidebar",
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}
    >
      <X className="text-black dark:text-white !h-5 !w-5" />
    </button>
  )
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  return (
    <div className="navbar-sidebar__brand dark:bg-black">
      <NavbarLogo />
      <NavbarColorModeToggle className="margin-right--md" />
      <CloseButton />
    </div>
  )
}
