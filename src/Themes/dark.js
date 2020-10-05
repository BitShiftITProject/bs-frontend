import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#32333D',
      paper: '#373740',
      paperLight: '#424250',
      paperHover: 'rgba(124,124,142,0.5)'
    },
    primary: {
      main: '#27272F',
      light: '#373740',
      dark: '#27272F',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#C9ADA7',
      light: '#968894',
      dark: '#C9ADA7',
      contrastText: '#000000'
    },
    disabled: {},
    titleBar: {
      main: '#27272F',
      contrastText: '#fff'
    },
    error: {
      main: '#B2544D',
      contrastText: '#fff'
    },
    info: {
      main: '#2BA9D4',
      contrastText: '#fff'
    },
    portfolioBorder: {
      hover: ' rgba(222,211,221,0.7)',
      main: ' rgba(146,146,155,0.5)'
    }
  }
})

export default theme
