import React, {createContext, useContext, useEffect, useState} from "react"

type Theme = "light" | "dark" | undefined

interface ThemeContextType {
  theme: Theme | null
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<Theme | null>(undefined)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme)
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const systemTheme: Theme = prefersDark ? "dark" : "light"
    setTheme(systemTheme)
    localStorage.setItem("theme", systemTheme)
  }, [])

  // ✅ Sync DOM class and localStorage when theme changes
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark")
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {theme ? children : <div className="h-screen w-full text-black flex items-center justify-center">Loading</div>}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider")
  }
  return context
}
