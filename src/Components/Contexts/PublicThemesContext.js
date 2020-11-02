import React, { useState, useEffect, createContext } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { getTheme } from '../../Themes/themes'
import { getPortfolio } from '../../Backend/Fetch'
import { useLocation } from 'react-router-dom'
import { useStore } from '../../Hooks/Store'
import usePortfolio from '../../Hooks/usePortfolio'

const portfolioIdSelector = (state) => state.portfolioId

// eslint-disable-next-line no-unused-vars
export const PublicThemesContext = createContext({
  publicTheme: 'light',
  setPublicTheme: null
})

const PublicThemesProvider = ({ children }) => {
  // Theme name to get Theme object
  const [themeName, setThemeName] = useState('light')
  const portfolioId = useStore(portfolioIdSelector)
  const { data: currentPortfolio } = usePortfolio(portfolioId)

  useEffect(() => {
    async function getCurrentPortfolioTheme() {
      // Gets the current theme from the portfolio object of the current
      // portfolio in the URL

      const theme = currentPortfolio
        ? currentPortfolio.theme || currentPortfolio.theme !== undefined
          ? currentPortfolio.theme
          : null || window.sessionStorage.getItem('publicTheme') || 'light'
        : window.sessionStorage.getItem('publicTheme') || 'light'

      return theme
    }

    if (portfolioId) {
      getCurrentPortfolioTheme().then((theme) => {
        // console.log('Theme:', theme)
        window.sessionStorage.setItem('publicTheme', theme)
        setThemeName(theme)
      })
    }
  }, [portfolioId, currentPortfolio])

  // Gets the Theme object, which will be passed into Material-UI ThemeProvider
  const theme = getTheme(themeName)

  // Sets the actual theme
  const setPublicTheme = (name) => {
    // await patchPortfolio({ theme: name })
    window.sessionStorage.setItem('publicTheme', name)
    setThemeName(name)
  }

  // To be called upon by other components, if need to use/change the theme
  const contextValue = {
    publicTheme: themeName,
    setPublicTheme
  }

  return (
    <PublicThemesContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PublicThemesContext.Provider>
  )
}

export default PublicThemesProvider
