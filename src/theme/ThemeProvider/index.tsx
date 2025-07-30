import React, {createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode} from "react"
import type {Props} from "@theme/ThemeProvider"
import ThemeProviderTitleFormatter from "./TitleFormatter"

type ResolvedTheme = "light" | "dark"
type Theme = ResolvedTheme | "system"

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = "app.theme"

export default function ThemeProvider({children}: Props): ReactNode {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "system"
  })

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const updateResolved = () => {
      const actualTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme

      setResolvedTheme(actualTheme)

      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(actualTheme)
      document.documentElement.dataset.theme = actualTheme
    }

    updateResolved()

    if (theme === "system") {
      media.addEventListener("change", updateResolved)
      return () => media.removeEventListener("change", updateResolved)
    }
  }, [theme])

  const setThemeAndStore = (newTheme: Theme) => {
    localStorage.setItem(STORAGE_KEY, newTheme)
    setTheme(newTheme)
  }

  const value = useMemo(() => ({theme, resolvedTheme, setTheme: setThemeAndStore}), [theme, resolvedTheme])

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProviderTitleFormatter> {children}</ThemeProviderTitleFormatter>
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
