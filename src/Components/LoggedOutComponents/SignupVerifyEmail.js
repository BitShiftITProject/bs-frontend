import React from 'react'
import { Fab, Grid } from '@material-ui/core'
// import { useIntl } from 'react-intl'
import DoneIcon from '@material-ui/icons/Done'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'

export default function SignupVerifyEmail({ email }) {
  const style = loggedOutStyles()
  // const intl = useIntl()
  return (
    <div className={style.signupDiv}>
      <Grid container direction='column' spacing={1} justify='center' alignItems='center'>
        <CursorTypography
          component='h1'
          variant='h5'
          style={{ marginBlockStart: 0, marginInlineStart: 0 }}
        >
          Verify your email address
        </CursorTypography>
        <Fab style={{ backgroundColor: 'lightgreen' }}>
          <DoneIcon />
        </Fab>
        <CursorTypography
          style={{ textAlign: 'center', lineHeight: 2.5 }}
          component='p'
          variant='subtitle1'
        >
          We have sent an email to <span style={{ fontWeight: 'bolder' }}>{email}</span> with a link
          to verify your new account (link valid for 24 hours)
          <br />
          <span style={{ fontWeight: 'bolder' }}>
            Once you activate your account, you will be able to log in.
          </span>
        </CursorTypography>
        <Fab
          type='button'
          variant='extended'
          size='medium'
          onClick={() => {
            window.location.href = '/login'
          }}
        >
          Log In
        </Fab>
      </Grid>
    </div>
  )
}
