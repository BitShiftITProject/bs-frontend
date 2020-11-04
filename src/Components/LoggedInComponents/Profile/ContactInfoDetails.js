import React from 'react'
import { useIntl } from 'react-intl'
import { editProfileFormStyles } from '../../../Styles/editProfileFormStyles'
import { loggedInStyles, PaddedFormGrid } from '../../../Styles/loggedInStyles'

import { Grid, TextField, Chip } from '@material-ui/core'

export default function ContactInfoDetails({ handleOnContactChange, contact }) {
  const intl = useIntl()
  // Used for general styles
  const classes = loggedInStyles()
  const editProfileForm = editProfileFormStyles()

  return (
    <form className={editProfileForm} noValidate autoComplete='off'>
      <Grid item container spacing={0} direction='column'>
        <Grid item container justify='space-between'>
          {/**
           * CONTACT DETAILS: Email, Contact Number, Address, Town, State, Country
           */}
          <Chip label={intl.formatMessage({ id: 'details' })} color='primary' />
          {/**
                <Fab size='small' aria-label='go back'>
                <CloseIcon />
                </Fab>
                */}
        </Grid>
        <PaddedFormGrid item container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'email' })}
              type='email'
              variant='outlined'
              name='profile_email'
              helperText={intl.formatMessage({ id: 'emailHelperText' })}
              value={contact.profile_email}
              onChange={handleOnContactChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'phone' })}
              variant='outlined'
              name='phone'
              value={contact.phone}
              onChange={handleOnContactChange}
            />
          </Grid>
        </PaddedFormGrid>
        <PaddedFormGrid item>
          <Grid item xs={12} className={classes.padded}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'company' })}
              variant='outlined'
              name='company'
              value={contact.company}
              onChange={handleOnContactChange}
            />
          </Grid>
        </PaddedFormGrid>
        <PaddedFormGrid item container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'addressLine1' })}
              variant='outlined'
              name='address_line_1'
              value={contact.address_line_1}
              onChange={handleOnContactChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'town' })}
              variant='outlined'
              name='town_suburb'
              value={contact.town_suburb}
              onChange={handleOnContactChange}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'state' })}
              variant='outlined'
              name='state'
              value={contact.state}
              onChange={handleOnContactChange}
            />
          </Grid>
        </PaddedFormGrid>
        <PaddedFormGrid item container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'addressLine2' })}
              variant='outlined'
              name='address_line_2'
              value={contact.address_line_2}
              onChange={handleOnContactChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ className: classes.input }}
              className={classes.formLabel}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={intl.formatMessage({ id: 'country' })}
              variant='outlined'
              name='country'
              value={contact.country}
              onChange={handleOnContactChange}
            />
          </Grid>
        </PaddedFormGrid>
      </Grid>
    </form>
  )
}
