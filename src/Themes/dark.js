import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        //override the pseudo-classes
        '.Mui-disabled': { color: 'rgb(222,211,221)' }
      }
    }
  },
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
      lighter: '#5E5E6E',
      lightest: '#868698',
      dark: '#27272F',
      contrastText: '#fff'
    },
    secondary: {
      main: '#C9ADA7',
      light: '#968894',
      dark: '#C9ADA7',
      contrastText: '#000'
    },
    titleBar: {
      main: '#27272F',
      contrastText: '#fff'
    },
    success: {
      light: '#55BA81',
      main: '#387D52',
      dark: '#295F35',
      contrastText: '#fff'
    },
    error: {
      dark: '#89322b',
      main: '#B2544D',
      light: '#c17671',
      contrastText: '#fff'
    },
    info: {
      main: '#2BA9D4',
      contrastText: '#fff'
    },
    portfolioBorder: {
      hover: ' rgba(222,211,221,0.7)',
      main: ' rgba(146,146,155,0.5)'
    },
    iconButton: {
      main: '#5E5E6E',
      hover: '#868698',
      contrastText: '#fff'
    }
  }
})

export default theme
