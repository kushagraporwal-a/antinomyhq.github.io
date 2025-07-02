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
      className={`hover:rotate-0 transition-transform duration-500 rounded-2xl ${
        selected
          ? "radial-gradient(41.85% 42.23% at 53.3% 102.3%, rgba(48, 237, 230, 0.50) 0%, var(--Neutral-200, #E5E5E5) 100%) dark:bg-[radial-gradient(37.73%_37.61%_at_50.74%_103.75%,_rgba(255,255,255,0.6)_0%,_rgba(255,255,255,0.15)_60%,_rgba(0,0,0,0.0)_85%)]"
          : "bg-[#E5E5E5] dark:bg-tailCall-dark-800"
      }`}
    >
      <div className="relative px-8 py-5 flex items-center justify-between bg-tailCall-dark-800 rounded-t-2xl">
        <span className="text-white font-kanit text-title-small xl:text-[26px] -tracking-normal font-normal opacity-70">
          {title}
        </span>
        <ul className="absolute right-5 -space-x-4 flex items-center list-none m-0">
          {avatars.map((avatars) => {
            return <Avatar avatarUrl={avatars} key={avatars} />
          })}
        </ul>
      </div>
      <ul className="px-8 py-4 flex flex-col list-none text-title-tiny font-normal gap-3 text-tailCall-text-gray-200 dark:text-[#a1a1a1] opacity-80">
        {description.map((desc) => {
          return <li key={desc}>{desc}</li>
        })}
      </ul>
    </div>
  )
}

export default TechCard
