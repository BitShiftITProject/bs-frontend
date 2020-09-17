import React, { useState } from 'react'

import { BACKEND, AUTHENTICATE, USERS } from '../../Endpoints'
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,
  styled,
  withStyles
} from '@material-ui/core'

import { Link, useHistory } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import LandingContainer from './LandingContainer'
import { CursorTypography } from '../loggedInStyles'
import { loggedOutStyles } from '../loggedOutStyles'

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
  const history = useHistory()
  const [state, setState] = useState({ email: '', password: '', rememberMe: false })

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handleCheckbox(e) {
    setState((st) => ({ ...st, rememberMe: !st.rememberMe }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    // const details = {
    //   ...state
    // }

    // fetch(BACKEND + AUTHENTICATE, {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify(details)
    // }).then((response) => {
    //   if (response.ok) {
    //     window.sessionStorage.accessToken = response.body.access_token
    //     window.location.href = '/'
    //   } else {
    //   }
    // })

    // console.log('Logged in!')
    // console.log('Email:', state.email)
    // console.log('Password:', state.password)

    fetch(BACKEND + USERS + '/' + state.email, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
          window.sessionStorage.setItem('emailId', state.email)
          window.location.href = '/home'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const style = loggedOutStyles()
  const { classes } = props
  const content = (
    <div className={classes.div}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <CursorTypography component='h1' variant='h5'>
          Log In
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
          label='Email Address'
          name='email'
          type='email'
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
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={handleChange}
        />
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
              label='Remember me'
            />
          </Grid>
          <Grid item xs={5} md={7}>
            {' '}
          </Grid>
        </Grid>

        <Button type='submit' fullWidth variant='contained' color='primary'>
          Log In
        </Button>
        <Grid container className={classes.links}>
          <Grid item xs>
            <Link to='/forgotpassword' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to='/signup' variant='body2'>
              {"Don't have an account?"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
  return <LandingContainer content={content} />
}

export default withStyles(styles)(Login)
