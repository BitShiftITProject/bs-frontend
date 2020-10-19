import React, { useState } from 'react'

import { Grid, Paper } from '@material-ui/core'

import LandingContainer from './LandingContainer'
import SignupForm from './SignupForm'
import SignupVerifyEmail from './SignupVerifyEmail'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'

function Signup() {
  const [completed, setCompleted] = useState(false)
  const [email, setEmail] = useState('')

  const style = loggedOutStyles()

  const content = !completed ? (
    <SignupForm setCompleted={setCompleted} setEmail={setEmail} />
  ) : (
    <SignupVerifyEmail email={email} />
  )

  return (
    <LandingContainer
      content={
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={1} sm={2} lg={3}></Grid>
          <Grid item xs={10} sm={8} lg={6}>
            <Paper className={style.paper} style={{ padding: 32 }}>
              {content}
            </Paper>
          </Grid>
          <Grid item xs={1} sm={2} lg={3}></Grid>
        </Grid>
      }
    />
  )
}

export default Signup
