import React, { Component } from 'react'
import './Signup.css'
import { BACKEND, SIGNUP } from '../../../Endpoints'
import { TextField, Button, Avatar, Typography, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link } from 'react-router-dom'

class Signup extends Component {
  state = { email: '', username: '', password: '', confirm: '', firstName: '', lastName: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.password !== this.state.confirm) {
      alert('Password does not match!')

      return
    }

    alert('Printed details to console!')

    // const details = {
    //   ...this.state,
    // }

    // fetch(BACKEND + SIGNUP, {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify(details),
    // }).then((response) => {
    //   if (response.ok) {
    //     window.location.href = '/login'
    //   } else {
    //   }
    // })

    console.log('Signup:')
    console.log('Email:', this.state.email)
    console.log('Username:', this.state.username)
    console.log('Password:', this.state.password)
    console.log('Confirm Password:', this.state.confirm)
    console.log('First Name:', this.state.firstName)
    console.log('Last Name:', this.state.lastName)
  }

  render() {
    return (
      <div className='Signup'>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form onSubmit={this.handleSubmit}>
          {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            autoFocus
            id='signup__email'
            type='email'
            placeholder='Email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
          ></TextField>

          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='signup__username'
            type='text'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            required
          ></TextField>

          <TextField
            id='signup__password'
            variant='outlined'
            margin='normal'
            fullWidth
            label='Password'
            autoComplete='current-password'
            type='password'
            placeholder='Password'
            required
            pattern='.{8,12}'
            title='8 to 12 characters'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          ></TextField>

          <TextField
            id='signup__confirm_password'
            variant='outlined'
            margin='normal'
            fullWidth
            label='Confirm Password'
            type='password'
            placeholder='Confirm Password'
            required
            pattern='.{8,12}'
            title='8 to 12 characters'
            name='confirm'
            value={this.state.confirm}
            onChange={this.handleChange}
          ></TextField>

          <TextField
            id='signup__first_name'
            type='text'
            placeholder='John'
            name='firstName'
            value={this.state.firstName}
            onChange={this.handleChange}
            required
            variant='outlined'
            margin='normal'
            fullWidth
          />

          <TextField
            id='signup__last_name'
            type='text'
            placeholder='Smith'
            name='lastName'
            value={this.state.lastName}
            onChange={this.handleChange}
            required
            variant='outlined'
            margin='normal'
            fullWidth
          />


          <Grid container>
            <Grid item xs>
              <Button
                className='signup_button'
                type='submit'
                variant="contained"
                color='primary' >
                SIGN UP
          </Button>

            </Grid>

            <Grid item>

              <Link to="/login"
                variant='body2'>
                {"Have an account? Log in"}
              </Link>

            </Grid>
          </Grid>



        </form>
      </div>
    )
  }
}

export default Signup
