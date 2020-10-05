import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
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
      dark: '#294451',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#D8B4A0',
      light: '#F3D6CE',
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
      main: '#4CAFA5',
      contrastText: '#ffffff'
    },
    portfolioBorder: {
      hover: ' rgba(55,91,109,1)',
      main: ' rgba(55,91,109,0.5)'
    }
  }
})

export default theme
