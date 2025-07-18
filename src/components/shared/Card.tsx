import {Info, Lightbulb, TriangleAlert} from "lucide-react"
import React from "react"

type variant = "thin" | "default" | "docsCard" | "warning" | "information" | "tip"

type CardProps = {
  children: React.ReactNode
  variant?: variant
}

const Card = ({children, variant = "default"}: CardProps): JSX.Element => {
  const CardVariant = {
    thin: "rounded-[40px] max-w-[600px] flex flex-col gap-4 max-h-[50vh] overflow-scroll",
    default: "",
    docsCard:
      "py-8 px-10 rounded-[12px] !font-[275] text-tailCall-lightMode---neutral-600 dark:text-white dark:bg-[#181818] bg-tailCall-darkMode---neutral-300",
    warning:
      "custom-cards bg-[#FEF1D7] dark:bg-[#3C3220] border-l-4 border-l-solid border-[#C68400] dark:border-[#F9A705] p-10 rounded-[12px] text-black dark:text-white mt-4",
    information:
      "custom-cards bg-[#DFEAF6] dark:bg-[#202D3C] border-l-4 border-l-solid border-[#5261FF] dark:border-[#5968FF] p-10 rounded-[12px] text-black dark:text-white mt-4",
    tip:
      "custom-cards bg-[#D6FFF2] dark:bg-[#203C33] border-l-4 border-l-solid border-[#158B00] dark:border-[#22E000] p-10 rounded-[12px] text-black dark:text-white mt-4",
  }
  return (
    <div className={`text-justify text-title-small font-normal h-[100%] ${CardVariant[variant]}`}>
      {variant === "warning" && <TriangleAlert className="text-[#C68400] dark:text-[#F9A705] block mb-3" />}
      {variant === "information" && <Info className="text-[#5261FF] dark:text-[#5968FF] block mb-3" />}
      {variant === "tip" && <Lightbulb className="text-[#158B00] dark:text-[#22E000] block mb-3" />}
      {children}
    </div>
  )
}

export default Card
