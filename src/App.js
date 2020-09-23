import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'
import CustomThemeProvider from './Components/Contexts/CustomThemeContext'

import ThemesProvider from './components/Contexts/ThemesContext'
import Authentication from './Authentication'
export default function App() {
  return (
    <ThemesProvider>
        <CssBaseline>
          <Authentication />
        </CssBaseline>
    </CustomThemeProvider>
    </ThemesProvider>
  )
}
