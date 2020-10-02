import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#22223B',
      paper: '#44475F'
    },
    primary: {
      main: '#161627',
      light: '#4A4E69',
      dark: '#161627',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#C9ADA7',
      light: '#F2E9E4',
      dark: '#C9ADA7',
      contrastText: '#000000'
    },
    disabled: {},
    titleBar: {
      main: '#2D2D4E',
      contrastText: '#ffffff'
    },
    error: {
      main: red[800],
      contrastText: '#ffffff'
    },
    info: {
      main: '#ffffff',
      contrastText: '#000000'
    }
  }
})

export default theme
