import React from "react"

type BenefitsCardProps = {
  title: string
  description: string
  imageUrl: string
  small: boolean
}

const BenefitsCard = ({title, description, imageUrl, small}: BenefitsCardProps) => {
  return (
    <div className="bg-benefit-light-background border border-solid border-tailCall-light-900  dark:bg-[linear-gradient(to_bottom_right,_#000000,_#1B8783B2)] p-[2px] rounded-3xl w-full md:w-96 xl:w-[550px]">
      <div className="flex flex-col gap-4 bg-benefit-light-background dark:bg-[linear-gradient(180deg,_#1E1C21_0%,_#000_100%)] text-white font-kanit w-full xl:max-w-[550px] rounded-3xl p-8 lg:px-14 lg:py-16">
        <div className="flex gap-3">
          <img src={imageUrl} alt="" />
          <span
            className={`text-tailCall-lightMode---neutral-800 dark:text-tailCall-lightMode---neutral-50 text-title-medium md:text-title-semi-large md:font-normal font-normal ${small ? "w-44" : "w-auto"}`}
          >
            {title}
          </span>
        </div>
        <p className="text-title-tiny md:text-title-medium md:font-extralight font-extralight text-tailCall-lightMode---neutral-700 dark:text-tailCall-light-800 xl:tracking-[.5px]">
          {description}
        </p>
      </div>
    </div>
  )
}

export default BenefitsCard
