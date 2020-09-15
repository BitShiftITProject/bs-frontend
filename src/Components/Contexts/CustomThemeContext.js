import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import getTheme from '../../Themes/themes'

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
  currentTheme: 'dark',
  setTheme: null,
})

const CustomThemeProvider = (props) => {
  const { children } = props

  // Read theme from local storage, with light theme as default
  const currentTheme = localStorage.getItem('theme') || 'light'

  // Theme name to get Theme object
  const [themeName, setThemeName] = useState(currentTheme)

  // Gets the Theme object, which will be passed into Material-UI ThemeProvider
  const theme = getTheme(themeName)

  // Sets the actual theme within local storage
  const setTheme = (name) => {
    localStorage.setItem('theme', name)
    setThemeName(name)
  }

  // To be called upon by other components, if need to use/change the theme
  const contextValue = {
    currentTheme: themeName,
    setTheme,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeProvider
