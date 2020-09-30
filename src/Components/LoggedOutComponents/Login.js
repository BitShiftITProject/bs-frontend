import React, { useState } from 'react'
import Loading from '../CommonComponents/Loading'

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,
  styled,
  withStyles,
  Paper
} from '@material-ui/core'

import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Alert from '@material-ui/lab/Alert'
import { useIntl } from 'react-intl'

import LandingContainer from './LandingContainer'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import { authenticate } from '../../Backend/Fetch'

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
  links: {
    marginTop: '5%',
    '& a': {
      textDecoration: 'none',
      color: 'grey',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
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
  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [state, setState] = useState({
    email: '',
    password: '',
    rememberMe: false,
    loginFailed: false,
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

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handleCheckbox(e) {
    setState((st) => ({ ...st, rememberMe: !st.rememberMe }))
  }



  async function handleSubmit(e) {
    e.preventDefault()
    const loginDetails = {
      Email: state.email,
      Password: state.password
    }

    changeLoading()
    const response = await authenticate(loginDetails)

    if (response && response.ok) {
      const auth = await response.json()
      console.log(auth)

      if (state.rememberMe) {
        console.log('Remember me!')
        localStorage.setItem('accessToken', auth.AuthenticationResult.AccessToken)
      } else {
        sessionStorage.setItem('accessToken', auth.AuthenticationResult.AccessToken)
      }
      window.location.href = '/'
    } else {
      console.log('Authentication error')
      const error = await response.json()

      setState((st) => ({
        ...st,
        loginFailed: true,
        errorMessage: error.error.message
      }))
    }
    changeLoading()

  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const style = loggedOutStyles()
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
          {intl.formatMessage({ id: 'login' })}
        </CursorTypography>
        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='outlined'
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
        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='outlined'
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
        {state.loginFailed ? (
          <div>
            <Alert severity='error'>{state.errorMessage}</Alert>
          </div>
        ) : (
            <div></div>
          )}

        {/* Loading message*/}
        {state.loading ? (
          <div>
            {<Loading message="Authenticating log in" />}
          </div>
        ) : (
            <div></div>
          )}

        <Grid container justify='space-between'>
          <Grid item xs={7} md={5}>
            <FormControlLabel
              className={classes.div}
              control={
                <Checkbox
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

        <Button type='submit' fullWidth variant='contained' color='primary'>
          {intl.formatMessage({ id: 'login' })}
        </Button>
        <Grid container className={classes.links}>
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
        <Grid
          style={{ height: '100%', width: '100%' }}
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Paper className={style.paper}>{content}</Paper>
        </Grid>
      }
    />
  )
}

export default withStyles(styles)(Login)
