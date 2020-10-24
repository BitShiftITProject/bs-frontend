import React from 'react'
import clsx from 'clsx'
import { useIntl } from 'react-intl'
import { Grid, Typography, Box } from '@material-ui/core'
import { NavLink, useHistory } from 'react-router-dom'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import LanguageButton from '../CommonComponents/LanguageButton'
import DarkAndLightModeButton from '../CommonComponents/DarkAndLightModeButton'
import EmojiHover from '../CommonComponents/EmojiHover'

export default function LandingContainer(props) {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedOutStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  // Placeholder variable for the component to be rendered (i.e. Login, Signup,
  // ForgotPassword)
  const { content } = props

  return (
    <Grid
      container
      direction='row'
      className={classes.background}
      style={{ height: '100%', flex: 1, flexWrap: 1, overflowY: 'scroll' }}
    >
      {/* LEFT PADDING */}
      <Grid item xs={false} md={2}></Grid>

      {/* CONTENT */}
      <Grid
        item
        container
        xs={12}
        md={8}
        direction='column'
        justify='flex-start'
        alignItems='center'
        className={classes.root}
      >
        {/* -------------------------------------------------------------------------- */}

        {/* NAVBAR (TOP) */}

        <Grid
          item
          xs={2}
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          className={classes.appBar}
        >
          {/*
           * LOGO
           */}
          <div
            className={classes.appBarTitle}
            onClick={() => {
              history.push('/')
            }}
          >
            <Typography variant='h4' component='h1'>
              bitspace
            </Typography>
            <Typography variant='h4' component='h2'>
              <EmojiHover />
            </Typography>
          </div>
          {/*
           * BUTTONS AND ICONS
           */}
          <div className={classes.appBarItems}>
            <Box display='flex' className={classes.appBarItemsContainer}>
              <NavLink exact to='/' className='normal'>
                <span>{intl.formatMessage({ id: 'home' })}</span>
              </NavLink>
              <NavLink exact to='/login' className='normal'>
                <span>{intl.formatMessage({ id: 'login' })}</span>
              </NavLink>
              <NavLink exact to='/signup' className='normal'>
                <span>{intl.formatMessage({ id: 'signUp' })}</span>
              </NavLink>
              <div className={clsx(classes.appBarItems, classes.appBarIcons)}>
                <Grid container spacing={1}>
                  <Grid item>
                    <DarkAndLightModeButton />
                  </Grid>
                  <Grid item>
                    <LanguageButton />
                  </Grid>
                </Grid>
              </div>
            </Box>
          </div>
        </Grid>

        {/* PAGE CONTENT (Below Navbar) */}

        <Grid item xs={10} container style={{ minWidth: '100%' }}>
          {content}
        </Grid>
      </Grid>

      {/* RIGHT PADDING */}
      <Grid item xs={false} md={2}></Grid>
    </Grid>
  )
}
