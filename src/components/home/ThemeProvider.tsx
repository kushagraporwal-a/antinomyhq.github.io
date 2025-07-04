import React, {createContext, useContext, useEffect, useState} from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
})

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<Theme>("light")

  // Load from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    } else {
      // Default based on system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        setTheme("dark")
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  // Save to localStorage and update class on toggle
  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
