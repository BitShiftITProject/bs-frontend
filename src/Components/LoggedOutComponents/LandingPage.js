import React from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { Fab, Grid, Typography } from '@material-ui/core'
import LandingContainer from './LandingContainer'
import EmojiHover from '../CommonComponents/EmojiHover'

export default function LandingPage() {
  const intl = useIntl()
  const history = useHistory()
  const content = (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Grid
        item
        xs={12}
        container
        spacing={3}
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item container direction='column' justify='center' alignItems='center'>
          <Typography variant='h2' component='h1'>
            create + share <EmojiHover />
          </Typography>
        </Grid>
        <Grid item container spacing={2} direction='row' justify='center' alignItems='center'>
          <Grid item>
            <Fab
              size='medium'
              variant='extended'
              onClick={() => {
                history.push('/login')
              }}
            >
              {intl.formatMessage({ id: 'login' })}
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              size='medium'
              color='secondary'
              variant='extended'
              onClick={() => {
                history.push('/signup')
              }}
            >
              {intl.formatMessage({ id: 'signUp' })}
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
  return <LandingContainer content={content} />
}
