import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'
import { Route, Switch, Redirect } from 'react-router-dom'

import ThemesProvider from './Components/Contexts/ThemesContext'
import LocaleProvider from './Components/Contexts/LocaleContext'
import PortfolioProvider from './Components/Contexts/PortfolioContext'
import PublicThemesProvider from './Components/Contexts/PublicThemesContext'

import PublicPortfolio from './Components/LoggedOutComponents/PublicPortfolio'
import PublicPortfolioFailed from './Components/LoggedOutComponents/PublicPortfolioFailed'

export default function App() {
  return (
            <Redirect from='/public/:portfolio' to='/public/:portfolio/0' />
            <Route exact path='/public/:portfolio/:page' component={PublicPortfolio} />
    <LocaleProvider>
      <PortfolioProvider>
        <Switch>
          <Route
            exact
            path='/publicfailed'
            render={() => (
              <ThemesProvider>
                <CssBaseline>
                  <PublicPortfolioFailed />
                </CssBaseline>
              </ThemesProvider>
            )}
          />
          <Route
            exact
            path='/public/:username/:portfolio/:page'
            render={(routeProps) => (
              <PublicThemesProvider>
                <CssBaseline>
                  <PublicPortfolio {...routeProps} />
                </CssBaseline>
              </PublicThemesProvider>
            )}
          />
          <Redirect from='/public/:username' to='/public/:username/0/0' />
          <Route
            render={() => (
              <ThemesProvider>
                <CssBaseline>
                  <Authentication />
                </CssBaseline>
              </ThemesProvider>
            )}
          />
        </Switch>
      </PortfolioProvider>
    </LocaleProvider>
  )
}
