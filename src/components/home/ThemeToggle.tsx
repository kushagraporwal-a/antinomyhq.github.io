import React from "react"
import {useThemeContext} from "@site/src/theme/ThemeProvider/ThemeProvider"
import {Sun, Moon} from "lucide-react"

const ThemeToggle: React.FC = () => {
  const {theme, toggleTheme} = useThemeContext()
  console.log('theme: ', theme);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="
        flex items-center justify-center
        p-2 rounded
        border border-tailCall-gray
        bg-tailCall-light-200 dark:bg-tailCall-dark-200
        text-tailCall-gray dark:text-tailCall-white
        transition-colors duration-300
        hover:bg-tailCall-light-300 dark:hover:bg-tailCall-dark-300
      "
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  )
}

export default ThemeToggle
