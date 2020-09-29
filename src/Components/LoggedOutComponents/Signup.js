import React, { useState } from 'react'

import Loading from '../CommonComponents/Loading'

import { TextField, Button, Avatar, styled, withStyles, Fab } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LandingContainer from './LandingContainer'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Alert from '@material-ui/lab/Alert'
import { signupCheck } from '../../Backend/Fetch'

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
    transform: 'translateX(-25px)'
  },

  fab: {
    transform: 'scale(0.65)'
  }
}

const PaddedTextField = styled(TextField)({
  marginTop: '5%',
  marginBottom: '5%'
})

function Signup(props) {
  const history = useHistory()
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
    const details = {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      username: state.username,
      password: state.password
    }
    changeLoading()
    const response = await signupCheck(details)

    if (response && response.ok) {
      const auth = await response.json()
      console.log(auth)
      //  do the sign in thing
      window.location.href = '/login'
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
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <CursorTypography component='h1' variant='h5'>
          {intl.formatMessage({ id: 'signUp' })}
        </CursorTypography>
        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formLabel}
          id='signup__first_name'
          type='text'
          placeholder={intl.formatMessage({ id: 'firstName' })}
          label={intl.formatMessage({ id: 'firstName' })}
          name='firstName'
          value={state.firstName}
          onChange={handleChange}
          required
          variant='outlined'
          margin='normal'
          fullWidth
        />

        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formLabel}
          id='signup__last_name'
          type='text'
          placeholder={intl.formatMessage({ id: 'lastName' })}
          label={intl.formatMessage({ id: 'lastName' })}
          name='lastName'
          value={state.lastName}
          onChange={handleChange}
          required
          variant='outlined'
          margin='normal'
          fullWidth
        />
        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label={intl.formatMessage({ id: 'username' })}
          autoFocus
          id='signup__username'
          placeholder={intl.formatMessage({ id: 'username' })}
          name='username'
          value={state.username}
          onChange={handleChange}
        ></PaddedTextField>
        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label={intl.formatMessage({ id: 'email' })}
          autoFocus
          id='signup__email'
          placeholder={intl.formatMessage({ id: 'email' })}
          name='email'
          value={state.email}
          onChange={handleChange}
        ></PaddedTextField>

        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formLabel}
          id='signup__password'
          variant='outlined'
          margin='normal'
          fullWidth
          label={intl.formatMessage({ id: 'password' })}
          autoComplete='current-password'
          type='password'
          placeholder={intl.formatMessage({ id: 'password' })}
          pattern='.{8,12}'
          title='8 to 12 characters'
          name='password'
          value={state.password}
          onChange={handleChange}
        ></PaddedTextField>

        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formLabel}
          id='signup__confirm_password'
          variant='outlined'
          margin='normal'
          fullWidth
          label={intl.formatMessage({ id: 'confirmPassword' })}
          type='password'
          placeholder={intl.formatMessage({ id: 'confirmPassword' })}
          required
          pattern='.{8,12}'
          title={intl.formatMessage({ id: 'passwordPattern' })}
          name='confirm'
          value={state.confirm}
          onChange={handleChange}
        ></PaddedTextField>

        <span className={classes.span}>
          <Fab
            onClick={() => history.push('/login')}
            color='primary'
            aria-label='login'
            className={classes.fab}
          >
            <ArrowBackIcon />
          </Fab>

          {/* The error message appears iff the state is signUpFailed */}
          {state.signUpFailed ? (
            <div>
              <Alert severity='error'>{state.errorMessage}</Alert>
            </div>
          ) : (
              <div></div>
            )}

          {/* Loading sign up */}
          {state.loading ? (
            <div>
              {<Loading message=" Hold on while we save your data" />}
            </div>
          ) : (
              <div></div>
            )}

          <Button className='signup_button' type='submit' variant='contained' color='primary'>
            {intl.formatMessage({ id: 'signUp' })}
          </Button>
        </span>
      </form>
    </div>
  )

  return <LandingContainer content={content} />
}

export default withStyles(styles)(Signup)
