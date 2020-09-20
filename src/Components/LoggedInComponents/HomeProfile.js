import React, { useEffect, useState } from 'react'
import { Grid, Paper, ButtonBase, Fab, makeStyles, Typography } from '@material-ui/core'

import { loggedInStyles } from '../../Styles/loggedInStyles'
import { useHistory } from 'react-router-dom'

import { BACKEND, USERS } from '../../Backend/Endpoints'

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
    width: 200,
    [theme.breakpoints.between('xs', 'xs')]: {
      transform: 'scale(0.7)'
    }
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
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [profile, setProfile] = useState({ name: '' })

  /* -------------------------------------------------------------------------- */
  /*                                   Routing                                  */
  /* -------------------------------------------------------------------------- */

  // Router hook to send user to some page.
  const history = useHistory()

  // Routes user to the user profile page, where a user can edit their profiles
  const handleClickProfile = () => {
    history.push('/profile')
  }

  /* -------------------------------------------------------------------------- */
  /*                          Fetching User's Full Name                         */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  // Contains all styling
  const classes = useStyles()

  // Adds flex spacing and aligning, otherwise identical to all other Paper components
  const leftPanel = loggedInStyles().leftPanel

  // Breakpoint sizes and click handler for profile picture and edit button
  const { xs, md, lg } = props

  return (
    <Grid item xs={xs} md={md} lg={lg}>
      <Paper className={leftPanel}>
        {/**
         * PROFILE PICTURE ICON
         */}
        <Grid
          container
          style={{ width: '100%', height: '100%' }}
          alignItems='center'
          justify='center'
        >
          <Grid container justify='center' alignItems='center' item xs={7} md={12}>
            <ButtonBase className={classes.profileImage} onClick={handleClickProfile}>
              <img
                className={classes.profileImg}
                src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F89%2FPortrait_Placeholder.png&f=1&nofb=1'
                alt='placeholder'
              />
            </ButtonBase>
          </Grid>
          {/**
           * USER FULL NAME
           */}
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            item
            xs={5}
            md={12}
          >
            <Typography variant='h5' component='h5' className={classes.profileName}>
              {profile.name}
            </Typography>
            {/**
             * EDIT PROFILE BUTTON
             */}
            <Fab
              className={classes.editProfileButton}
              variant='extended'
              size='small'
              aria-label='edit profile'
              onClick={handleClickProfile}
            >
              Edit
            </Fab>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
