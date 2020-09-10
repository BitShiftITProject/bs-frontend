import React from 'react'
import { Grid, Paper, ButtonBase, Typography, Fab } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from '../../useStyles'

export default function HomeProfile(props) {
  const classes = useStyles()
  const profilePaper = clsx(classes.paper, classes.fixedHeight, classes.profileContainer)

  const { xs, md, lg } = props

  return (
    <Grid item xs={xs} md={md} lg={lg}>
      <Paper className={profilePaper}>
        <Grid item>
          <div className={classes.profileContainer}>
            <ButtonBase className={classes.profileImage}>
              <img
                className={classes.profileImg}
                src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F89%2FPortrait_Placeholder.png&f=1&nofb=1'
                alt='placeholder'
              />
            </ButtonBase>
          </div>
          <Typography variant='h5' component='h5' className={classes.profileName}>
            Mahardini Rizky Putri
          </Typography>
          <div className={classes.profileContainer}>
            <Fab
              className={classes.editProfile}
              variant='extended'
              size='small'
              aria-label='edit profile'
            >
              Edit
            </Fab>
          </div>
        </Grid>
      </Paper>
    </Grid>
  )
}
