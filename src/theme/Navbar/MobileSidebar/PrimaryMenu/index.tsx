import React from "react"
import {useThemeConfig} from "@docusaurus/theme-common"
import {useNavbarMobileSidebar} from "@docusaurus/theme-common/internal"
import NavbarItem, {type Props as NavbarItemConfig} from "@theme/NavbarItem"
import LoginButton from "@site/src/components/shared/LoginButton"

const useNavbarItems = () => {
  // TODO temporary casting until ThemeConfig type is improved (added by docusaurus)
  return useThemeConfig().navbar.items as NavbarItemConfig[]
}

// The primary menu displays the navbar items
const NavbarMobilePrimaryMenu = (): JSX.Element => {
  const mobileSidebar = useNavbarMobileSidebar()

  // TODO how can the order be defined for mobile? (added by docusaurus)
  // Should we allow providing a different list of items?
  const items = useNavbarItems()

  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        <NavbarItem mobile {...item} onClick={() => mobileSidebar.toggle()} key={i} />
      ))}
      <li className="menu__list-item">
        <LoginButton mobile />
      </li>
    </ul>
  )
}

export default NavbarMobilePrimaryMenu
