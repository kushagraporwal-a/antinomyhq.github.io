import React, {useCallback, useMemo} from "react"
import {footerItems} from "@site/src/constants"
import FooterItem from "../shared/FooterItem"
import Link from "@docusaurus/Link"

// Types
interface SocialLink {
  name: string
  darkIcon: string
  lightIcon: string
  url: string
}

// Constants
const FOOTER_CLASSES = "relative flex xl:justify-center xl:items-center flex-col gap-14 px-6 py-10 z-10 bg-white dark:bg-black border-t-[1px] border-t-solid border-[#DDDDDD33] xl:px-10"

const FOOTER_ITEMS_CONTAINER_CLASSES = "grid grid-cols-2 sm:grid-cols-4 md:flex justify-between gap-5 flex-wrap xl:w-[1280px] xl:px-10"

const BOTTOM_SECTION_CLASSES = "flex flex-col md:flex-row items-start md:items-center gap-10 justify-between pt-5 xl:w-[1280px] xl:px-10"

const LOGO_CONTAINER_CLASSES = "flex items-center gap-5"

const COPYRIGHT_CLASSES = "text-tailCall-light-1000 dark:text-white font-kanit text-title-tiny font-[275]"

const SOCIAL_LINKS_CONTAINER_CLASSES = "flex gap-5"

const BOTTOM_BAR_CLASSES = "bg-tailCall-lightMode---primary-600 dark:bg-tailCall-lightMode---primary-400 h-2 w-full absolute left-0 bottom-0 z-50"

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "X (Twitter)",
    darkIcon: "/icons/basic/xlogo.svg",
    lightIcon: "/icons/basic/xlogo-light.svg",
    url: "https://x.com/forgecodehq"
  },
  {
    name: "Discord",
    darkIcon: "/icons/basic/DiscordLogo.svg",
    lightIcon: "/icons/basic/DiscordLogo-light.svg",
    url: "https://discord.com/invite/kRZBPpkgwq"
  },
  {
    name: "LinkedIn",
    darkIcon: "/icons/basic/linkedin.svg",
    lightIcon: "/icons/basic/linkedin-light.svg",
    url: "https://www.linkedin.com/company/forgecodehq"
  },
  {
    name: "GitHub",
    darkIcon: "/icons/basic/GithubLogo.svg",
    lightIcon: "/icons/basic/GithubLogo-light.svg",
    url: "https://github.com/antinomyhq/forge"
  }
]

// Components
const FooterItems: React.FC = () => (
  <div className={FOOTER_ITEMS_CONTAINER_CLASSES}>
    {footerItems.map(({items, title}) => (
      <FooterItem key={title} items={items} title={title} />
    ))}
  </div>
)

const Logo: React.FC = () => (
  <div className={LOGO_CONTAINER_CLASSES}>
    <Link href="/" aria-label="Go to homepage">
      <img
        src="/images/home/logo-light.svg"
        alt="Tailcall Logo"
        width={141}
        className="hidden dark:block cursor-pointer"
      />
      <img 
        src="/images/home/logo-dark.svg" 
        alt="Tailcall Logo" 
        width={141} 
        className="block dark:hidden cursor-pointer" 
      />
    </Link>
  </div>
)

const Copyright: React.FC = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  
  return (
    <span className={COPYRIGHT_CLASSES}>
      Copyright © {currentYear} Tailcall, Inc.
    </span>
  )
}

const SocialLink: React.FC<{link: SocialLink}> = ({link}) => {
  const handleClick = useCallback(() => {
    window.open(link.url, "_blank")
  }, [link.url])

  return (
    <>
      <img
        src={link.darkIcon}
        alt={link.name}
        className="hidden dark:block cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick()
          }
        }}
      />
      <img
        src={link.lightIcon}
        alt={link.name}
        className="dark:hidden block cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick()
          }
        }}
      />
    </>
  )
}

const SocialLinks: React.FC = () => (
  <div className={SOCIAL_LINKS_CONTAINER_CLASSES}>
    {SOCIAL_LINKS.map((link) => (
      <SocialLink key={link.name} link={link} />
    ))}
  </div>
)

const BottomBar: React.FC = () => (
  <div className={BOTTOM_BAR_CLASSES} />
)

// Main Component
const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={FOOTER_CLASSES}>
      <FooterItems />
      <div className={BOTTOM_SECTION_CLASSES}>
        <Logo />
        <Copyright />
        <SocialLinks />
      </div>
      <BottomBar />
    </footer>
  )
}

export default Footer
