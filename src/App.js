import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'
import { Route, Switch, Redirect } from 'react-router-dom'
// import { Scrollbars } from 'react-custom-scrollbars'

import ThemesProvider from './Components/Contexts/ThemesContext'
import LocaleProvider from './Components/Contexts/LocaleContext'
import PortfolioProvider from './Components/Contexts/PortfolioContext'
import PublicThemesProvider from './Components/Contexts/PublicThemesContext'

import PublicPortfolio from './Components/LoggedOutComponents/PublicPortfolio'
import PublicPortfolioFailed from './Components/LoggedOutComponents/PublicPortfolioFailed'
import DropzoneButton from './Components/CommonComponents/DropzoneButton'
import TextEditor from './Components/TextEditor'

export default function App() {
  return (
    <ThemesProvider>
      <CssBaseline>
        <LocaleProvider>
          <PortfolioProvider>
            <Switch>
              <Route exact path='/editor' render={() => <TextEditor />} />
              <Route exact path='/dropzone' render={() => <DropzoneButton />} />
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
          </PortfolioProvider>
        </LocaleProvider>
      </CssBaseline>
    </ThemesProvider>
  )
}
