import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Grid } from '@material-ui/core'

export default function Loading({ message }) {
  return (
    <Grid
      container
      style={{ width: '100%' }}
      direction='row'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <CircularProgress color='secondary' />
      </Grid>
      <Grid item>
        <p>{message}</p>
      </Grid>
    </Grid>
  )
}