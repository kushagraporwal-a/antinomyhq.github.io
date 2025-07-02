import React, {useEffect, useRef, useState} from "react"
import Button from "./Button"

const fullText = `✅ Test Results  
  All 16 tests pass (100% success rate)

  src/App.test.tsx (16 tests) 455ms  
  Test Files 1 passed (1)  
  Tests 16 passed (16)

  🛠️ Additional Features  
  - Test utilities (src/test/test-utils.tsx) with helper functions  
  - Test documentation (src/test/README.md) with best practices  
  - Custom text matchers for complex DOM structures  
  - TypeScript support with proper type checking

  ▶️ Run Your Tests  
  npm test             # Run once  
  npm run test:ui      # Interactive UI  
  npm run test:coverage # With coverage report`

const TABS = ["Muse", "Forge"]

const TerminalWithTabs = (): JSX.Element => {
  const [displayedText, setDisplayedText] = useState("")
  const [startTyping, setStartTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentTab, setCurrentTab] = useState("Muse")

  useEffect(() => {
    if (!startTyping) return

    let index = 0
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index))
      index++
      if (index === fullText.length) {
        clearInterval(interval)
        setStartTyping(false)
      }
    }, 50) // typing speed in ms

    return () => clearInterval(interval)
  }, [startTyping])

  // Scroll to bottom whenever text updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedText])

  return (
    <div className="relative dark:bg-[#1E1C21] p-[2px] dark:bg-[linear-gradient(130deg,#30EDE6,#000000,#30EDE6B2)] rounded-2xl w-full md:w-fit lg:w-[450px] h-[600px] flex flex-col">
      <div className="flex items-center px-4 gap-1 bg-[#E8E8E8] dark:bg-[#19181B] h-10 rounded-t-2xl">
        <div className="h-4 w-4 rounded-full bg-[#5D5D5D] dark:bg-[#D9D9D9] opacity-50"></div>
        <div className="h-4 w-4 rounded-full bg-[#5D5D5D] dark:bg-[#D9D9D9] opacity-20"></div>
        <div className="h-4 w-4 rounded-full bg-[#5D5D5D] dark:bg-[#D9D9D9] opacity-10"></div>
      </div>
      <div className="flex bg-[#FFFFFF] dark:bg-[#1E1C21]">
        {TABS.map((tab, index) => {
          return (
            <Button variant="transparent" onClick={() => setCurrentTab(tab)} key={tab}>
              <div
                className={`px-3 py-2 flex justify-between items-center gap-3 min-w-max md:min-w-52  ${index === 0 ? "rounded-tr-3xl" : "rounded-t-2xl"} border border-solid ${tab === currentTab ? "dark:border-t-[#30EDE6] bg-[#F1F1F1] dark:bg-[#2C2931]" : "bg-[#FFFFFF] dark:bg-[#1E1C21]"} border-transparent`}
              >
                <span className="text-[#1B8783] dark:text-[#30EDE6] text-content-small font-space">{tab}</span>
                <div className="text-[#454545] dark:text-white">x</div>
              </div>
            </Button>
          )
        })}
      </div>
      <div ref={containerRef} className="dark:text-white bg-[#FFFFFF] dark:bg-[#1D1E22]  flex-1 p-5 overflow-auto">
        <div className="font-mono text-lg text-left whitespace-pre-wrap border p-4 rounded shadow">
          {displayedText}
          <span className="animate-pulse">|</span> {/* blinking cursor */}
        </div>
      </div>
      <div className="bg-[#E3E3E3] dark:bg-[#171619] py-4 px-5 w-full rounded-b-2xl flex items-center gap-3 overflow-scroll">
        <Button
          variant="transparent"
          onClick={() => {
            setDisplayedText("")
            setStartTyping(!startTyping)
          }}
        >
          <div className="cursor-pointer py-3 px-6 bg-[#FFFFFF82] dark:bg-[#FFFFFF1C] border-0 rounded-full font-space text-tailCall-text-gray-200 dark:text-white text-content-mini sm:text-content-small">
            /test
          </div>
        </Button>
        <Button onClick={() => {}} variant="transparent">
          <div className="cursor-pointer py-3 px-6 bg-[#FFFFFF82] dark:bg-[#FFFFFF1C] border-0 rounded-full font-space text-tailCall-text-gray-200 dark:text-white text-content-mini sm:text-content-small">
            /checkthelogic
          </div>
        </Button>
      </div>
    </div>
  )
}

export default TerminalWithTabs
