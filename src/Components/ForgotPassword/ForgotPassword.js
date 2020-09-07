import React, { Component } from 'react'
import './ForgotPassword.css'
import { TextField, FormControl, Button } from '@material-ui/core'

class ForgotPassword extends Component {
  state = { email: '', username: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log('Forgot Password:')
    console.log('Email:', this.state.email)
    console.log('Username:', this.state.username)
  }

  render() {
    return (
      <div className='forgot_password'>
        <FormControl>
          {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}

          <p>
            Please enter the email you signed up with or your username, and we'll send you a link
            for a new password :)
          </p>

          <label htmlFor='forgot_password__email' className='forgot_password__email'>
            {' '}
            Email:{' '}
          </label>
          <TextField
            id='forgot_password__email'
            type='email'
            placeholder='email@domain.com'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <p> or </p>

          <label htmlFor='forgot_password__username'> Username: </label>
          <TextField
            id='forgot_password__username'
            type='text'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <Button className='forgot_password__button' type='submit'>
            {' '}
            Send Password Reset Link{' '}
          </Button>
        </FormControl>
      </div>
    )
  }
}

export default ForgotPassword