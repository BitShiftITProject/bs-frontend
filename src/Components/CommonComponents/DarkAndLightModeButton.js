import React, { useContext } from 'react'

import { Fab, makeStyles } from '@material-ui/core'
import { ThemesContext } from '../Contexts/ThemesContext'

const useStyles = makeStyles((theme) => ({
  fab: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    height: 40,
    width: 40,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
}))

export default function DarkAndLightModeButton() {
  const { currentTheme: theme, setTheme } = useContext(ThemesContext)
  const classes = useStyles()

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

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
    <Fab onClick={toggleTheme} className={classes.fab} color='primary'>
      {themeIcon}
    </Fab>
  )
}
