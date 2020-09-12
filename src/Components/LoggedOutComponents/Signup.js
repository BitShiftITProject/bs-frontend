import React, { Component } from 'react'

import { BACKEND, SIGNUP } from '../../Endpoints'
import { TextField, Button, Avatar, Typography, styled, withStyles, Fab } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LandingContainer from './LandingContainer'

const styles = {
  div: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  span: {
    transform: 'translateX(-25px)',
  },

  fab: {
    transform: 'scale(0.65)',
  },
}

const PaddedTextField = styled(TextField)({
  marginTop: '5%',
  marginBottom: '5%',
})

class Signup extends Component {
  state = { email: '', username: '', password: '', confirm: '', firstName: '', lastName: '' }

  // Handles changes in text input
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // POST request to backend signup endpoint, sending the current state data to
  // create a user
  handleSubmit = (e) => {
    e.preventDefault()

    // Password must match
    if (this.state.password !== this.state.confirm) {
      alert('Password does not match!')

      return
    }

    const details = {
      ...this.state,
    }

    fetch(BACKEND + SIGNUP, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(details),
    }).then((response) => {
      if (response.ok) {
        window.location.href = '/login'
      } else {
      }
    })

    console.log('SIGNUP')
    console.log('Email:', this.state.email)
    console.log('Username:', this.state.username)
    console.log('Password:', this.state.password)
    console.log('Confirm Password:', this.state.confirm)
    console.log('First Name:', this.state.firstName)
    console.log('Last Name:', this.state.lastName)
  }

  render() {
    const { classes, history } = this.props
    const content = (
      <div className={classes.div}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <PaddedTextField
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
          ></PaddedTextField>

          <PaddedTextField
            id='signup__password'
            variant='outlined'
            margin='normal'
            fullWidth
            label='Password'
            autoComplete='current-password'
            type='password'
            placeholder='Password'
            pattern='.{8,12}'
            title='8 to 12 characters'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          ></PaddedTextField>

          <PaddedTextField
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
          ></PaddedTextField>

          <PaddedTextField
            id='signup__first_name'
            type='text'
            placeholder='John'
            label='First Name'
            name='firstName'
            value={this.state.firstName}
            onChange={this.handleChange}
            required
            variant='outlined'
            margin='normal'
            fullWidth
          />

          <PaddedTextField
            id='signup__last_name'
            type='text'
            placeholder='Smith'
            label='Last Name'
            name='lastName'
            value={this.state.lastName}
            onChange={this.handleChange}
            required
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <span className={classes.span}>
            <Fab
              onClick={() => history.push('/login')}
              color='primary'
              aria-label='login'
              className={classes.fab}
            >
              <ArrowBackIcon />
            </Fab>
            <Button className='signup_button' type='submit' variant='contained' color='primary'>
              Sign Up
            </Button>
          </span>
        </form>
      </div>
    )

    return <LandingContainer content={content} />
  }
}

export default withStyles(styles)(Signup)
