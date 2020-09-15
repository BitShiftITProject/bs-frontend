import dark from './dark'
import light from './light'

const themes = {
  dark,
  light,
}

export default function getTheme(theme) {
  return themes[theme]
}
