import React, {useMemo} from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"

// Types
export interface NextStepItem {
  logo: React.ReactNode
  title: string
  subtitle: string
  link: string
}

export interface NextStepsProps {
  items: [NextStepItem, NextStepItem, NextStepItem]
  className?: string
}

// Constants
const GRID_CLASSES = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-8 md:gap-4 my-8"

const CARD_CONTAINER_CLASSES = "relative mt-5 bg-card-border-gradient-nextStep-light dark:bg-card-border-gradient-nextStep rounded-[13px] min-w-auto 2xl:min-w-72 h-full p-[1px]"

const CARD_CONTENT_CLASSES = "flex flex-col flex-1 p-6 gap-2 bg-white dark:bg-tailCall-dark-800 rounded-[12px] h-full hover:border-tailCall-border-dark-100 transition-colors"

const LOGO_CONTAINER_CLASSES = "absolute -top-10 mb-2 rounded-full bg-card-border-gradient-nextStep-light dark:bg-card-border-gradient-nextStep p-[1px] flex items-center justify-center"

const LOGO_BACKGROUND_CLASSES = "flex items-center justify-center text-tailCall-lightMode---neutral-700 dark:text-tailCall-light-800 bg-[#f1f1f1] dark:bg-black rounded-full p-5"

const CONTENT_CONTAINER_CLASSES = "flex flex-col flex-1 gap-2 mt-6"

const TITLE_CLASSES = "text-title-small font-bold line-clamp-2 text-tailCall-lightMode---neutral-600 dark:text-tailCall-darkMode---neutral-300"

const SUBTITLE_CLASSES = "text-content-small text-tailCall-lightMode---neutral-700 dark:text-tailCall-light-800"

// Components
const NextStepCard: React.FC<{item: NextStepItem; index: number}> = ({item, index}) => {
  return (
    <Link 
      to={item.link} 
      className="flex flex-col overflow-visible !no-underline h-full"
      aria-label={`Navigate to ${item.title}`}
    >
      <div className={CARD_CONTAINER_CLASSES}>
        <div className={CARD_CONTENT_CLASSES}>
          <div className={LOGO_CONTAINER_CLASSES}>
            <div className={LOGO_BACKGROUND_CLASSES}>
              {item.logo}
            </div>
          </div>
          <div className={CONTENT_CONTAINER_CLASSES}>
            <span className={TITLE_CLASSES}>
              {item.title}
            </span>
            <ul>
              <li className={SUBTITLE_CLASSES}>
                {item.subtitle}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  )
}

const NextSteps: React.FC<NextStepsProps> = ({items, className}) => {
  // Memoize grid classes to prevent recalculation
  const gridClasses = useMemo(() => {
    return clsx(GRID_CLASSES, className)
  }, [className])

  // Memoize card components to prevent unnecessary re-renders
  const cardElements = useMemo(() => {
    return items.map((item, index) => (
      <NextStepCard 
        key={`next-step-${index}-${item.title}`} 
        item={item} 
        index={index} 
      />
    ))
  }, [items])

  return (
    <div className={gridClasses}>
      {cardElements}
    </div>
  )
}

export default NextSteps
