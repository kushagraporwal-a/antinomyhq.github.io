import {Info, Lightbulb, TriangleAlert} from "lucide-react"
import React, {useMemo} from "react"

// Types
type CardVariant = "thin" | "default" | "docsCard" | "warning" | "information" | "tip"

interface CardProps {
  children: React.ReactNode
  variant?: CardVariant
}

// Constants
const CARD_VARIANTS = {
  thin: "rounded-[40px] max-w-[600px] flex flex-col gap-4 max-h-[50vh] overflow-scroll",
  default: "",
  docsCard: "py-8 px-10 rounded-[12px] !font-[275] text-tailCall-lightMode---neutral-600 dark:text-white dark:bg-[#181818] bg-tailCall-darkMode---neutral-300",
  warning: "custom-cards bg-[#DED7CA] dark:bg-[#2F2D2A] border-l-4 border-l-solid border-[#C68400] dark:border-[#F9A705] p-8 rounded-[12px] text-black dark:text-white mt-4 mb-[20px]",
  information: "custom-cards bg-[#D5E7DB] dark:bg-[#272D29] border-l-4 border-l-solid border-[#158B00] dark:border-[#22E000] p-8 rounded-[12px] text-black dark:text-white mt-4 mb-[20px]",
  tip: "custom-cards bg-[#DAE3ED] dark:bg-[#151E28] border-l-4 border-l-solid border-[#5261FF] dark:border-[#5968FF] p-8 rounded-[12px] text-black dark:text-white mt-4 mb-[20px]",
} as const

const VARIANT_ICONS = {
  warning: TriangleAlert,
  information: Info,
  tip: Lightbulb,
} as const

const VARIANT_ICON_COLORS = {
  warning: "text-[#C68400] dark:text-[#F9A705]",
  information: "text-[#158B00] dark:text-[#22E000]",
  tip: "text-[#5261FF] dark:text-[#5968FF]",
} as const

const Card: React.FC<CardProps> = ({children, variant = "default"}) => {
  // Memoize card classes to prevent recalculation on every render
  const cardClasses = useMemo(() => {
    const baseClasses = "text-justify text-title-small font-normal h-[100%]"
    const variantClasses = CARD_VARIANTS[variant] || CARD_VARIANTS.default
    
    return `${baseClasses} ${variantClasses}`.trim()
  }, [variant])

  // Memoize icon component and styling
  const iconElement = useMemo(() => {
    const IconComponent = VARIANT_ICONS[variant as keyof typeof VARIANT_ICONS]
    const iconColor = VARIANT_ICON_COLORS[variant as keyof typeof VARIANT_ICON_COLORS]
    
    if (!IconComponent || !iconColor) {
      return null
    }

    return (
      <IconComponent 
        className={`${iconColor} block mb-3`}
        aria-hidden="true"
      />
    )
  }, [variant])

  return (
    <div className={cardClasses}>
      {iconElement}
      {children}
    </div>
  )
}

export default Card
