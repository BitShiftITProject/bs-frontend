import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'
import { Route, Switch, Redirect } from 'react-router-dom'

import ThemesProvider from './Components/Contexts/ThemesContext'
import LocaleProvider from './Components/Contexts/LocaleContext'

import PublicPortfolio from './Components/LoggedOutComponents/PublicPortfolio'
import PublicPortfolioFailed from './Components/LoggedOutComponents/PublicPortfolioFailed'

export default function App() {
  return (
    <ThemesProvider>
      <LocaleProvider>
        <CssBaseline>
          <Switch>
            <Route exact path='/publicfailed' component={PublicPortfolioFailed} />
            <Route exact path='/public/:username/:portfolio/:page' component={PublicPortfolio} />
            <Redirect from='/public/:username' to='/public/:username/0/0' />
            <Route component={Authentication} />
          </Switch>
        </CssBaseline>
      </LocaleProvider>
    </ThemesProvider>
  )
}
