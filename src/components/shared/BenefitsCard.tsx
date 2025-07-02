import React from "react"

type BenefitsCardProps = {
  title: string
  description: string
  imageUrl: string
}

const BenefitsCard = ({title, description, imageUrl}: BenefitsCardProps) => {
  return (
    <div className="linear-gradient(180deg, var(--Base-White, #FFF) 0%, var(--Neutral-200, #E5E5E5) 100%) dark:bg-[linear-gradient(to_bottom_right,_#000000,_#1B8783B2)] p-[2px] rounded-3xl w-full md:w-96 xl:w-[550px]">
      <div className="border-tailCall-border-dark-300 flex flex-col gap-4 dark:bg-[linear-gradient(180deg,_#1E1C21_0%,_#000_100%)] text-white font-kanit w-full xl:max-w-[550px] rounded-3xl p-8 lg:px-14 lg:py-16">
        <div className="flex gap-3">
          <img src={imageUrl} alt="" />
          <span className="text-tailCall-text-gray-200 dark:text-white text-title-medium md:text-title-semi-large md:font-normal font-normal max-w-52">
            {title}
          </span>
        </div>
        <p className="text-title-tiny md:text-title-medium md:font-extralight font-extralight text-[#454545] dark:text-[#a1a1a1] xl:tracking-[.5px]">
          {description}
        </p>
      </div>
    </div>
  )
}

export default BenefitsCard
