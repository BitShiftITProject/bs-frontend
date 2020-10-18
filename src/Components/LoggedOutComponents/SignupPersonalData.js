import React from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

import Alert from '@material-ui/lab/Alert'
import { TextField, Fab, Grid, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import Loading from '../CommonComponents/Loading'
import DateInput from '../CommonComponents/DateInput'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
export default function SignupPersonalData({ state, handleChange }) {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const style = loggedOutStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  return (
    <Grid container spacing={1} direction='column' justify='center' alignItems='center'>
      {/* First Name */}

      <Grid item container spacing={1} direction='row' style={{ padding: 0 }}>
        {/* Birthdate */}
        <Grid item xs={6}>
          <TextField
            // inputProps={{ className: style.input }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: DateInput
            }}
            variant='filled'
            margin='dense'
            fullWidth
            label={intl.formatMessage({ id: 'birthdate' })}
            // placeholder={intl.formatMessage({ id: 'password' })}
            name='birthdate'
            value={state.birthdate}
            onChange={handleChange}
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={6}>
          <FormControl required variant='filled' margin='dense' style={{ minWidth: '100%' }}>
            <InputLabel shrink>{intl.formatMessage({ id: 'gender' })}</InputLabel>
            <Select name='gender' value={state.gender} onChange={handleChange}>
              <MenuItem value={'other'}>{intl.formatMessage({ id: 'other' })}</MenuItem>
              <MenuItem value={'female'}>{intl.formatMessage({ id: 'female' })}</MenuItem>
              <MenuItem value={'male'} selected>
                {intl.formatMessage({ id: 'male' })}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* The error message appears iff the state is signUpFailed */}
      {state.signUpFailed && (
        <Alert variant='filled' severity='error' style={{ marginTop: 5, marginBottom: 5 }}>
          {state.errorMessage}
        </Alert>
      )}
    </Grid>
  )
}
