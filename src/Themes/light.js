import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        //override the pseudo-classes
        '.Mui-disabled': { color: '#375B6D' }
      }
    }
  },
  palette: {
    background: {
      default: '#F7F7F8',
      paper: '#F0F0F0',
      paperLight: '#e9e9e9',
      paperHover: '#e3e3e3'
    },
    primary: {
      main: '#294451',
      light: '#375B6D',
      lighter: '#718798',
      lightest: '#899BA9',
      dark: '#294451',
      contrastText: '#fff'
    },
    secondary: {
      main: '#D8B4A0',
      light: '#F3D6CE',
      dark: '#D8B4A0',
      contrastText: '#000'
    },

    titleBar: {
      main: '#375B6D',
      contrastText: '#fff'
    },
    success: {
      main: '#0B6E4F',
      contrastText: '#fff'
    },
    error: {
      dark: '#8c2d14',
      main: '#A34329',
      light: '#cc5433',
      contrastText: '#fff'
    },
    info: {
      main: '#4CAFA5',
      contrastText: '#fff'
    },

    portfolioBorder: {
      hover: ' rgba(55,91,109,1)',
      main: ' rgba(55,91,109,0.5)'
    },
    iconButton: {
      main: '#3E667A',
      hover: '#6A9BB4',
      contrastText: '#fff'
    }
  }
})

export default theme
