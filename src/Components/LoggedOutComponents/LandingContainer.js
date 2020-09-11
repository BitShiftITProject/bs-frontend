import React from 'react'

import { CssBaseline, Container, Grid } from '@material-ui/core'
import { loggedOutStyles } from '../loggedOutStyles'

export default function LandingContainer(props) {
  const classes = loggedOutStyles()

  // Placeholder variable for the component to be rendered (i.e. Login, Signup,
  // ForgotPassword)
  const { content } = props

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Grid container justify='center' alignItems='center' className={classes.paper}>
        {content}
      </Grid>
    </Container>
  )
}
