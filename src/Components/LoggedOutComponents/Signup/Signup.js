import React, { Component } from 'react'
import './Signup.css'
import { BACKEND, SIGNUP } from '../../../Endpoints'
import { TextField, Button } from '@material-ui/core'

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
        <form onSubmit={this.handleSubmit}>
          {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
          <label htmlFor='signup__email'> Email: </label>
          <TextField
            id='signup__email'
            type='email'
            placeholder='email@domain.com'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          ></TextField>

          <label htmlFor='signup__username'> Username: </label>
          <TextField
            id='signup__username'
            type='text'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            required
          ></TextField>

          <label htmlFor='signup__password'> Password: </label>
          <TextField
            id='signup__password'
            type='password'
            placeholder='**********'
            required
            pattern='.{8,12}'
            title='8 to 12 characters'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          ></TextField>

          <label htmlFor='signup__confirm_password'> Confirm Password: </label>
          <TextField
            id='signup__confirm_password'
            type='password'
            placeholder='**********'
            required
            pattern='.{8,12}'
            title='8 to 12 characters'
            name='confirm'
            value={this.state.confirm}
            onChange={this.handleChange}
          ></TextField>

          <label htmlFor='signup__first_name'> First Name: </label>
          <TextField
            id='signup__first_name'
            type='text'
            placeholder='John'
            name='firstName'
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />

          <label htmlFor='signup__last_name'> Last Name: </label>
          <TextField
            id='signup__last_name'
            type='text'
            placeholder='Smith'
            name='lastName'
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />

          <Button className='signup_button' type='submit' variant='contained' color='primary'>
            SIGN UP
          </Button>
        </form>
      </div>
    )
  }
}

export default Signup
