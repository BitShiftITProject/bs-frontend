import React, { Component } from 'react'
import './Login.css'
import { BACKEND, AUTHENTICATE } from '../../../Endpoints'
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

class Login extends Component {
  state = { username: '', password: '', rememberMe: false }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckbox = (e) => {
    this.setState((st) => ({ rememberMe: !st.rememberMe }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // const details = {
    //   ...this.state,
    // }

    // fetch(BACKEND + AUTHENTICATE, {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify(details),
    // }).then((response) => {
    //   if (response.ok) {
    //     window.sessionStorage.accessToken = response.body.access_token
    //     window.location.href = '/'
    //   } else {
    //   }
    // })

    console.log('Logged in!')
    console.log('Username:', this.state.username)
    console.log('Password:', this.state.password)

    this.props.toggleLogin()
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className='Login'>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log In
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" variant='body2'>
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link to='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div >
    )
  }
}

export default Login
