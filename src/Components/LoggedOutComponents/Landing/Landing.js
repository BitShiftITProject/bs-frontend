import React from 'react'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Container,
  Grid,
  Typography,
} from '@material-ui/core'

import { loggedOutStyles } from '../../loggedOutStyles'

export default function Landing(props) {
  const classes = loggedOutStyles()
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
