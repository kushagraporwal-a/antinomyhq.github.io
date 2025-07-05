import React from "react"
import Avatar from "./Avatar"

type TechCardProps = {
  title: string
  avatars: string[]
  description: string[]
  selected?: boolean
}

const TechCard = (props: TechCardProps): JSX.Element => {
  const {title, description, avatars, selected} = props
  return (
    <div
      className={
        `hover:cursor-pointer transition-transform duration-500 rounded-2xl ` +
        `${selected ? "rotate-0" : "odd:rotate-2 even:-rotate-2"} ` +
        `hover:rotate-0 hover:bg-custom-radial-light hover:dark:bg-[radial-gradient(37.73%_37.61%_at_50.74%_103.75%,rgba(48,237,230,0.8)_0%,#18171A_100%)]`
      }
    >
      <div
        className={
          `relative px-8 py-5 flex items-center justify-between rounded-t-2xl transition-all duration-300 ` +
          `${selected ? "bg-[#262626] text-white opacity-100" : "bg-tailCall-lightMode---neutral-500 dark:bg-tailCall-dark-800"}`
        }
      >
        <span
          className={
            `max-w-48 md:max-w-none font-kanit text-title-small xl:text-[26px] -tracking-normal font-normal transition-all duration-300 ` +
            `${selected ? "text-white opacity-100 font-bold drop-shadow" : "text-tailCall-lightMode---neutral-100 dark:text-white opacity-70"}`
          }
        >
          {title}
        </span>
        <ul className="absolute right-5 -space-x-4 flex items-center list-none m-0">
          {avatars.map((avatars) => {
            return <Avatar avatarUrl={avatars} key={avatars} />
          })}
        </ul>
      </div>
      <ul
        className={
          `px-8 py-4 flex flex-col font-space list-none text-title-tiny font-normal gap-3 opacity-80 rounded-b-2xl` +
          `${selected ? "bg-tailCall-dark-400" : ""} text-tailCall-light-1000 dark:text-[#a1a1a1]`
        }
      >
        {description.map((desc) => {
          return <li key={desc}>{desc}</li>
        })}
      </ul>
    </div>
  )
}

export default TechCard
