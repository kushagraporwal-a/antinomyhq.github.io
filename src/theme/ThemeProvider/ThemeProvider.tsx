import React, {createContext, useContext, useEffect, useState} from "react"

type Theme = "light" | "dark" | undefined

interface ThemeContextType {
  theme: Theme | null
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Cookie-based theme storage
class ThemeStorage {
  private static COOKIE_NAME = "theme-preference"

  // Set theme in cookie
  static setTheme(theme: Theme): void {
    if (typeof window === "undefined" || !theme) return

    try {
      document.cookie = `${this.COOKIE_NAME}=${theme};path=/;max-age=31536000;SameSite=Strict`
    } catch (error) {
      console.warn("Failed to save theme preference:", error)
    }
  }

  // Get theme from cookie
  static getTheme(): Theme | null {
    if (typeof window === "undefined") return null

    try {
      const cookies = document.cookie.split(";")
      const themeCookie = cookies.find(cookie => 
        cookie.trim().startsWith(`${this.COOKIE_NAME}=`)
      )
      if (themeCookie) {
        const theme = themeCookie.split("=")[1] as Theme
        if (theme === "dark" || theme === "light") {
          return theme
        }
      }
      return null
    } catch (error) {
      console.warn("Failed to read theme preference:", error)
      return null
    }
  }

  // Clear theme cookie
  static clearTheme(): void {
    if (typeof window === "undefined") return

    try {
      document.cookie = `${this.COOKIE_NAME}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`
    } catch (error) {
      console.warn("Failed to clear theme preference:", error)
    }
  }
}

// Apply theme to DOM immediately
function applyThemeToDOM(theme: Theme): void {
  if (typeof window === "undefined") return
  
  // Add smooth transition class
  document.documentElement.classList.add("theme-transition")
  
  // Apply theme class
  document.documentElement.classList.toggle("dark", theme === "dark")
  
  // Remove transition class after animation
  setTimeout(() => {
    document.documentElement.classList.remove("theme-transition")
  }, 300)
}

// Get initial theme with immediate DOM application
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"

  // Try to get stored theme from cookie
  const storedTheme = ThemeStorage.getTheme()
  if (storedTheme) {
    applyThemeToDOM(storedTheme)
    return storedTheme
  }

  // Default to dark theme
  const defaultTheme: Theme = "dark"
  applyThemeToDOM(defaultTheme)
  ThemeStorage.setTheme(defaultTheme)
  return defaultTheme
}

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Initialize theme on client side
  useEffect(() => {
    setIsClient(true)
    const initialTheme = getInitialTheme()
    setTheme(initialTheme)
  }, [])

  // Add smooth transition styles
  useEffect(() => {
    if (!isClient) return

    const style = document.createElement("style")
    style.textContent = `
      html.theme-transition,
      html.theme-transition *,
      html.theme-transition *:before,
      html.theme-transition *:after {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [isClient])

  // Handle theme changes
  useEffect(() => {
    if (theme && isClient) {
      applyThemeToDOM(theme)
      ThemeStorage.setTheme(theme)
    }
  }, [theme, isClient])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light"
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {isClient && theme ? (
        children
      ) : (
        <div className="h-screen w-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center transition-colors duration-300">
          Loading...
        </div>
      )}
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
