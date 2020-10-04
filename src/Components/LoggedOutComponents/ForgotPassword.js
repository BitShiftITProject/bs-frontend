import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { withStyles, styled } from '@material-ui/core/styles'
import { TextField, Fab, Typography, Paper, Grid } from '@material-ui/core'

import LandingContainer from './LandingContainer'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const styles = {
  div: {
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fab: {
    transform: 'scale(0.65)'
  }
}

const PaddedTextField = styled(TextField)({
  marginTop: '5%',
  marginBottom: '5%'
})

function ForgotPassword(props) {
  const { classes } = props
  const style = loggedOutStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
  }

  const content = (
    <div className={classes.div}>
      <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
        {/*
         * HEADING
         */}
        <CursorTypography component='h1' variant='h5'>
          {intl.formatMessage({ id: 'forgotPassword' })}
        </CursorTypography>
        <Typography variant='subtitle2' style={{ width: '75%', textAlign: 'center' }} gutterBottom>
          {intl.formatMessage({ id: 'forgotPasswordDescription' })}{' '}
          <span role='img' aria-label='smiling cowboy lol'>
            🤠
          </span>
        </Typography>

        {/* EMAIL */}

        <PaddedTextField
          inputProps={{ className: style.input }}
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          id='forgot_password__email'
          type='email'
          placeholder={intl.formatMessage({ id: 'email' })}
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={!username}
          variant='outlined'
          fullWidth
        />

        <CursorTypography variant='button'>{intl.formatMessage({ id: 'or' })}</CursorTypography>

        {/* USERNAME */}

        <PaddedTextField
          inputProps={{ className: style.input }}
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          id='forgot_password__username'
          type='text'
          placeholder={intl.formatMessage({ id: 'username' })}
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={!email}
          variant='outlined'
          fullWidth
        />

        {/* RESET PASSWORD BUTTON */}

        <span>
          <Fab type='submit' variant='extended' className={style.submit} color='primary'>
            {intl.formatMessage({ id: 'resetPassword' })}
          </Fab>
        </span>
      </form>
    </div>
  )

  return (
    <LandingContainer
      content={
        <Grid container direction='column' justify='center' alignItems='center'>
          <Paper className={style.paper}>{content}</Paper>
        </Grid>
      }
    />
  )
}

export default withStyles(styles)(ForgotPassword)
