import React, { useState } from 'react'

import { BACKEND, SIGNUP, USERS } from '../../backend/Endpoints'
import { TextField, Button, Avatar, styled, withStyles, Fab } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LandingContainer from './LandingContainer'
import { CursorTypography } from '../../styles/loggedInStyles'
import { loggedOutStyles } from '../../styles/loggedOutStyles'
import { useHistory } from 'react-router-dom'

const styles = {
  div: {
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  span: {
    transform: 'translateX(-25px)'
  },

  fab: {
    transform: 'scale(0.65)'
  }
}

const PaddedTextField = styled(TextField)({
  marginTop: '5%',
  marginBottom: '5%'
})

function Signup(props) {
  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
    firstName: '',
    lastName: ''
  })

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  // Handles changes in text input
  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  // POST request to backend signup endpoint, sending the current state data to
  // create a user
  async function handleSubmit(e) {
    e.preventDefault()

    // Password must match
    if (state.password !== state.confirm) {
      alert('Password does not match!')

      return
    }

    // TODO: Set up to use auth endpoint
    const details = {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      username: state.username,
      cognito_id: 'helloworld'
      // password: state.password,
      // occupation: '',
      // phone: '',
      // address_line_1: '',
      // address_line_2: '',
      // town_suburb: '',
      // state: '',
      // country: '',
    }

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

    fetch(BACKEND + USERS, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const style = loggedOutStyles()
  // Because we are using withStyles higher-order component (look at the export
  // statement), we retrieve the styles as a prop called 'classes'. It will
  // include all the classes we defined in the 'styles' object we defined above
  const { classes } = props

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

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
            shrink: true
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
            shrink: true
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
        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label='Username'
          autoFocus
          id='signup__username'
          placeholder='Username'
          name='username'
          value={state.username}
          onChange={handleChange}
        ></PaddedTextField>
        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label='Email Address'
          autoFocus
          id='signup__email'
          placeholder='Email'
          name='email'
          value={state.email}
          onChange={handleChange}
        ></PaddedTextField>

        <PaddedTextField
          InputLabelProps={{
            shrink: true
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
            shrink: true
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
