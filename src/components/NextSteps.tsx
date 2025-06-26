import React from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"

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

const NextSteps: React.FC<NextStepsProps> = ({items, className}) => {
  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-4 my-8", className)}>
      {items.map((item, idx) => (
        <Link key={idx} to={item.link} className="flex flex-col overflow-hidden !text-white !no-underline h-full">
          <div className="relative mt-5 bg-card-border-gradient rounded-3xl min-w-72 min-h-72 p-[1px]">
            <div className="flex flex-col flex-1 p-6 gap-2 min-h-44 bg-tailCall-dark-800 rounded-3xl h-full hover:border-tailCall-border-dark-100 transition-colors">
              <div className="absolute -top-10 mb-2 flex items-center justify-center text-tailCall-light-700 bg-black rounded-full p-5">
                {item.logo}
              </div>
              <div className="flex flex-col flex-1 gap-1 mt-10">
                <span className="text-title-small font-bold line-clamp-2">{item.title}</span>
                <span className="text-content-small text-tailCall-light-800">{item.subtitle}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default NextSteps
