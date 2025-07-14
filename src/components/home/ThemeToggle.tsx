import React from "react"
import {useThemeContext} from "@site/src/theme/ThemeProvider/ThemeProvider"
import ReactGA from "react-ga4"

const ThemeToggle: React.FC = () => {
  const {theme, toggleTheme} = useThemeContext()

  const handleToggleTheme = () => {
    ReactGA.event({
      category: "Theme Toggle",
      action: "Click",
    })
    toggleTheme()
  }

  return (
    <button
      onClick={handleToggleTheme}
      aria-label="Toggle Theme"
      className="
        flex items-center justify-center
        p-[1px] bg-gradient-custom-diagonal border-none rounded-sm cursor-pointer
      "
    >
      <div className="bg-white dark:bg-black p-2">
        {theme !== "light" ? (
          <img src="/icons/basic/moon.svg" alt="moon" className="h-5 w-5" />
        ) : (
          <img src="/icons/basic/sun.svg" alt="moon" className="h-5 w-5" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
