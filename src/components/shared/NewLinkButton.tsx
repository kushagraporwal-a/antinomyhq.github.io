import Link from "@docusaurus/Link"
import {Theme} from "@site/src/constants"
import clsx from "clsx"
import React, {useMemo, useCallback} from "react"
import {SVGProps} from "react"

// Types
interface LinkButtonProps {
  title?: string
  titleClassName?: string
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>
  theme: Theme
  onClick?: () => void | Promise<void>
  href?: string
  width?: "small" | "medium" | "large" | "auto" | "full"
  disabled?: boolean
}

// Constants
const WIDTH_CLASSES = {
  small: "w-[228px]",
  medium: "w-[300px]", 
  large: "w-[500px]",
  full: "w-full",
  auto: "w-fit",
} as const

const BASE_BUTTON_CLASSES = `
  group relative
  disabled:opacity-25
  disabled:cursor-not-allowed
  flex items-center justify-center
  gap-x-2
  rounded-[10px]
  h-10 sm:h-8
  px-4 py-4 sm:px-6 lg:px-8 sm:py-5 lg:py-6
  cursor-pointer
  transition-all duration-300
  text-sm sm:text-base
  hover:no-underline
  text-content-tiny
  border border-solid border-tailCall-lightMode---primary-700 dark:border-tailCall-lightMode---primary-400
  text-tailCall-lightMode---primary-700 dark:text-tailCall-lightMode---primary-400 group-hover:text-white group-hover:dark:text-black
  bg-transparent group-hover:bg-tailCall-lightMode---primary-700 group-hover:dark:bg-tailCall-lightMode---primary-400 
`

const NewLinkButton: React.FC<LinkButtonProps> = ({
  title,
  titleClassName,
  Icon,
  theme,
  onClick,
  href,
  width = "auto",
  disabled = false,
}) => {
  // Memoize width class to prevent recalculation on every render
  const widthClass = useMemo(() => {
    return WIDTH_CLASSES[width] || WIDTH_CLASSES.auto
  }, [width])

  // Memoize button classes to prevent recalculation
  const buttonClasses = useMemo(() => {
    return clsx(
      BASE_BUTTON_CLASSES,
      widthClass,
      disabled && "cursor-not-allowed opacity-20"
    )
  }, [widthClass, disabled])

  // Memoize title classes
  const titleClasses = useMemo(() => {
    return clsx("z-[1]", titleClassName)
  }, [titleClassName])

  // Memoize click handler to prevent unnecessary re-renders
  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    
    if (onClick) {
      onClick()
    }
  }, [onClick, disabled])

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={buttonClasses}
      aria-disabled={disabled}
      aria-label={title}
    >
      {Icon && (
        <Icon 
          className="w-5 h-5 sm:w-6 sm:h-6 z-[1]" 
          aria-hidden="true"
        />
      )}

      {title && (
        <span className={titleClasses}>
          {title}
        </span>
      )}
    </Link>
  )
}

export default NewLinkButton
