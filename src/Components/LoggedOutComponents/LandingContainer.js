import React from 'react'

import { CssBaseline, Paper, Grid, Box } from '@material-ui/core'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import DarkAndLightModeButton from '../CommonComponents/DarkAndLightModeButton'

export default function LandingContainer(props) {
  const classes = loggedOutStyles()
  // Placeholder variable for the component to be rendered (i.e. Login, Signup,
  // ForgotPassword)
  const { content } = props

  return (
    <div className={classes.root} style={{ flexDirection: 'column' }}>
      <CssBaseline />
      <Box
        display={{ xs: 'none', sm: 'flex' }}
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <DarkAndLightModeButton />
      </Box>
      <Grid
        style={{ height: '100%', width: '100%' }}
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Paper className={classes.paper}>{content}</Paper>
      </Grid>
    </div>
  )
}
