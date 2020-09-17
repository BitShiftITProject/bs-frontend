import React, { useEffect, useState } from 'react'
import { Grid, Paper, ButtonBase, Fab, makeStyles, Typography } from '@material-ui/core'

import { loggedInStyles } from '../loggedInStyles'
import { useHistory } from 'react-router-dom'

import { BACKEND, USERS } from '../../Endpoints'

const useStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                                Home Profile                                */
  /* -------------------------------------------------------------------------- */

  changeHeightAtSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },

  profileImage: {
    overflow: 'hidden',
    borderRadius: '50%',
    height: 200,
    width: 200
  },

  profileImg: {
    maxHeight: '100%',
    display: 'block'
  },

  profileName: {
    paddingTop: theme.spacing(3),
    fontWeight: 'lighter',
    paddingBottom: '5%',
    textAlign: 'center'
  },

  profileOccupation: {
    margin: '0 auto',
    textAlign: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
    borderRadius: '20px',
    cursor: 'pointer',
    ...theme.typography.button,
    width: '80%',
    backgroundColor: theme.palette.background.default
  },

  editProfileButton: {
    width: '75px !important'
  }
}))

export default function HomeProfile(props) {
  // Router hook to send user to some page.
  const history = useHistory()

  // Routes user to the user profile page, where a user can edit their profiles
  const handleClickProfile = () => {
    history.push('/profile')
  }

  // Contains all styling
  const classes = useStyles()

  // Adds flex spacing and aligning, otherwise identical to all other Paper components
  const leftPanel = loggedInStyles().leftPanel

  // Breakpoint sizes and click handler for profile picture and edit button
  const { xs, md, lg } = props

  // Fetching profile data
  const [profile, setProfile] = useState({ name: '' })

  // useEffect with an empty list as its second argument works like
  // componentDidMount, which runs once
  useEffect(() => {
    async function fetchUser() {
      const emailId = window.sessionStorage.getItem('emailId')
      const response = await fetch(BACKEND + USERS + '/' + emailId, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-type': 'application/json'
        }
      })
      const user = await response.json()
      return user
    }
    fetchUser().then((user) => setProfile({ name: user.first_name + ' ' + user.last_name }))
  }, [])

  return (
    <Grid item xs={xs} md={md} lg={lg}>
      <Paper className={leftPanel}>
        {/**
         * PROFILE PICTURE ICON
         */}
        <div className={classes.changeHeightAtSmall}>
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
          {profile.name}
        </Typography>
        {/**
         * EDIT PROFILE BUTTON
         */}
        <div className={classes.changeHeightAtSmall}>
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
