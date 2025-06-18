import React, {useEffect, useState} from "react"
import {Copy, CopyCheck} from "lucide-react"

const GetStarted = (): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isCopied) {
      interval = setTimeout(() => setIsCopied(false), 1000)
    }
    return () => clearTimeout(interval)
  }, [isCopied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText("npm install -g @antinomyhq/forge")
    setIsCopied(true)
  }
  return (
    <div className="relative pt-28 pl-28 pr-24 pb-20 h-screen">
      <div className="flex flex-col gap-3 relative">
        <img src="/images/home/get-started.svg" alt="Get started" width={554} className="absolute top-0" />
        <span className="text-white text-title-large font-normal font-kanit absolute top-20 left-[560px]">with</span>
        <img src="/images/home/forge-code.svg" alt="Forge code" width={491} className="absolute top-32 left-72" />
        <img
          src="/images/home/open-source.svg"
          alt="Open source"
          width={550}
          className="absolute top-64 left-[450px]"
        />
        <span className="text-white text-title-large font-normal font-kanit absolute top-80 left-[400px]">An</span>
        <span className="text-white text-title-large font-normal font-kanit absolute top-80 left-[850px]">
          Companion for Your Terminal
        </span>
      </div>
      <div className="flex flex-col gap-5 absolute bottom-36 left-[550px]">
        <div className="bg-[#1E1C21] max-w-[600px] flex flex-col rounded-2xl">
          <div className="flex items-center gap-1 px-4 py-3 bg-[#18171A] rounded-t-2xl">
            <div className="h-4 w-4 bg-[#D9D9D9] rounded-full opacity-50"></div>
            <div className="h-4 w-4 bg-[#D9D9D9] rounded-full opacity-20"></div>
            <div className="h-4 w-4 bg-[#D9D9D9] rounded-full opacity-10"></div>
          </div>
          <div className="pt-9 px-7 pb-5">
            <span className="text-[#30EDE6] font-space_mono text-title-medium font-normal -tracking-wide">
              # Install Forge globally using npm
            </span>
            <br />
            <span className="text-[#30EDE6] font-space_mono text-title-medium font-normal -tracking-wide">
              npm install -g @antinomyhq/forge
            </span>
          </div>
        </div>
        <div className="group">
          <div
            onClick={handleCopy}
            className="relative flex w-fit items-center group group-hover:bg-[#30EDE6] transition-colors duration-500 rounded-2xl cursor-pointer"
          >
            <img src="/images/home/curly-open.svg" alt="curly open" className="group-hover:absolute -left-1" />
            <span className="text-[#30EDE6] group-hover:text-black group-hover:hidden">Try Now</span>
            <span className="text-black hidden group-hover:block px-3">npm install -g @antinomyhq/forge</span>
            {!isCopied ? <Copy className="hidden group-hover:block" /> : <CopyCheck />}
            <img src="/images/home/curly-close.svg" alt="curly close" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
