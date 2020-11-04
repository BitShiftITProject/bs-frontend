import React, { useContext } from 'react'
// import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
// import LandingContainer from './LandingContainer'
import {
  Typography,
  makeStyles,
  Grid
  // Grid
} from '@material-ui/core'
import clsx from 'clsx'
import { ThemesContext } from '../Contexts/ThemesContext'
import LandingContainer from './LandingContainer'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    paddingTop: '10%',
    //backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  image: {
    maxWidth: '50%',
    height: 'auto'
  },
  lightImage: {
    filter:
      'invert(99%) sepia(4%) saturate(239%) hue-rotate(249deg) brightness(117%) contrast(100%)'
  }
}))

export default function PublicPortfolioFailed() {
  const classes = useStyles()
  const { currentTheme: theme } = useContext(ThemesContext)

  const content = (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.content}
    >
      <Typography align='center' variant='h4' style={{ textTransform: 'lowercase' }}>
        Sorry! We could not find the specified portfolio
      </Typography>
      <Typography align='center' variant='h6' style={{ paddingTop: 8, textTransform: 'lowercase' }}>
        Please make sure you have the correct portfolio link before trying again
      </Typography>
      <center>
        <img
          className={theme === 'dark' ? clsx(classes.image, classes.lightImage) : classes.image}
          src={require('../../Images/404.png')}
          alt='not found'
        />
      </center>
    </Grid>
  )

  return <LandingContainer content={content} />
}
