import React from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { Fab, Grid, Typography, makeStyles } from '@material-ui/core'
import LandingContainer from './LandingContainer'
import TextShuffle from '../CommonComponents/TextShuffle'

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    [theme.breakpoints.between('lg', 'xl')]: {
      width: '80%'
    }
  },
  contentHeading1: {
    textAlign: 'right',
    // fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.only('xs')]: {
      marginRight: theme.spacing(1.5)
    },
    [theme.breakpoints.only('sm')]: {
      marginRight: theme.spacing(1.5)
    }
    // color: theme.palette.secondary.main
  },

  contentHeading2: {
    textAlign: 'center',
    // fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'left'
    },
    [theme.breakpoints.only('sm')]: {
      textAlign: 'left'
    }

    // color: theme.palette.secondary.light
  },

  textShuffle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.only('sm')]: {
      justifyContent: 'center'
    }
  },

  fab: {
    '& .MuiFab-label': {
      textTransform: 'lowercase'
    }
  }
}))

export default function LandingPage() {
  const intl = useIntl()
  const history = useHistory()
  const classes = useStyles()
  const content = (
    <Grid
      item
      xs={12}
      container
      spacing={3}
      direction='column'
      justify='center'
      alignItems='center'
    >
      <Grid
        item
        container
        className={classes.contentContainer}
        direction='row'
        justify='center'
        alignItems='center'
        spacing={1}
      >
        <Grid item xs={7} md={4}>
          <Typography variant='h2' component='h1' className={classes.contentHeading1}>
            share
          </Typography>
        </Grid>
        <Grid item xs={5} md={1}>
          <Typography variant='h2' component='h1' className={classes.contentHeading2}>
            to
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h2' component='h1'>
            <div className={classes.textShuffle}>
              <TextShuffle />
            </div>
          </Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2} direction='row' justify='center' alignItems='center'>
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
    </Grid>
  )
  return <LandingContainer content={content} />
}
