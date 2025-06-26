import React from "react"

interface CardProps {
  children: JSX.Element
}

const Card = ({children}: CardProps): JSX.Element => {
  return <div className="rounded-2xl bg-tailCall-border-dark-1000 py-8 pb-4 px-10">{children}</div>
}

export default Card
