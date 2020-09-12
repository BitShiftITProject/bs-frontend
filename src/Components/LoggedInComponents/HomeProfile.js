import React from 'react'
import { Grid, Paper, ButtonBase, Typography, Fab } from '@material-ui/core'
import clsx from 'clsx'

import { loggedInStyles } from '../loggedInStyles'
import { useHistory } from 'react-router-dom'

export default function HomeProfile(props) {
  // Router hook to send user to some page.
  const history = useHistory()

  // Routes user to the user profile page, where a user can edit their profiles
  const handleClickProfile = () => {
    history.push('/profile')
  }

  // Contains all styling
  const classes = loggedInStyles()

  // Adds flex spacing and aligning, otherwise identical to all other Paper components
  const profilePaper = clsx(classes.paper, classes.fixedHeight, classes.profileContainer)

  // Breakpoint sizes and click handler for profile picture and edit button
  const { xs, md, lg } = props

  return (
    <Grid item xs={xs} md={md} lg={lg}>
      <Paper className={profilePaper}>
        {/**
         * PROFILE PICTURE ICON
         */}
        <div className={classes.profileContainer}>
          <ButtonBase className={classes.profileImage} onClick={handleClickProfile}>
            <img
              className={classes.profileImg}
              src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F89%2FPortrait_Placeholder.png&f=1&nofb=1'
              alt='placeholder'
            />
          </ButtonBase>
        </div>
        {/**
         * USER FULL NAME
         */}
        <Typography variant='h5' component='h5' className={classes.profileName}>
          John Smith
        </Typography>
        {/**
         * EDIT PROFILE BUTTON
         */}
        <div className={classes.profileContainer}>
          <Fab
            className={classes.editProfileButton}
            variant='extended'
            size='small'
            aria-label='edit profile'
            onClick={handleClickProfile}
          >
            Edit
          </Fab>
        </div>
      </Paper>
    </Grid>
  )
}
