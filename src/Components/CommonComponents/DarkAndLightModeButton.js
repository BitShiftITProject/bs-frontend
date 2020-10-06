import React, { useContext } from 'react'

import { Fab, makeStyles, Tooltip } from '@material-ui/core'
import { ThemesContext } from '../Contexts/ThemesContext'
import { useIntl } from 'react-intl'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
  fab: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    height: 40,
    width: 40,
    color: theme.palette.iconButton.contrastText,
    backgroundColor: theme.palette.iconButton.main,
    '&:hover': {
      backgroundColor: theme.palette.iconButton.hover
    }
  }
}))

export default function DarkAndLightModeButton() {
  const classes = useStyles()

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                    Theme                                   */
  /* -------------------------------------------------------------------------- */

  // Context passed down from ThemeProvider
  const { currentTheme: theme, setTheme } = useContext(ThemesContext)

  // Toggle between light and dark
  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Fab Icon                                  */
  /* -------------------------------------------------------------------------- */

  const themeIcon =
    theme === 'dark' ? (
      <span role='img' aria-label='dark mode moon'>
        🌙
      </span>
    ) : (
      <span role='img' aria-label='light mode sun'>
        ☀️
      </span>
    )

  return (
    <Tooltip title={intl.formatMessage({ id: 'toggleTheme' })}>
      <Fab onClick={toggleTheme} className={classes.fab} color='primary'>
        {themeIcon}
      </Fab>
    </Tooltip>
  )
}
