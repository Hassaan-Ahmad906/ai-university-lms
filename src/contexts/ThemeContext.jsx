import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'pu-lms-theme'
const DEFAULT_THEME = 'dark'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') return stored
    } catch {
      // localStorage unavailable
    }
    return DEFAULT_THEME
  })

  // Apply theme attribute to <html> whenever it changes
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)

    // Also set color-scheme for native form control styling
    root.style.colorScheme = theme

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage unavailable
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setDark = useCallback(() => setTheme('dark'), [])
  const setLight = useCallback(() => setTheme('light'), [])

  const isDark = theme === 'dark'

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      setDark,
      setLight,
    }),
    [theme, isDark, toggleTheme, setDark, setLight]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
