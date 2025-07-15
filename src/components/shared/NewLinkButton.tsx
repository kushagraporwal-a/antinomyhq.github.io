import Link from "@docusaurus/Link"
import {Theme} from "@site/src/constants"
import clsx from "clsx"
import React from "react"
import {SVGProps} from "react"

type LinkButtonProps = {
  title?: string
  titleClassName?: string
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>
  theme: Theme
  onClick?: () => void | Promise<void>
  href?: string
  width?: "small" | "medium" | "large" | "auto" | "full"
  disabled?: boolean
}

const NewLinkButton = ({
  title,
  titleClassName,
  Icon,
  theme,
  onClick,
  href,
  width = "auto",
  disabled,
}: LinkButtonProps): JSX.Element => {
  const setButtonWidth = () => {
    switch (width) {
      case "small":
        return "w-[228px]"
      case "medium":
        return "w-[300px]"
      case "large":
        return "w-[500px]"
      case "full":
        return "w-full"
      case "auto":
        return "w-fit"
      default:
        return "w-fit"
    }
  }

  return (
    <Link
      to={href}
      onClick={onClick}
      className={clsx(
        `
        group relative
        disabled:opacity-25
        disabled:cursor-not-allowed
        flex items-center justify-center
        gap-x-2
        rounded-lg sm:rounded-xl
        h-10 sm:h-8
        px-4 py-2 sm:px-6 lg:px-8 sm:py-3 lg:py-4
        cursor-pointer
        transition-all duration-300
        text-sm sm:text-base
        hover:no-underline
        text-content-tiny
        border border-solid border-black dark:border-[#D4D4D4] text-black dark:text-white bg-transparent group-hover:bg-black group-hover:text-white group-hover:border-black group-hover:dark:bg-white group-hover:dark:text-black group-hover:dark:border-white
        `,
        setButtonWidth(),
        disabled ? "cursor-not-allowed opacity-20" : "",
      )}
    >
      {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 z-[1]" />}

      {title && <span className={clsx("z-[1]", titleClassName)}>{title}</span>}
    </Link>
  )
}

export default NewLinkButton
