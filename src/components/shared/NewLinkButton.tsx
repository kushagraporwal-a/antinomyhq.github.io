import Link from "@docusaurus/Link"
import { Theme } from "@site/src/constants"
import clsx from "clsx"
import React from "react"
import { SVGProps } from "react"

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

  // This controls the border and hover styles for LIGHT and DARK themes
  const generateThemeClasses = () => {
    const themes = {
      [Theme.Light]: {
        classes: `
      border border-solid border-[#D4D4D4]
      text-tailCall-dark-500
      bg-transparent
      group-hover:bg-white
      group-hover:text-black
      group-hover:border-black
    `,
      },
      [Theme.Dark]: {
        classes: `
      border border-solid border-[#D4D4D4]
      text-white
      bg-transparent
      group-hover:bg-white
      group-hover:text-black
      group-hover:border-white
    `,
      },
      [Theme.Gray]: {
        classes: `
          border border-gray-400
          bg-transparent
          text-white
          transition-all duration-300
          group-hover:bg-white
          group-hover:text-black
          group-hover:border-white
        `,
        gridClasses: "hidden",
      },
      [Theme.Tailcall]: {
        classes: `
          border border-yellow-300
          bg-transparent
          text-black
          transition-all duration-300
          group-hover:bg-white
          group-hover:text-black
          group-hover:border-black
        `,
        gridClasses: "",
      },
    }

    return themes[theme] || { classes: "", gridClasses: "" }
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
        `,
        setButtonWidth(),
        generateThemeClasses().classes,
        disabled ? "cursor-not-allowed opacity-20" : ""
      )}
    >
      {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 z-[1]" />}

      {title && (
        <span className={clsx("z-[1]", titleClassName)}>
          {title}
        </span>
      )}
    </Link>
  )
}

export default NewLinkButton
