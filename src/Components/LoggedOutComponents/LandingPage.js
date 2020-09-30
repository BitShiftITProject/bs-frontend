import React from 'react'
import { useIntl } from 'react-intl'

import { Fab, Grid, Typography } from '@material-ui/core'
import LandingContainer from './LandingContainer'

export default function LandingPage() {
  const intl = useIntl()
  const content = (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Grid
        item
        xs={6}
        container
        spacing={3}
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h2' component='h1'>
            create + share
          </Typography>
        </Grid>
        <Grid item>
          <Fab size='medium' color='secondary' variant='extended'>
            {intl.formatMessage({ id: 'signUp' })}
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  )
  return <LandingContainer content={content} />
}
