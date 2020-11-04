import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'
import { Route, Switch, Redirect } from 'react-router-dom'
// import { Scrollbars } from 'react-custom-scrollbars'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query-devtools'

import ThemesProvider from './Components/Contexts/ThemesContext'
import LocaleProvider from './Components/Contexts/LocaleContext'
import PublicThemesProvider from './Components/Contexts/PublicThemesContext'

import PublicPortfolio from './Components/LoggedOutComponents/PublicPortfolio'
import PublicPortfolioFailed from './Components/LoggedOutComponents/PublicPortfolioFailed'

const queryCache = new QueryCache()

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemesProvider>
        <CssBaseline>
          <LocaleProvider>
            <Switch>
              <Route exact path='/publicfailed' render={() => <PublicPortfolioFailed />} />
              <Route
                exact
                path='/public/:portfolio/:page'
                render={(routeProps) => (
                  <PublicThemesProvider>
                    <CssBaseline>
                      <PublicPortfolio {...routeProps} />
                    </CssBaseline>
                  </PublicThemesProvider>
                )}
              />
              <Redirect from='/public/:portfolio' to='/public/:portfolio/0' />
              <Route render={() => <Authentication />} />
            </Switch>
          </LocaleProvider>
        </CssBaseline>
      </ThemesProvider>
    </ReactQueryCacheProvider>
  )
}
