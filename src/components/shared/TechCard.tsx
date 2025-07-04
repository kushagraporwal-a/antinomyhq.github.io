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
      className={`hover:cursor-pointer hover:rotate-0 transition-transform duration-500 rounded-2xl hover:bg-[radial-gradient(41.85%_42.23%_at_53.3%_102.3%,rgba(48,237,230,0.5)_0%,var(--Neutral-200,#E5E5E5)_100%)] hover:dark:bg-[radial-gradient(37.73%_37.61%_at_50.74%_103.75%,_rgba(48,237,230,0.5)_0%,_rgba(21,20,23,0.5)_100%)]`}
    >
      <div className="relative px-8 py-5 flex items-center justify-between bg-tailCall-lightMode---neutral-500 dark:bg-tailCall-dark-800 rounded-t-2xl">
        <span className="text-tailCall-lightMode---neutral-100 dark:text-white max-w-48 md:max-w-none font-kanit text-title-small xl:text-[26px] -tracking-normal font-normal opacity-70">
          {title}
        </span>
        <ul className="absolute right-5 -space-x-4 flex items-center list-none m-0">
          {avatars.map((avatars) => {
            return <Avatar avatarUrl={avatars} key={avatars} />
          })}
        </ul>
      </div>
      <ul className="px-8 py-4 flex flex-col font-space list-none text-title-tiny font-normal gap-3 text-tailCall-light-1000 dark:text-[#a1a1a1] opacity-80">
        {description.map((desc) => {
          return <li key={desc}>{desc}</li>
        })}
      </ul>
    </div>
  )
}

export default TechCard
