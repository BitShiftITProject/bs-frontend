import React, { useState } from 'react'

import { BACKEND, SIGNUP } from '../../Endpoints'
import { TextField, Button, Avatar, styled, withStyles, Fab } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LandingContainer from './LandingContainer'
import { CursorTypography } from '../loggedInStyles'
import { loggedOutStyles } from '../loggedOutStyles'
import { useHistory } from 'react-router-dom'

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

function Signup(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirm: '',
    firstName: '',
    lastName: '',
  })

  // Handles changes in text input
  function handleChange(e) {
    setState({ [e.target.name]: e.target.value })
  }

  // POST request to backend signup endpoint, sending the current state data to
  // create a user
  function handleSubmit(e) {
    e.preventDefault()

    // Password must match
    if (state.password !== state.confirm) {
      alert('Password does not match!')

      return
    }

    const details = {
      ...state,
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
    console.log('Email:', state.email)
    console.log('Username:', state.username)
    console.log('Password:', state.password)
    console.log('Confirm Password:', state.confirm)
    console.log('First Name:', state.firstName)
    console.log('Last Name:', state.lastName)
  }

  const style = loggedOutStyles()
  const history = useHistory()
  const { classes } = props
  const content = (
    <div className={classes.div}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <CursorTypography component='h1' variant='h5'>
          Sign Up
        </CursorTypography>
        <PaddedTextField
          InputLabelProps={{
            shrink: true,
          }}
          className={style.formLabel}
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
          value={state.email}
          onChange={handleChange}
        ></PaddedTextField>

        <PaddedTextField
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.formLabel}
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
          value={state.password}
          onChange={handleChange}
        ></PaddedTextField>

        <PaddedTextField
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.formLabel}
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
          value={state.confirm}
          onChange={handleChange}
        ></PaddedTextField>

        <PaddedTextField
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.formLabel}
          id='signup__first_name'
          type='text'
          placeholder='John'
          label='First Name'
          name='firstName'
          value={state.firstName}
          onChange={handleChange}
          required
          variant='outlined'
          margin='normal'
          fullWidth
        />

        <PaddedTextField
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.formLabel}
          id='signup__last_name'
          type='text'
          placeholder='Smith'
          label='Last Name'
          name='lastName'
          value={state.lastName}
          onChange={handleChange}
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

export default withStyles(styles)(Signup)
