import dark from './dark'
import light from './light'

// Imports all the themes within the same 'Themes' directory and allows for their
// theme colours to be retrieved immediately via getTheme()

// So ThemesContext.js will import getTheme from this file rather than importing the
// themes' JS files directly, then access the themes via getTheme()

const themes = {
  dark,
  light
}

export default function getTheme(theme) {
  return themes[theme]
}
