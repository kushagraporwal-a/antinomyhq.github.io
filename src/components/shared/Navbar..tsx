import React, {useEffect, useState} from "react"
import Button from "./Button"
import {NavbarItems} from "@site/src/constants"
import {Flame, Menu, X} from "lucide-react"
import Link from "@docusaurus/Link"
import {useLocation} from "@docusaurus/router"
import {useWindowSize} from "@docusaurus/theme-common"
import ThemeToggle from "../home/ThemeToggle"

const NewNavbar = (): JSX.Element => {
  const [showNavbar, setShowNavbar] = useState(false)
  const location = useLocation()
  const windowSize = useWindowSize()

  useEffect(() => {
    if (windowSize === "desktop") {
      setShowNavbar(false)
    }
  }, [windowSize])

  return (
    <nav className={`fixed top-0 left-0 z-[999] border-b border-b-solid backdrop-blur-md bg-tailCall-lightMode---neutral-50 dark:bg-tailCall-darkMode---neutral-900 border-[#171717] p-5 w-full ${location.pathname!== "/" ? "bg-[radial-gradient(40.27%_100.55%_at_50%_100%,_rgba(48,237,230,0.5)_0%,_rgba(0,0,0,0)_100%)]" : ""}`}>
      {showNavbar ? (
        <div className="h-screen bg-tailCall-lightMode---neutral-50 dark:bg-tailCall-darkMode---neutral-900 z-[998] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center justify-center">
              <img src="/images/home/logo-light.svg" alt="Logo" width={141} className="dark:block hidden" />
              <img src="/images/home/logo-dark.svg" alt="Logo" width={141} className="flex dark:hidden" />
            </Link>
            <button
              onClick={() => setShowNavbar(false)}
              className="text-white bg-tailCall-cyan rounded p-2 flex items-center justify-center border-none"
            >
              <X className="text-black" />
            </button>
          </div>

          {/* Menu items */}
          <ul className="flex flex-col gap-5 font-kanit text-white text-[20px] list-none">
            <li>
              <Link
                href="/"
                className={`no-underline ${
                  location.pathname === "/"
                    ? "text-tailCall-cyan font-bold"
                    : "text-tailCall-darkMode---neutral-400 dark:text-white opacity-80 hover:opacity-100"
                }`}
              >
                Home
              </Link>
            </li>
            {NavbarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`no-underline ${
                    `${item.link}/` === location.pathname
                      ? "text-tailCall-cyan font-bold dark:text-tailCall-cyan"
                      : "text-tailCall-darkMode---neutral-400 opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Glowing spotlight at bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(505.31%_54.98%_at_50%_151.87%,rgba(48,237,230,0.5)_0%,rgba(0,0,0,0)_100%)] pointer-events-none" />
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex gap-5">
            <Link href="/" className="flex items-center justify-center">
              <img src="/images/home/logo-light.svg" alt="Logo" width={141} className="dark:block hidden" />
              <img src="/images/home/logo-dark.svg" alt="Logo" width={141} className="flex dark:hidden" />
            </Link>
            <ul className="ml-8 hidden md:flex font-kanit list-none items-center p-0 m-0 gap-SPACE_07 text-white font-normal text-title-small cursor-pointer">
              {NavbarItems.map((item) => {
                return (
                  <Link
                    className={` opacity-80 hover:opacity-100 transition-opacity duration-500 no-underline hover:no-underline hover:text-tailCall-darkMode---neutral-950 hover:dark:text-white ${
                    `${item.link}/` === location.pathname
                      ? "font-bold text-tailCall-cyan dark:text-tailCall-cyan"
                      : "text-tailCall-darkMode---neutral-400 hover:opacity-100"
                  }`}
                    href={item.link}
                    key={item.name}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </ul>
          </div>
          <div className="flex justify-between w-auto md:p-0 items-center md:self-end gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Button variant="navlink" onClick={() => {}}>
                <span>Signup</span>
              </Button>
              <Button variant="navlink" onClick={() => {}}>
                <span>Book a Demo</span>
              </Button>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setShowNavbar(!showNavbar)}
              className="border-none flex md:hidden bg-tailCall-cyan rounded p-2 items-center justify-center cursor-pointer"
            >
              {showNavbar ? <X /> : <Menu />}
            </button>
            <div className="flex md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NewNavbar
