import React from 'react'
import Authentication from './Authentication'
import { CssBaseline } from '@material-ui/core'
import CustomThemeProvider from './Components/Contexts/CustomThemeContext'

export default function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline>
        <Authentication />
      </CssBaseline>
    </CustomThemeProvider>
  )
}
