import React from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

import { TextField, Grid, InputAdornment, IconButton, Fab } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import Loading from '../CommonComponents/Loading'

export default function SignupLoginData({
  state,
  handleChange,
  handleSubmit,
  showPassword,
  handleClickShowPassword
}) {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const style = loggedOutStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  return (
    <Grid
      container
      spacing={1}
      direction='column'
      // justify='center'
      // alignItems='flex-start'
    >
      {/* -------------------------------------------------------------------------- */}

      {/*
       * TEXT FIELDS
       */}

      <Grid item container spacing={1} direction='row' style={{ padding: 0 }}>
        <Grid item xs={6}>
          <TextField
            inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            className={style.formLabel}
            id='signup__first_name'
            type='text'
            // placeholder={intl.formatMessage({ id: 'firstName' })}
            label={intl.formatMessage({ id: 'firstName' })}
            name='firstName'
            value={state.firstName}
            onChange={handleChange}
            required
            variant='filled'
            margin='normal'
            fullWidth
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={6}>
          <TextField
            inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            className={style.formLabel}
            id='signup__last_name'
            type='text'
            // placeholder={intl.formatMessage({ id: 'lastName' })}
            label={intl.formatMessage({ id: 'lastName' })}
            name='lastName'
            value={state.lastName}
            onChange={handleChange}
            required
            variant='filled'
            margin='normal'
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Username */}
      <TextField
        inputProps={{ className: style.input }}
        InputLabelProps={{
          shrink: true
        }}
        className={style.formLabel}
        variant='filled'
        margin='normal'
        required
        fullWidth
        label={intl.formatMessage({ id: 'username' })}
        autoFocus
        id='signup__username'
        // placeholder={intl.formatMessage({ id: 'username' })}
        name='username'
        value={state.username}
        onChange={handleChange}
      />

      {/* Email Address */}
      <TextField
        inputProps={{ className: style.input }}
        InputLabelProps={{
          shrink: true
        }}
        className={style.formLabel}
        variant='filled'
        margin='normal'
        required
        fullWidth
        label={intl.formatMessage({ id: 'email' })}
        autoFocus
        id='signup__email'
        // placeholder={intl.formatMessage({ id: 'email' })}
        name='email'
        value={state.email}
        onChange={handleChange}
      />

      <Grid item container spacing={1} direction='row' style={{ padding: 0 }}>
        {/* Password */}
        <Grid item xs={12}>
          <TextField
            inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            id='signup__password'
            variant='filled'
            margin='normal'
            fullWidth
            label={intl.formatMessage({ id: 'password' })}
            autoComplete='current-password'
            type={showPassword ? 'text' : 'password'}
            // placeholder={intl.formatMessage({ id: 'password' })}
            pattern='.{8,12}'
            title='8 to 12 characters'
            name='password'
            required
            value={state.password}
            onChange={handleChange}
            InputProps={{
              // this is where the toggle button is added
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ transform: 'scale(0.8)' }}
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      {/* Loading sign up */}
      {state.loading && <Loading message={intl.formatMessage({ id: 'signupLoading' })} />}

      {/* SIGN UP BUTTON */}

      <Grid
        className={style.signupSpan}
        item
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        {!state.loading && (
          <Fab
            type='submit'
            variant='extended'
            className={style.submit}
            style={{ width: '100%' }}
            color='primary'
          >
            {intl.formatMessage({ id: 'signUp' })}
          </Fab>
        )}
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='baseline'
        className={style.links}
        style={{ marginBottom: '2%' }}
      >
        <Grid item>
          <Link to='/login' variant='body2'>
            {intl.formatMessage({ id: 'loginPromptSignUp' })}
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
