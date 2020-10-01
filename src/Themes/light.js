import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#EFF1F3',
      paper: '#DCE0E5'
    },
    primary: {
      main: '#223843',
      light: '#375B6D',
      dark: '#223843',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#D8B4A0',
      light: '#DBD3D8',
      dark: '#D8B4A0',
      contrastText: '#000000'
    },
    disabled: {},
    titleBar: {
      main: '#375B6D',
      contrastText: '#ffffff'
    },
    error: {
      main: '#A34329',
      contrastText: '#ffffff'
    },
    info: {
      main: '#3E667A',
      contrastText: '#ffffff'
    }
  }
})

export default theme
