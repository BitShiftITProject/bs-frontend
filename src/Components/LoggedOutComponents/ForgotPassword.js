import React, { useCallback } from 'react'
import shallow from 'zustand/shallow'
import { useIntl } from 'react-intl'
import { withStyles, styled } from '@material-ui/core/styles'
import { TextField, Fab, Typography, Paper, Grid } from '@material-ui/core'

import LandingContainer from './LandingContainer'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import { Link } from 'react-router-dom'
import { useFormStore } from '../../Store'
import { sendConfirmationCode, resetPassword } from '../../Backend/Fetch'
import { useSnackbar } from 'notistack'

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
  marginBottom: '5%',
  backgroundColor: 'rgba(255, 255, 255, 0.09)'
})

function ForgotPassword(props) {
  const { classes } = props
  const style = loggedOutStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                  Snackbars                                 */
  /* -------------------------------------------------------------------------- */

  const { enqueueSnackbar } = useSnackbar()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [email, confirmationCode, newPassword, modifyForm] = useFormStore(
    useCallback(
      ({ email, confirmationCode, newPassword, modifyForm }) => [
        email,
        confirmationCode,
        newPassword,
        modifyForm
      ],
      []
    ),
    shallow
  )

  function handleChange(e) {
    modifyForm(e.target.name, e.target.value)
  }

  async function handleSubmitEmail(e) {
    e.preventDefault()
    // Doesn't check if email exists yet
    const response = await sendConfirmationCode(email)

    if (response.ok) {
      enqueueSnackbar(`Please check your email (${email}) for a confirmation code`, {
        variant: 'success'
      })
    } else {
      // Display error
      enqueueSnackbar(`Email does not exist`, {
        variant: 'error'
      })
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault()
    const authDetails = {
      Email: email,
      Password: newPassword,
      Code: confirmationCode
    }
    const response = await resetPassword(authDetails)
    if (response.ok) {
      // Success
      enqueueSnackbar(`Password changed successfully. Please log in again`, {
        variant: 'success'
      })
    } else {
      enqueueSnackbar(`An error occurred`, {
        variant: 'error'
      })
    }
  }

  const content = (
    <div className={classes.div}>
      <form onSubmit={(e) => handleSubmitEmail(e)} className={classes.form}>
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
          // label={intl.formatMessage({ id: 'email' })}
          name='email'
          value={email}
          onChange={handleChange}
          required
          variant='outlined'
          fullWidth
        />

        <span>
          <Fab type='submit' variant='extended' className={style.submit} color='primary'>
            {intl.formatMessage({ id: 'sendCode' })}
          </Fab>
        </span>
      </form>
      <form onSubmit={(e) => handleResetPassword(e)} className={classes.form}>
        {/* CONFIRMATION CODE */}

        <PaddedTextField
          inputProps={{ className: style.input }}
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          id='forgot_password__confirmationCode'
          placeholder={intl.formatMessage({ id: 'confirmationCode' })}
          name='confirmationCode'
          value={confirmationCode}
          onChange={handleChange}
          required
          variant='outlined'
          fullWidth
        />

        {/* NEW PASSWORD */}

        <PaddedTextField
          inputProps={{ className: style.input }}
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          id='forgot_password__newPassword'
          type='password'
          placeholder={intl.formatMessage({ id: 'newPassword' })}
          name='newPassword'
          value={newPassword}
          onChange={handleChange}
          required
          variant='outlined'
          fullWidth
        />

        {/* RESET PASSWORD BUTTON */}

        <span>
          <Fab type='submit' variant='extended' className={style.submit} color='primary'>
            {intl.formatMessage({ id: 'resetPassword' })}
          </Fab>
        </span>

        <span
          className={style.links}
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            marginBottom: '2%'
          }}
        >
          <Link to='/login' variant='body2'>
            {intl.formatMessage({ id: 'loginPromptForgotPassword' })}
          </Link>
        </span>
      </form>
    </div>
  )

  return (
    <LandingContainer
      content={
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={1} sm={2} lg={3}></Grid>
          <Grid item xs={10} sm={8} lg={6}>
            <Paper className={style.paper}>{content}</Paper>
          </Grid>
          <Grid item xs={1} sm={2} lg={3}></Grid>
        </Grid>
      }
    />
  )
}

export default withStyles(styles)(ForgotPassword)
