import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Grid } from '@material-ui/core'

export default function Loading({ message, vertical }) {
  return (
    <Grid
      container
      style={{ width: '100%', height: '100%' }}
      direction={vertical ? 'column' : 'row'}
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color='secondary' />
      </Grid>
      <Grid item>
        <p>{message}</p>
      </Grid>
    </Grid>
  )
}
