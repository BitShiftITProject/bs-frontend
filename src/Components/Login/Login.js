import React, { Component } from 'react'
import './Login.css'
import { BACKEND, AUTHENTICATE } from '../../Endpoints'
import { TextField, Button, Checkbox } from '@material-ui/core'

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

    alert('Printed details to console!')

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

    console.log('Login:')
    console.log('Username:', this.state.username)
    console.log('Password:', this.state.password)
  }

  render() {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='login__username' className='login__username'>
            Username:
          </label>

          <TextField
            id='login__username'
            type='text'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            required
          ></TextField>

          <label htmlFor='login__password' className='login__password'>
            Password:
          </label>

          <TextField
            id='login__password'
            type='password'
            placeholder='**********'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            required
          ></TextField>

          <Button className='login__button' type='submit' variant='contained' color='primary'>
            LOG IN
          </Button>

          <label htmlFor='login__remember'> Remember Me </label>
          <Checkbox
            id='login__remember'
            className='login__remember'
            color='primary'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onChange={this.handleCheckbox}
          />
        </form>
        <Button
          className='login__forgot_password'
          variant='contained'
          color='default'
          href='/forgotpassword'
        >
          Forgot your password?
        </Button>
      </div>
    )
  }
}

export default Login
