import React from "react"
import CopyCodeButton from "../shared/CopyCodeButton"
import Button from "../shared/Button"
import { footerItems } from "@site/src/constants"
import FooterItem from "../shared/FooterItem"

const Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col gap-14 px-6 py-10 z-[99]">
      <div className="flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-start">
        <div className="flex flex-col gap-10">
          <img src="/images/home/logo-light.svg" alt="Logo" width={141} className="cursor-pointer" />
          <div className="flex gap-5">
            <>
              <img src="/icons/basic/xlogo.svg" alt="xlogo" className="hidden dark:block" />
              <img src="/icons/basic/XLogo.svg" alt="xlogo" className="block dark:hidden" />
            </>
            <>
              <img src="/icons/basic/facebook.svg" alt="facebook" className="hidden dark:block" />
              <img src="/icons/basic/FacebookLogo.svg" alt="facebook" className="block dark:hidden" />
            </>
            <>
              <img src="/icons/basic/linkedin.svg" alt="linkedin" className="hidden dark:block" />
              <img src="/icons/basic/LinkedinLogo.svg" alt="linkedin" className="block dark:hidden" />
            </>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-[340px]">
          <span className="font-kanit text-title-small xl:font-normal xl:text-title-semi-large font-normal text-tailCall-text-gray-200 dark:text-white md:text-end">
            Get started with personal AI Assistant now.
          </span>
          <div className="flex justify-between gap-5 items-start flex-col md:items-end">
            <Button variant="transparent" onClick={() => { }}>
              <span className="font-kanit text-tailCall-text-gray-200 dark:text-white font-semibold text-title-tiny">Book a demo</span>
            </Button>
            <CopyCodeButton />
          </div>
        </div>
      </div>
      <hr className="bg-[#262626]" />
      <div className="flex justify-between gap-5 flex-wrap">
        {footerItems.map(({ items, title }) => {
          return <FooterItem key={title} items={items} title={title} />
        })}
      </div>
      <div className="flex items-center justify-center pt-5">
        <span className="text-tailCall-text-gray-200 dark:text-white font-kanit text-title-tiny font-[275]">
          Copyright © {new Date().getFullYear()} Tailcall, Inc.
        </span>
      </div>
    </footer>
  )
}

export default Footer
