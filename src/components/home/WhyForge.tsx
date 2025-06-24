import React from "react"
import Card from "../shared/Card"

const WhyForge = (): JSX.Element => {
  return (
    <div className="relative p-4 xl:pl-[271px] xl:pt-[100px] h-screen">
      <div className="relative">
        <span
          className="absolute font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[142px] font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#484848_100%)]
 tracking-normal"
        >
          WHY WE LOVE
        </span>
        <span
          className="absolute top-16 left-20 md:top-24 md:left-60 xl:top-32 xl:left-36 font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[132px] font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-tight"
        >
          FORGE-CODE
        </span>
      </div>
      <div
        className="flex absolute gap-6 top-40 md:top-72 xl:top-[360px] overflow-auto w-full"
        style={{width: "calc(100% - 300px)"}}
      >
        {Array.from({length: 6}).map((_, idx) => {
          return (
            <Card key={idx}>
              <div className="flex flex-col gap-3">
                <img src="/images/home/why-logos.png" alt="" height={80} width={80} />
                <span className="text-white font-kanit text-title-small">
                  Forge feels like pair programming with someone who actually understands my stack.
                </span>
                <span className="text-white opacity-50 text-title-tiny font-normal">-Raj, Full-Stack Developer</span>
              </div>
            </Card>
          )
        })}
      </div>
      <img src="/images/home/bg-ellipse.svg" alt="ellipse" className="hidden xl:block absolute -bottom-10" />
    </div>
  )
}

export default WhyForge
