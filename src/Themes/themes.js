import { createMuiTheme } from '@material-ui/core/styles'
import dark from './dark'
import light from './light'
import mutedLight from './mutedLight'

// Imports all the themes within the same 'Themes' directory and allows for their
// theme colours to be retrieved immediately via getTheme()

// So ThemesContext.js will import getTheme from this file rather than importing the
// themes' JS files directly, then access the themes via getTheme()

export const themes = {
  light,
  dark,
  mutedLight
}

export function getTheme(theme) {
  return createMuiTheme(themes[theme])
}
