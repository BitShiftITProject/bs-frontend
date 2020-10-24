import React, { useState, useEffect, createContext } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { getTheme } from '../../Themes/themes'
import {
  getPortfolio
  // getUserPortfolios
  // patchPortfolio
} from '../../Backend/Fetch'
import { useLocation } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
export const PublicThemesContext = createContext({
  publicTheme: 'light',
  setPublicTheme: null
})

const PublicThemesProvider = ({ children }) => {
  // Get current public portfolio URL
  const { pathname } = useLocation()

  // Theme name to get Theme object
  const [themeName, setThemeName] = useState('light')

  useEffect(() => {
    async function getCurrentPortfolioTheme() {
      // Gets the current theme from the portfolio object of the current
      // portfolio in the URL

      // const path = pathname.split('/')
      // if (path[1] === 'public') {
      //   const username = path[2]
      //   const portfolioIndex = path[3]
      //   const portfolios = await getUserPortfolios(username)
      //   const currentPortfolio = await getPortfolio(portfolios[portfolioIndex].id)
      //   const theme = currentPortfolio.theme
      //     ? currentPortfolio.theme
      //     : null || localStorage.getItem('publicTheme') || 'light'
      //   return theme
      // } else {

      // Gets the current theme from local storage

      const portfolioId = localStorage.getItem('portfolioId')
      const currentPortfolio = await getPortfolio(portfolioId)
      const theme = currentPortfolio.theme
        ? currentPortfolio.theme
        : null || localStorage.getItem('publicTheme') || 'light'
      return theme
      // }
    }

    getCurrentPortfolioTheme().then((theme) => {
      localStorage.setItem('publicTheme', theme)
      setThemeName(theme)
    })
  }, [pathname])

  // Gets the Theme object, which will be passed into Material-UI ThemeProvider
  const theme = getTheme(themeName)

  // Sets the actual theme
  const setPublicTheme = (name) => {
    // await patchPortfolio({ theme: name })
    localStorage.setItem('publicTheme', name)
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
