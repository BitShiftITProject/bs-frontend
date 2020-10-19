import React, { useCallback } from 'react'
import shallow from 'zustand/shallow'

import {
  TextField,
  Fab,
  Checkbox,
  FormControlLabel,
  Grid,
  styled,
  withStyles,
  Paper
} from '@material-ui/core'

import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import { useIntl } from 'react-intl'

import LandingContainer from './LandingContainer'
import Loading from '../CommonComponents/Loading'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'

import { authenticate } from '../../Backend/Fetch'
import { useFormStore } from '../../Store'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const styles = {
  div: {
    width: '100%',
    marginBottom: '2%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  rememberMe: {
    textAlign: 'justify',
    marginLeft: '1%'
  }
}

const PaddedTextField = styled(TextField)({
  marginTop: '5%',
  marginBottom: '5%'
})

function Login(props) {
  const style = loggedOutStyles()
  const { classes } = props

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [
    email,
    password,
    rememberMe,
    loginFailed,
    errorMessage,
    loading,
    modifyForm
  ] = useFormStore(
    useCallback(
      ({ email, password, rememberMe, loginFailed, errorMessage, loading, modifyForm }) => [
        email,
        password,
        rememberMe,
        loginFailed,
        errorMessage,
        loading,
        modifyForm
      ],
      []
    ),
    shallow
  )

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  // Change the current attribute in the state that is currently being changed
  function handleChange(e) {
    modifyForm(e.target.name, e.target.value)
  }

  // Toggle the checkbox from being checked (true) or not (false)
  function handleCheckbox(e) {
    modifyForm('rememberMe', !rememberMe)
  }

  // Authenticates login details through authenticate(),
  // otherwise an error alert is shown
  async function handleSubmit(e) {
    e.preventDefault()

    modifyForm('loginFailed', false)
    modifyForm('errorMessage', '')
    modifyForm('loading', true)

    const loginDetails = {
      Email: email,
      Password: password
    }

    // Authenticate login details
    const response = await authenticate(loginDetails)

    // Save access token in local/session storage
    if (response && response.ok) {
      const auth = await response.json()

      if (rememberMe) {
        localStorage.setItem('accessToken', auth.AuthenticationResult.AccessToken)
      } else {
        sessionStorage.setItem('accessToken', auth.AuthenticationResult.AccessToken)
      }
      window.location.href = '/'

      // Toggle error alert
    } else {
      const error = await response.json()
      modifyForm('loginFailed', true)
      modifyForm('errorMessage', error.error.message)
      modifyForm('loading', false)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <div className={classes.div}>
      <form onSubmit={handleSubmit} className={classes.form}>
        {/*
         * HEADING
         */}
        <CursorTypography component='h1' variant='h5'>
          {intl.formatMessage({ id: 'login' })}
        </CursorTypography>

        {/* TEXT FIELDS */}

        {/* Email */}
        <PaddedTextField
          inputProps={{ className: style.input }}
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='filled'
          margin='normal'
          required
          fullWidth
          id='email'
          label={intl.formatMessage({ id: 'email' })}
          name='email'
          autoComplete='email'
          autoFocus
          onChange={handleChange}
        />

        {/* Password */}
        <PaddedTextField
          inputProps={{ className: style.input }}
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='filled'
          margin='normal'
          required
          fullWidth
          name='password'
          label={intl.formatMessage({ id: 'password' })}
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={handleChange}
        />

        {/* The error message appears iff the state is loginFailed */}
        {loginFailed && (
          <div style={{ paddingBottom: 5 }}>
            <Alert variant='filled' severity='error'>
              {errorMessage}
            </Alert>
          </div>
        )}

        {/* REMEMBER ME CHECKBOX */}

        <Grid container justify='space-between'>
          <Grid item xs={7} md={5}>
            <FormControlLabel
              className={classes.div}
              control={
                <Checkbox
                  disabled={loading}
                  value='remember'
                  color='primary'
                  onClick={handleCheckbox}
                  className={classes.rememberMe}
                />
              }
              label={intl.formatMessage({ id: 'rememberMe' })}
            />
          </Grid>
          <Grid item xs={5} md={7}>
            {' '}
          </Grid>
        </Grid>

        {/* Loading message */}
        {loading && <Loading message={intl.formatMessage({ id: 'loginLoading' })} />}

        {/* LOGIN BUTTON */}

        {!loading && (
          <Fab
            type='submit'
            variant='extended'
            className={style.submit}
            color='primary'
            style={{ width: '100%' }}
          >
            {intl.formatMessage({ id: 'login' })}
          </Fab>
        )}

        {/* FORGOT PASSWORD AND SIGN UP LINKS */}

        <Grid container className={style.links}>
          <Grid item xs>
            <Link to='/forgotpassword' variant='body2'>
              {intl.formatMessage({ id: 'forgotPasswordPrompt' })}
            </Link>
          </Grid>
          <Grid item>
            <Link to='/signup' variant='body2'>
              {intl.formatMessage({ id: 'signUpPrompt' })}
            </Link>
          </Grid>
        </Grid>
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

export default withStyles(styles)(React.memo(Login))
