import React, { Component } from 'react'

import { BACKEND, AUTHENTICATE } from '../../Endpoints'
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,
  Typography,
  styled,
  withStyles,
} from '@material-ui/core'

import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import LandingContainer from './LandingContainer'

const styles = {
  div: {
    width: '100%',
    marginBottom: '2%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  links: {
    marginTop: '5%',
    '& a': {
      textDecoration: 'none',
      color: 'grey',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  rememberMe: {
    textAlign: 'justify',
    marginLeft: '1%',
  },
}

const PaddedTextField = styled(TextField)({
  marginTop: '5%',
  marginBottom: '5%',
})

class Login extends Component {
  state = { email: '', password: '', rememberMe: false }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckbox = (e) => {
    this.setState((st) => ({ rememberMe: !st.rememberMe }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const details = {
      ...this.state,
    }

    fetch(BACKEND + AUTHENTICATE, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(details),
    }).then((response) => {
      if (response.ok) {
        window.sessionStorage.accessToken = response.body.access_token
        window.location.href = '/'
      } else {
      }
    })

    console.log('Logged in!')
    console.log('Email:', this.state.email)
    console.log('Password:', this.state.password)
  }

  render() {
    const { classes } = this.props
    const content = (
      <div className={classes.div}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log In
          </Typography>
          <PaddedTextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={this.handleChange}
          />
          <PaddedTextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={this.handleChange}
          />
          <FormControlLabel
            className={classes.div}
            control={
              <Checkbox
                value='remember'
                color='primary'
                onClick={this.handleCheckbox}
                className={classes.rememberMe}
              />
            }
            label='Remember me'
          />
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
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    )
    return <LandingContainer content={content} />
  }
}

export default withStyles(styles)(Login)
