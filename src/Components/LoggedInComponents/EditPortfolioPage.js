import React from 'react'
import clsx from 'clsx'

import { loggedInStyles } from '../loggedInStyles'
import HeaderBreadcrumbs from './HeaderBreadcrumbs'
import EditPortfolioDropdown from './EditPortfolioDropdown'

import { Container, Grid, Typography, Paper } from '@material-ui/core'
import Sidebar from './Sidebar'

export default function EditPortfolioPage(props) {
  const classes = loggedInStyles()
  const profilePaper = clsx(classes.paper, classes.fixedHeight)

  const content = (
    <div>
      <Grid container direction='row' spacing={0}>
        <EditPortfolioDropdown />

        <Grid item xs={12} md={4} lg={3}>
          <Paper className={profilePaper}>
            <Grid
              item
              container
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
              xs={12}
              md={4}
              lg={3}
            >
              <Grid item>
                <Typography variant='h5' component='h5' className={classes.profileName}>
                  TITLE
              </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h5' component='h5' className={classes.profileName}>
                  EDUCATION STUFF
              </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          <Paper className={profilePaper}>
            <Grid item>
              <Typography variant='h5' component='h5' className={classes.profileName}>
                EDUCATION STUFdfgdfgdfgdfgdfgdfgdffffffffffffdsdvsdvsdvsdffffffffffffffffffffF
            </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
  return <Sidebar content={content} />
}
