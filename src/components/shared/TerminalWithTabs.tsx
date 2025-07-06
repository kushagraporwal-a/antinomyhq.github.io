import React, {useEffect, useRef, useState} from "react"
import {COMMANDS, GUIDES} from "@site/src/constants"

const TerminalWithTabs = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [commandIndex, setCommandIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [lines, setLines] = useState<string[]>([])
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    resetAndStart()
  }, [])

  // Typing animation for user command
  useEffect(() => {
    if (!startTyping) return

    const currentCommand = COMMANDS[commandIndex]
    let index = 0

    const interval = setInterval(() => {
      setTypedText((prev) => prev + currentCommand.command.charAt(index))
      index++
      if (index === currentCommand.command.length) {
        clearInterval(interval)
        animateLines(currentCommand.output)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [startTyping, commandIndex])

  // New function to animate lines one-by-one
  const animateLines = (output: string[]) => {
    let lineIndex = 0
    const lineInterval = setInterval(() => {
      setLines((prev) => [...prev, output[lineIndex]])
      lineIndex++

      if (lineIndex === output.length) {
        clearInterval(lineInterval)
        setStartTyping(false)

        const isLastCommand = commandIndex + 1 === COMMANDS.length

        if (!isLastCommand) {
          setTimeout(() => {
            setTypedText("")
            setLines((prev) => [...prev, ""])
            setCommandIndex((prev) => prev + 1)
            setStartTyping(true)
          }, 1000)
        } else {
          // ✅ Restart the whole thing
          setTimeout(() => {
            resetAndStart() // restart from beginning
          }, 2000) // optional pause before restart
        }
      }
    }, 300)
  }

  // Auto-scroll
  useEffect(() => {
    const el = containerRef.current
    if (el) {
      el.scrollTo({top: el.scrollHeight, behavior: "smooth"})
    }
  }, [typedText, lines])

  const resetAndStart = () => {
    setTypedText("")
    setLines([])
    setCommandIndex(0)
    setStartTyping(true)
  }

  return (
    <div className="relative bg-tailCall-lightMode---primary-50 dark:bg-[#1E1C21] p-[2px] dark:bg-custom-diagonal rounded-2xl w-full md:w-4/5 lg:w-[500px] h-auto min-h-[650px] flex flex-col font-mono">
      {/* Terminal Header */}
      <div className="bg-[#E8E8E8] dark:bg-tailCall-darkMode---neutral-900 w-full rounded-t-2xl flex gap-2 items-center p-3">
        <div className="h-4 w-4 bg-tailCall-border-dark-1200 dark:bg-tailCall-dark-1300 rounded-full"></div>
        <div className="h-4 w-4 bg-tailCall-border-dark-1200 dark:bg-tailCall-dark-1400 rounded-full"></div>
        <div className="h-4 w-4 bg-tailCall-border-dark-1200 dark:bg-tailCall-darkMode---primary-400 rounded-full"></div>
      </div>
      <div className="bg-white dark:bg-tailCall-dark-1500 rounded-b-2xl text-sm h-full relative">
        <img src="/images/home/forgecode.gif" alt="Terminal" className="ml-0 hidden dark:block" />
        <img src="/images/home/forgecode-light.gif" alt="Terminal" className="ml-0 block dark:hidden" />
        <div className="flex w-full flex-col px-4">
          {GUIDES.map(({title, details}) => {
            return (
              <div key={title} className="flex list-none w-full">
                <span className="text-[#525252] dark:text-white font-space text-title-tiny font-normal w-2/5 inline-block">
                  {title}
                </span>
                <span className="text-[#018284] dark:text-tailCall-darkMode---primary-400 font-space text-title-tiny font-normal leading-[150%] -tracking-[0.307px]">
                  {details}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex-1 text-white p-4 text-sm whitespace-pre-wrap">
          <div
            className="bg-gradient-to-r p-[1px] rounded-lg relative"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(37, 37, 37, 1) 0%, rgba(139, 139, 139, 1) 100%)",
            }}
          >
            <div className="bg-[#E2ECD5] dark:bg-tailCall-dark-1600 rounded-lg px-2 max-h-max relative">
              <img src="/images/home/terminal-text-icon.svg" alt="text" className="absolute left-0 h-[100%] top-0" />
              <span className="text-tailCall-darkMode---neutral-600 dark:text-tailCall-dark-1700 font-space text-title-tiny font-normal">
                {typedText}
              </span>
              {startTyping && <span className="animate-pulse">|</span>}{" "}
            </div>
          </div>
          <div ref={containerRef} className="mt-3 space-y-1 overflow-y-auto h-[30vh]">
            {lines.map((line, idx) => {
              const isDotLine = line?.startsWith("⏺")
              const rest = isDotLine ? line?.slice(2) : line

              return (
                <div key={idx} className="text-[#525252] dark:text-[#B0BEC5]">
                  {isDotLine ? (
                    <div className="flex items-center gap-2">
                      <div className="bg-[#30EDE6] h-3 w-3 rounded-lg"></div>
                      <span>{rest}</span>
                    </div>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerminalWithTabs
