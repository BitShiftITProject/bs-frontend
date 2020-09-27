import React, { useContext } from 'react'

import { IconButton } from '@material-ui/core'
import { ThemesContext } from '../Contexts/ThemesContext'

export default function DarkAndLightModeButton() {
  const { currentTheme: theme, setTheme } = useContext(ThemesContext)

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  const themeIcon =
    theme === 'dark' ? (
      <span role='img' aria-label='dark mode moon'>
        🌙
      </span>
    ) : (
      <span role='img' aria-label='light mode sun'>
        ☀️
      </span>
    )

  return (
    <div>
      <IconButton onClick={toggleTheme} style={{ height: 40, width: 40 }} color='inherit'>
        {themeIcon}
      </IconButton>
    </div>
  )
}
