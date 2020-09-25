import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'

import ThemesProvider from './Components/Contexts/ThemesContext'
import LocaleProvider from './Components/Contexts/LocaleContext'

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
