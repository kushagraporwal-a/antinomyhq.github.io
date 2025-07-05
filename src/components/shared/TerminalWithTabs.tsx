import React, {useEffect, useRef, useState} from "react"
import {COMMANDS, GUIDES} from "@site/src/constants"

const TerminalWithTabs = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [commandIndex, setCommandIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [lines, setLines] = useState<string[]>([])
  const [startTyping, setStartTyping] = useState(false)

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

        // Automatically move to next command after a delay
        if (commandIndex + 1 < COMMANDS.length) {
          setTimeout(() => {
            setTypedText("")
            setLines((prev) => [...prev, ""]) // space between commands
            setCommandIndex((prev) => prev + 1)
            setStartTyping(true)
          }, 1000)
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

  const handleClick = () => {
    setTypedText("")
    setLines([])
    setCommandIndex(0)
    setStartTyping(true)
  }

  useEffect(() => {
    const handleEnterClick = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setTypedText("")
        setLines([])
        setCommandIndex(0)
        setStartTyping(true)
      }
    }
    document.addEventListener("keydown", handleEnterClick)
    return () => document.removeEventListener("keydown", handleEnterClick)
  }, [])

  return (
    <div className="relative bg-tailCall-lightMode---primary-50 dark:bg-[#1E1C21] p-[1px] dark:bg-custom-diagonal rounded-2xl w-full md:w-4/5 lg:w-[500px] h-[auto] min-h-[650px] flex flex-col font-mono">
      {/* Terminal Header */}
      <div className="bg-[#E8E8E8] dark:bg-tailCall-darkMode---neutral-900 w-full rounded-t-2xl flex gap-2 items-center p-3">
        <div className="h-4 w-4 bg-tailCall-border-dark-1200 dark:bg-tailCall-dark-1300 rounded-full"></div>
        <div className="h-4 w-4 bg-tailCall-border-dark-1200 dark:bg-tailCall-dark-1400 rounded-full"></div>
        <div className="h-4 w-4 bg-tailCall-border-dark-1200 dark:bg-tailCall-darkMode---primary-400 rounded-full"></div>
      </div>
      <div ref={containerRef} className="bg-white dark:bg-tailCall-dark-1500 rounded-b-2xl text-sm h-full relative">
        <img src="/images/home/forgecode.gif" alt="Terminal" className="ml-0 hidden dark:block" />
        <img src="/images/home/forgecode-light.gif" alt="Terminal" className="ml-0 block dark:hidden" />
        {GUIDES.map(({title, details}) => {
          return (
            <div className="flex list-none ml-5 w-full">
              <span className="text-[#525252] dark:text-white font-space text-title-tiny font-normal w-2/5 inline-block">
                {title}
              </span>
              <span className="text-[#018284] dark:text-tailCall-darkMode---primary-400 font-space text-title-tiny font-normal leading-[150%] -tracking-[0.307px]">
                {details}
              </span>
            </div>
          )
        })}

        <div className="flex-1 text-white p-4 text-sm whitespace-pre-wrap">
          <div
            onClick={handleClick}
            className="bg-gradient-to-r p-[1px] rounded-lg mt-5 relative"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(37, 37, 37, 1) 0%, rgba(139, 139, 139, 1) 100%)",
            }}
          >
            <div className="bg-[#E2ECD5] dark:bg-tailCall-dark-1600 rounded-lg px-6 max-h-max">
              <img src="/images/home/terminal-text-icon.svg" alt="text" className="absolute left-0 h-fill-available" />
              <span className="text-tailCall-darkMode---neutral-600 dark:text-tailCall-dark-1700 font-space text-title-tiny font-normal">
                {typedText}
              </span>
              {startTyping && <span className="animate-pulse">|</span>}{" "}
            </div>
          </div>
          <div className="mt-3 space-y-1">
            {lines.map((line, idx) => (
              <div key={idx} className="text-[#525252] dark:text-[#B0BEC5]">
                {line?.includes("README") ? (
                  <span className="text-blue-400 underline cursor-pointer">{line}</span>
                ) : (
                  <span>{line}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerminalWithTabs
