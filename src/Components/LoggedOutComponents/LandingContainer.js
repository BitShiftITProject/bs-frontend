import React from 'react'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { Grid, Typography } from '@material-ui/core'
import { NavLink, useHistory } from 'react-router-dom'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import LanguageButton from '../CommonComponents/LanguageButton'
import DarkAndLightModeButton from '../CommonComponents/DarkAndLightModeButton'

export default function LandingContainer(props) {
  const classes = loggedOutStyles()
  const history = useHistory()
  const intl = useIntl()

  // Placeholder variable for the component to be rendered (i.e. Login, Signup,
  // ForgotPassword)
  const { content } = props

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      justify='flex-start'
      alignItems='center'
      className={classes.root}
    >
      <Grid
        item
        xs={1}
        container
        flexDirection='row'
        justify='space-between'
        className={classes.appBar}
      >
        <div
          className={classes.appBarTitle}
          onClick={() => {
            history.push('/')
          }}
        >
          <Typography variant='h5' component='h1'>
            bitshift
          </Typography>
        </div>
        <div className={classes.appBarItems}>
          <NavLink exact to='/' className='normal'>
            <span>{intl.formatMessage({ id: 'home' })}</span>
          </NavLink>
          <NavLink exact to='/login' className='special'>
            <span>{intl.formatMessage({ id: 'login' })}</span>
          </NavLink>
          <NavLink exact to='/signup' className='special'>
            <span>{intl.formatMessage({ id: 'signUp' })}</span>
          </NavLink>
          <div className={clsx(classes.appBarItems, classes.appBarIcons)}>
            <DarkAndLightModeButton />
            <LanguageButton />
          </div>
        </div>
      </Grid>
      <Grid item xs={11} container>
        {content}
      </Grid>
    </Grid>
  )
}
