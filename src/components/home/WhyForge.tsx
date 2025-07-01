import React, {useEffect, useRef} from "react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

import Card from "../shared/Card"

gsap.registerPlugin(ScrollTrigger)

const WhyForge = (): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || !cards) return

    const totalScroll = cards.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        x: `-${totalScroll}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert() // cleanup
  }, [])
  return (
    <div ref={sectionRef} className="relative p-4 xl:pl-[271px] xl:pt-[100px] h-screen w-full overflow-hidden">
      <div className="relative">
        <span
          className="absolute font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[142px] font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#484848_100%)]
 tracking-normal"
        >
          WHY THEY LOVE
        </span>
        <span
          className="absolute top-16 left-20 md:top-24 md:left-60 xl:top-32 xl:left-36 font-bebas md:font-normal text-display-medium md:text-display-large xl:text-[132px] font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-tight"
        >
          FORGE-CODE
        </span>
      </div>
      <div ref={cardsRef} className="flex absolute gap-6 top-40 md:top-72 p-3 xl:top-[360px]">
        {Array.from({length: 6}).map((_, idx) => {
          return (
            <Card key={idx}>
              <div
                className={`px-8 py-8 rounded-xl min-w-[380px] max-w-[380px] border-[11px] border-[#181D27] border-solid bg-black shadow-[0px_0px_4px_0px_#30EDE6] hover:cursor-pointer hover:bg-custom-radial hover:transition-colors hover:duration-500`}
              >
                <div className="flex flex-col gap-3">
                  <img src="/images/home/why-logos.png" alt="" height={80} width={80} />
                  <span className="text-white font-kanit text-title-small font-normal">
                    Forge feels like pair programming with someone who actually understands my stack.
                  </span>
                  <span className="text-white opacity-50 text-title-tiny font-normal">-Raj, Full-Stack Developer</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default WhyForge
