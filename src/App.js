import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'

import ThemesProvider from './components/Contexts/ThemesContext'
export default function App() {
  return (
    <ThemesProvider>
      <CssBaseline>
        <Authentication />
      </CssBaseline>
    </ThemesProvider>
  )
}
