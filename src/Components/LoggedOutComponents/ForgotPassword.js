import React, { Component } from 'react'
import { withStyles, styled } from '@material-ui/core/styles'

import { TextField, Button, Typography, Fab } from '@material-ui/core'
import LandingContainer from './LandingContainer'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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

class ForgotPassword extends Component {
  state = { email: '', username: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    alert('Printed details to console!')

    console.log('Forgot Password')
    console.log('Email:', this.state.email)
    console.log('Username:', this.state.username)
  }

  render() {
    // Getting the style classes and history prop for button click routing
    const { classes, history } = this.props
    const content = (
      <div className={classes.div}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Typography component='h5' variant='h5' gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant='subtitle2' style={{ textAlign: 'center' }} gutterBottom>
            Please enter the email you signed up with or your username, and we'll send you a link
            for a new password{' '}
            <span role='img' aria-label='smiling cowboy lol'>
              🤠
            </span>
          </Typography>

          <PaddedTextField
            id='forgot_password__email'
            type='email'
            placeholder='email@domain.com'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            required={!this.state.username}
            variant='outlined'
            fullWidth
          />

          <Typography variant='button'>or</Typography>

          <PaddedTextField
            id='forgot_password__username'
            type='text'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            required={!this.state.email}
            variant='outlined'
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
            <Button
              className='forgot_password__button'
              type='submit'
              variant='contained'
              color='primary'
            >
              Reset Password
            </Button>
          </span>
        </form>
      </div>
    )
    return <LandingContainer content={content} />
  }
}

export default withStyles(styles)(ForgotPassword)
