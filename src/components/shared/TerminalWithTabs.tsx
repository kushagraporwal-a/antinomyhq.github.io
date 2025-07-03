import React, {useEffect, useRef, useState} from "react"
import {COMMANDS} from "@site/src/constants"

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
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [typedText, lines])

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
    <div className="relative bg-[#1E1C21] p-[1px] bg-custom-diagonal rounded-2xl w-full md:w-4/5 lg:w-[500px] h-[650px] flex flex-col font-mono">
      {/* Terminal Header */}
      <div className="bg-[#18171A] rounded-2xl text-[#30EDE6] text-sm h-full overflow-scroll relative">
        <div className="bg-[#18171A] sticky top-0 rounded-t-2xl flex gap-2 items-center p-3">
          <div className="h-4 w-4 bg-[#D9D9D9] opacity-50 rounded-full"></div>
          <div className="h-4 w-4 bg-[#D9D9D9] opacity-20 rounded-full"></div>
          <div className="h-4 w-4 bg-[#D9D9D9] opacity-10 rounded-full"></div>
        </div>
        <div className="text-white mt-10">
          <img src="/images/terminal.png" alt="Terminal" />
        </div>
        <div
          ref={containerRef}
          className="flex-1 bg-[#18171A] text-white p-4 overflow-y-auto text-sm whitespace-pre-wrap"
        >
          <div className="text-[#30EDE6]">
            <span className="mr-1">&gt;</span>
            {typedText}
            {startTyping && <span className="animate-pulse">|</span>}
          </div>

          <div className="mt-3 space-y-1">
            {lines.map((line, idx) => (
              <div key={idx} className="text-[#B0BEC5]">
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
