import React, {useEffect, useState} from "react"
import SpotlightSpan from "./SpotlightCursor"

const GetStarted = (): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isCopied) {
      interval = setInterval(() => setIsCopied(false), 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isCopied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText("npm install -g @antinomyhq/forge")
    setIsCopied(true)
  }

  return (
    <div className="flex justify-center">
      <div className="relative max-w-[1440px] w-full p-4 md:px-20 xl:pt-28 xl:pl-28 xl:pr-24 xl:pb-20 h-screen">
        <div className="flex flex-col gap-3 relative">
          <SpotlightSpan>
            <span
              className="absolute top-0 font-bebas text-[48px] md:text-[76px] xl:text-[140px] font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal"
            >
              GET STARTED
            </span>
          </SpotlightSpan>
          <SpotlightSpan>
            <span className="text-tailCall-text-gray-200 dark:text-white text-title-tiny xl:text-title-large xl:font-normal font-kanit absolute top-10 left-48 md:left-72 md:top-20 xl:top-28 xl:left-[560px]">
              with
            </span>
          </SpotlightSpan>
          <SpotlightSpan>
            <span
              className="absolute top-14 left-20 sm:left-32 md:top-20 xl:top-32 xl:left-60 font-bebas text-[48px] md:text-[76px] xl:text-[140px] font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal"
            >
              FORGE-CODE
            </span>
          </SpotlightSpan>
          <SpotlightSpan>
            <span
              className="absolute top-28 left-0 sm:left-40 md:top-40 xl:top-64 xl:left-[300px] font-bebas text-[48px] md:text-[76px] xl:text-[132px] font-normal text-transparent bg-clip-text bg-[radial-gradient(3039.26%_162.31%_at_88.96%_175.81%,_#FFF_0%,_#747474_100%)]
 -tracking-normal"
            >
              ON YOUR TERMINAL
            </span>
          </SpotlightSpan>
        </div>
        <div className="flex flex-col gap-5 absolute top-60 md:top-80 xl:top-[600px] xl:left-[550px] w-full md:w-fit xl:min-w-[700px] bg-gradient-315 rounded-2xl p-[1px]">
          <div className="bg-[#E5E5E5] dark:bg-[#1E1C21] flex flex-col rounded-2xl relative">
            <div className="flex items-center gap-1 px-4 py-3 bg-[#D4D4D4] dark:bg-[#18171A] rounded-t-2xl">
              <div className="h-4 w-4 bg-[#525252] dark:bg-[#D9D9D9] rounded-full opacity-50"></div>
              <div className="h-4 w-4 bg-[#525252] dark:bg-[#D9D9D9] rounded-full opacity-20"></div>
              <div className="h-4 w-4 bg-[#525252] dark:bg-[#D9D9D9] rounded-full opacity-10"></div>
            </div>
            <button onClick={handleCopy} className="absolute right-2 top-2 border-none bg-transparent cursor-pointer">
              {isCopied ? (
                <img src="/icons/basic/copy-done.svg" className="text-tailCall-text-green dark:text-tailCall-cyan h-5 w-5" alt="Copy" />
              ) : (
                <img src="/icons/basic/copy.svg" alt="Copy" className="h-5 w-5" />
              )}
            </button>
            <div className="pt-8 px-8 pb-4">
              <span className="text-[#018284] dark:text-[#30EDE6] font-space text-content-tiny md:text-title-medium font-normal md:font-normal -tracking-wide">
                # Install Forge globally using npm
              </span>
              <br />
              <span className="text-[#018284] dark:text-[#30EDE6] font-space text-content-tiny md:text-title-medium font-normal md:font-normal -tracking-wide">
                npm install -g @antinomyhq/forge
              </span>
            </div>
            <span className="text-black dark:text-white xl:text-[30px] inline-block w-auto xl:font-normal font-normal font-kanit absolute right-0 -top-10 xl:-top-14 xl:right-0">
              Install Now
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
