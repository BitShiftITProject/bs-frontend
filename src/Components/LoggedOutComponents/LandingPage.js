import React from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { Fab, Typography, makeStyles, Grid } from '@material-ui/core'
import LandingContainer from './LandingContainer'
import TextShuffle from '../CommonComponents/TextShuffle'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '100%'
  },

  heading1Container: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    // marginRight: theme.spacing(1.5),
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
    // marginLeft: theme.spacing(1.5),
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center'
      // marginLeft: 0
    }
  },

  contentHeading2: {
    // fontWeight: theme.typography.fontWeightBold,
    // color: theme.palette.secondary.light
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
    // [theme.breakpoints.only('sm')]: {
    //   justifyContent: 'center'
    // },

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
    // Change size of image by changing height and width
    minWidth: 450,
    maxWidth: '100%',
    height: '100%',

    // Change color of image by changing backgroundColor
    backgroundColor: theme.palette.text.primary,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    WebkitMaskImage: 'url("https://miro.medium.com/max/680/1*iqbSkjkrX-MG83gqKvfM7A.png")'
  }
}))

export default function LandingPage() {
  const intl = useIntl()
  const history = useHistory()
  const classes = useStyles()

  const content = (
    <Grid container direction='column' spacing={2}>
      <Grid
        item
        xs={4}
        className={classes.container}
        container
        justify='center'
        alignItems='flex-end'
      >
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
      <Grid
        item
        xs={2}
        className={classes.container}
        container
        spacing={2}
        direction='row'
        justify='center'
        alignItems='flex-start'
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
      <Grid
        item
        xs={5}
        className={classes.container}
        container
        justify='center'
        alignItems='center'
      >
        <span className={classes.image} />
      </Grid>
    </Grid>
  )

  return <LandingContainer content={content} />
}
