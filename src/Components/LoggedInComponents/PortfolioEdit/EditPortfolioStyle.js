import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { loggedInStyles } from '../../../Styles/loggedInStyles'

export default function EditPortfolioStyle() {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid container direction='row' spacing={0}>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Typography>Theme</Typography>
          <Typography>Font</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}
