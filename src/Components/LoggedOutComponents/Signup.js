import React, { useState } from 'react'

import { useIntl } from 'react-intl'

import Alert from '@material-ui/lab/Alert'
import { TextField, withStyles, Fab, Grid, Paper } from '@material-ui/core'
import Loading from '../CommonComponents/Loading'

import LandingContainer from './LandingContainer'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import { signupCheck } from '../../Backend/Fetch'

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

  span: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },

  fab: {
    transform: 'scale(0.65)'
  }
}

function Signup(props) {
  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
    firstName: '',
    lastName: '',
    signUpFailed: false,
    errorMessage: intl.formatMessage({ id: 'loginError' }),
    loading: false
  })

  function changeLoading() {
    setState((st) => ({
      ...st,
      loading: !st.loading
    }))
  }
  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  // Handles changes in text input
  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  // POST request to backend signup endpoint, sending the current state data to
  // create a user
  async function handleSubmit(e) {
    e.preventDefault()

    // Reset error state to hide the error alert
    setState((st) => ({
      ...st,
      signUpFailed: false,
      errorMessage: ''
    }))

    // Password field must be same as Confirm Password field, otherwise toggle error
    if (state.password !== state.confirm) {
      setState((st) => ({
        ...st,
        signUpFailed: true,
        errorMessage: intl.formatMessage({ id: 'passwordError' })
      }))
      return
    }

    // Call the user creation endpoint using the details in the text fields
    // The keys must be exact with the endpoint
    const details = {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      username: state.username,
      password: state.password
    }

    changeLoading()

    const response = await signupCheck(details)

    // If user signup was successful, redirect to '/login'
    if (response && response.ok) {
      window.location.href = '/login'

      // Otherwise get the error message from the response and show the message in
      // the error alert
    } else {
      const error = await response.json()
      setState((st) => ({
        ...st,
        signUpFailed: true,
        errorMessage: error.error.message
      }))
    }
    changeLoading()
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const style = loggedOutStyles()

  // Because we are using withStyles higher-order component (look at the export
  // statement), we retrieve the styles as a prop called 'classes'. It will
  // include all the classes we defined in the 'styles' object we defined above
  const { classes } = props

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
          {intl.formatMessage({ id: 'signUp' })}
        </CursorTypography>
        <Grid container spacing={1} direction='column' justify='center' alignItems='center'>
          <Grid item container spacing={1} direction='row' style={{ padding: 0 }}>
            {/* -------------------------------------------------------------------------- */}

            {/*
             * TEXT FIELDS
             */}

            {/* First Name */}
            <Grid item xs={6}>
              <TextField
                inputProps={{ className: style.input }}
                InputLabelProps={{
                  shrink: true
                }}
                className={style.formLabel}
                id='signup__first_name'
                type='text'
                // placeholder={intl.formatMessage({ id: 'firstName' })}
                label={intl.formatMessage({ id: 'firstName' })}
                name='firstName'
                value={state.firstName}
                onChange={handleChange}
                required
                variant='filled'
                margin='normal'
                fullWidth
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={6}>
              <TextField
                inputProps={{ className: style.input }}
                InputLabelProps={{
                  shrink: true
                }}
                className={style.formLabel}
                id='signup__last_name'
                type='text'
                // placeholder={intl.formatMessage({ id: 'lastName' })}
                label={intl.formatMessage({ id: 'lastName' })}
                name='lastName'
                value={state.lastName}
                onChange={handleChange}
                required
                variant='filled'
                margin='normal'
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Username */}
          <TextField
            inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            className={style.formLabel}
            variant='filled'
            margin='normal'
            required
            fullWidth
            label={intl.formatMessage({ id: 'username' })}
            autoFocus
            id='signup__username'
            // placeholder={intl.formatMessage({ id: 'username' })}
            name='username'
            value={state.username}
            onChange={handleChange}
          />

          {/* Email Address */}
          <TextField
            inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            className={style.formLabel}
            variant='filled'
            margin='normal'
            required
            fullWidth
            label={intl.formatMessage({ id: 'email' })}
            autoFocus
            id='signup__email'
            // placeholder={intl.formatMessage({ id: 'email' })}
            name='email'
            value={state.email}
            onChange={handleChange}
          />

          {/* Password */}
          <TextField
            inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            className={classes.formLabel}
            id='signup__password'
            variant='filled'
            margin='normal'
            fullWidth
            label={intl.formatMessage({ id: 'password' })}
            autoComplete='current-password'
            type='password'
            // placeholder={intl.formatMessage({ id: 'password' })}
            pattern='.{8,12}'
            title='8 to 12 characters'
            name='password'
            value={state.password}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          <TextField
            inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            className={classes.formLabel}
            id='signup__confirm_password'
            variant='filled'
            margin='normal'
            fullWidth
            label={intl.formatMessage({ id: 'confirmPassword' })}
            type='password'
            // placeholder={intl.formatMessage({ id: 'confirmPassword' })}
            required
            pattern='.{8,12}'
            title={intl.formatMessage({ id: 'passwordPattern' })}
            name='confirm'
            value={state.confirm}
            onChange={handleChange}
          />

          {/* The error message appears iff the state is signUpFailed */}
          {state.signUpFailed && (
            <Alert variant='filled' severity='error' style={{ marginTop: 5, marginBottom: 5 }}>
              {state.errorMessage}
            </Alert>
          )}

          {/* Loading sign up */}
          {state.loading && <Loading message=' Hold on while we save your data' />}

          {/* SIGN UP BUTTON */}

          <Grid
            className={classes.span}
            item
            container
            direction='row'
            justify='center'
            alignItems='center'
          >
            {!state.loading && (
              <div>
                <Fab type='submit' variant='extended' className={style.submit} color='primary'>
                  {intl.formatMessage({ id: 'signUp' })}
                </Fab>
              </div>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  )

  return (
    <LandingContainer
      content={
        <Grid container direction='column' justify='flex-start' alignItems='center'>
          <Paper className={style.paper}>{content}</Paper>
        </Grid>
      }
    />
  )
}

export default withStyles(styles)(Signup)
