import React, { useContext } from 'react'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { Fab, Typography, makeStyles, Grid } from '@material-ui/core'
import LandingContainer from './LandingContainer'
import TextShuffle from '../CommonComponents/TextShuffle'
import { ThemesContext } from '../Contexts/ThemesContext'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '100%',
    padding: 0
  },

  heading1Container: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    '& h1': {
      fontWeight: 700
    }
  },
  heading2Container: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'flex-start'
    }
  },
  textShuffleContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center'
    }
  },

  buttonsContainer: {
    [theme.breakpoints.between('sm', 'xl')]: {
      alignItems: 'flex-start'
    }
  },

  '@global': {
    '@keyframes hue': {
      from: {
        filter: 'hue-rotate(0deg)'
      },
      to: {
        filter: 'hue-rotate(-360deg)'
      }
    }
  },

  textShuffle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center'
    },

    '& div div': {
      color: '#f35626',
      backgroundImage: 'linear-gradient(92deg, #f35626, #feab3a)',
      WebkitBackgroundClip: 'text',
      textFillColor: 'transparent',
      animation: 'hue 10s infinite linear'
    }
  },

  fab: {
    '& .MuiFab-label': {
      textTransform: 'lowercase'
    }
  },

  image: {
    maxWidth: '100%',
    height: 'auto',
    userDrag: 'none',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    MsUserSelect: 'none'
  },

  lightImage: {
    filter:
      'invert(99%) sepia(4%) saturate(239%) hue-rotate(249deg) brightness(117%) contrast(100%)'
  }
}))

export default function LandingPage() {
  const classes = useStyles()
  const style = loggedOutStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                                    Theme                                   */
  /* -------------------------------------------------------------------------- */

  const { currentTheme: theme } = useContext(ThemesContext)

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    // Encloses 3 things currently: Heading, Buttons, Picture (each in
    // grids for responsive sizing and spacing)

    <Grid container style={{ flex: 1 }} direction='column' justify='center' spacing={2}>
      {/*
       * CENTER TEXT
       */}
      <Grid item className={classes.container} container justify='center' alignItems='flex-end'>
        <Grid item xs={12} container spacing={2} justify='center' alignItems='flex-end'>
          <Grid item xs={7} sm={4} container className={classes.heading1Container}>
            <Typography variant='h2' component='h1'>
              share
            </Typography>
          </Grid>
          <Grid item xs={5} sm={1} container className={classes.heading2Container}>
            <Typography variant='h2' component='h1'>
              to
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} container className={classes.textShuffleContainer}>
            <Typography variant='h2' component='h1'>
              <div className={classes.textShuffle}>
                <TextShuffle />
              </div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/*
       * BUTTONS (Login and Signup)
       */}
      <Grid
        item
        className={clsx(classes.container, classes.buttonsContainer)}
        container
        spacing={2}
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid item>
          <Fab
            className={classes.fab}
            size='medium'
            variant='extended'
            onClick={() => {
              history.push('/login')
            }}
          >
            {intl.formatMessage({ id: 'login' })}
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            className={classes.fab}
            size='medium'
            color='secondary'
            variant='extended'
            onClick={() => {
              history.push('/signup')
            }}
          >
            {intl.formatMessage({ id: 'signUp' })}
          </Fab>
        </Grid>
      </Grid>
      {/*
       * PICTURE
       */}
      <Grid item className={classes.container} container justify='center' alignItems='center'>
        <img
          className={theme === 'dark' ? clsx(classes.image, classes.lightImage) : classes.image}
          src={require('../../Images/landingPage.png')}
          alt='bitspace'
        />
      </Grid>
    </Grid>
  )

  return <LandingContainer content={<div className={style.centerContainer}>{content}</div>} />
}
