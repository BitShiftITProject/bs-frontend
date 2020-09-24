import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withStyles, styled } from '@material-ui/core/styles'

import { TextField, Button, Fab, Typography } from '@material-ui/core'
import LandingContainer from './LandingContainer'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { CursorTypography } from '../../styles/loggedInStyles'
import { loggedOutStyles } from '../../styles/loggedOutStyles'
import { useIntl } from 'react-intl'

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

function ForgotPassword(props) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
  }

  const style = loggedOutStyles()
  const history = useHistory()
  const intl = useIntl()

  const { classes } = props
  const content = (
    <div className={classes.div}>
      <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
        <CursorTypography component='h1' variant='h5'>
          {intl.formatMessage({ id: 'forgotPassword' })}
        </CursorTypography>
        {/*<Typography variant='subtitle2' style={{ width: '50%', textAlign: 'center' }} gutterBottom>
          Enter the email or username you use to sign up with, and we'll send you a link for
          a new password{' '}
          <span role='img' aria-label='smiling cowboy lol'>
            🤠
          </span>
        </Typography>*/}

        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          id='forgot_password__email'
          type='email'
          placeholder={intl.formatMessage({ id: 'email' })}
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={!username}
          variant='outlined'
          fullWidth
        />

        <CursorTypography variant='button'>{intl.formatMessage({ id: 'or' })}</CursorTypography>

        <PaddedTextField
          InputLabelProps={{
            shrink: true
          }}
          className={style.formLabel}
          id='forgot_password__username'
          type='text'
          placeholder={intl.formatMessage({ id: 'username' })}
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={!email}
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
            {intl.formatMessage({ id: 'resetPassword' })}
          </Button>
        </span>
      </form>
    </div>
  )

  return <LandingContainer content={content} />
}

export default withStyles(styles)(ForgotPassword)
