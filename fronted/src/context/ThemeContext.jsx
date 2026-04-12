import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => setIsDark(!isDark)

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      bg: '#0d0d0d',
      bg2: '#111',
      bg3: '#151515',
      border: '#2a2a2a',
      border2: '#1a1a1a',
      text: '#e5e5e5',
      textSub: '#888',
      textMuted: '#555',
      accent: '#1D9E75',
      accentDark: '#0F6E56',
      accentBg: '#0a1f18',
      codeBg: '#0d0d0d',
      codeColor: '#c8e6c9',
    } : {
      bg: '#ffffff',
      bg2: '#f9f9f9',
      bg3: '#f0f0f0',
      border: '#e5e5e5',
      border2: '#ececec',
      text: '#1a1a1a',
      textSub: '#555',
      textMuted: '#999',
      accent: '#0F6E56',
      accentDark: '#085041',
      accentBg: '#E1F5EE',
      codeBg: '#f5f5f5',
      codeColor: '#0F6E56',
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)