import React, { useEffect, useState } from "react"
import Button from "./Button"
import { Copy, CopyCheck } from "lucide-react"

const CopyCodeButton = (): JSX.Element => {
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
    <Button variant="transparent" onClick={handleCopy}>
      <div className="group">
        <div className="relative flex w-fit items-center group group-hover:bg-[#018284] dark:group-hover:bg-[#30EDE6] transition-colors duration-500 rounded-2xl cursor-pointer">
          <>
            <img
              src="/images/home/curly-open-light.svg"
              alt="curly close"
              className="group-hover:absolute -left-1 block dark:hidden"
            />
            <img src="/images/home/curly-open.svg"
              alt="curly open"
              className="group-hover:absolute -left-1 hidden dark:block" />
          </>
          <span className="text-[#018284] dark:text-[#30EDE6] group-hover:text-black group-hover:hidden">Try Now</span>
          <span className="text-black hidden group-hover:block px-3 text-content-mini sm:text-content-small ">
            npm install -g @antinomyhq/forge
          </span>
          {!isCopied ? <Copy className="hidden group-hover:block" /> : <CopyCheck />}
          <>
            <img
              src="/images/home/curly-close-light.svg"
              alt="curly close"
              className="block dark:hidden"
            />
            <img
              src="/images/home/curly-close.svg"
              alt="curly close"
              className="hidden dark:block"
            />
          </>
        </div>
      </div>
    </Button>
  )
}

export default CopyCodeButton
