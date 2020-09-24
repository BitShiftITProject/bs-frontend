import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'

import ThemesProvider from './components/Contexts/ThemesContext'
import LocaleProvider from './components/Contexts/LocaleContext'

export default function App() {
  return (
    <ThemesProvider>
      <LocaleProvider>
        <CssBaseline>
          <Authentication />
        </CssBaseline>
      </LocaleProvider>
    </ThemesProvider>
  )
}
