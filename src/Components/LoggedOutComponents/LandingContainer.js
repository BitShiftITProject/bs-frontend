import React from 'react'

import { CssBaseline, Container, Paper } from '@material-ui/core'
import { loggedOutStyles } from '../../styles/loggedOutStyles'

export default function LandingContainer(props) {
  const classes = loggedOutStyles()

  // Placeholder variable for the component to be rendered (i.e. Login, Signup,
  // ForgotPassword)
  const { content } = props

  return (
    <Container component='main' className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>{content}</Paper>
    </Container>
  )
}
