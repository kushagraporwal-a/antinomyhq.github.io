import React from "react";
import Button from "./Button";
import { NavbarItems } from "@site/src/constants";
import { Menu } from "lucide-react";
import Link from "@docusaurus/Link";
import ThemeToggle from "../home/ThemeToggle";

const Navbar = (): JSX.Element => {
  return (
    <nav className="sticky top-0 z-50 flex md:pt-10 md:px-5 md:pb-5 dark:bg-tailCall-dark-700 justify-between w-full">
      <div className="flex gap-5">
        <>
          <img
            src="/images/home/logo-dark.svg"
            alt="Logo"
            width={141}
            className="ml-5 md:ml-auto block dark:hidden"
          />
          <img
            src="/images/home/logo-light.svg"
            alt="Logo"
            width={141}
            className="ml-5 md:ml-auto hidden dark:block"
          />
        </>
        <ul className="hidden xl:flex font-kanit list-none items-center p-0 m-0 gap-SPACE_07 text-[#737373] dark:text-white font-normal text-title-small cursor-pointer">
          {NavbarItems.map((item) => (
            <Link
              className=" dark:text-white opacity-50 hover:opacity-100 transition-opacity duration-500 no-underline hover:no-underline dark:hover:text-white"
              href={item.link}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex justify-between w-auto p-5 md:p-0 items-center md:self-end gap-3">
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="navlink" onClick={() => { }}>
            <span>Signup</span>
          </Button>
          <Button variant="navlink" onClick={() => { }}>
            <span>Book a Demo</span>
          </Button>
          <ThemeToggle />
        </div>

        <div className="flex xl:hidden text-tailCall-text-gray-100 dark:bg-tailCall-cyan rounded p-3 items-center justify-center cursor-pointer">
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
