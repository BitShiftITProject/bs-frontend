import React from 'react'
import { Fab, Grid } from '@material-ui/core'
// import { useIntl } from 'react-intl'
import DoneIcon from '@material-ui/icons/Done'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import { useFormStore } from '../../Hooks/Store'
import { useIntl } from 'react-intl'

export default function SignupVerifyEmail() {
  const email = useFormStore((state) => state.email)
  const intl = useIntl()

  const style = loggedOutStyles()
  return (
    <div className={style.signupDiv}>
      <Grid container direction='column' spacing={1} justify='center' alignItems='center'>
        <CursorTypography
          component='h1'
          variant='h5'
          style={{ marginBlockStart: 0, marginInlineStart: 0, paddingTop: 16 }}
        >
          {intl.formatMessage({ id: 'verifyEmail' })}
        </CursorTypography>
        <Fab style={{ backgroundColor: 'lightgreen' }}>
          <DoneIcon />
        </Fab>
        <CursorTypography
          style={{ textAlign: 'center', lineHeight: 2.5 }}
          component='p'
          variant='subtitle1'
        >
          {intl.formatMessage(
            { id: 'verifyLink' },
            { email: <span style={{ fontWeight: 'bolder' }}>{email}</span> }
          )}
          <br />
          <span style={{ fontWeight: 'bolder' }}>
            {intl.formatMessage({ id: 'logInAfterActivate' })}
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
