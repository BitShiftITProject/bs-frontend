import React from 'react'
import { useIntl } from 'react-intl'
import {editProfileFormStyles} from '../../../Styles/editProfileFormStyles'
import { loggedInStyles, PaddedFormGrid} from '../../../Styles/loggedInStyles'

import {
  Grid,
  TextField,
  Chip
} from '@material-ui/core'
  
export default function AboutMeDetails({handleOnAboutChange,handleAddTag,handleRemoveTag,about, tagText, setTagText}) {
    const intl = useIntl()
// Used for general styles
  const classes = loggedInStyles()
  const editProfileForm = editProfileFormStyles()

  return (
        <form className={editProfileForm} noValidate autoComplete='off'>
          <Grid container spacing={0} direction='column'>
            {/**
             * ABOUT ME DETAILS: First Name, Last Name, Occupation
             */}
            <Grid item>
              <Chip label={intl.formatMessage({ id: 'details' })} color='primary' />
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
                  label={intl.formatMessage({ id: 'firstName' })}
                  variant='outlined'
                  name='first_name'
                  value={about.first_name}
                  onChange={handleOnAboutChange}
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
                  label={intl.formatMessage({ id: 'lastName' })}
                  variant='outlined'
                  name='last_name'
                  value={about.last_name}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </PaddedFormGrid>
            <PaddedFormGrid item>
              <Grid item className={classes.padded}>
                <TextField
                  inputProps={{ className: classes.input }}
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  label={intl.formatMessage({ id: 'occupation' })}
                  variant='outlined'
                  fullWidth
                  name='occupation'
                  value={about.occupation}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </PaddedFormGrid>
          </Grid>
          {/**
           * ABOUT ME DESCRIPTION
           */}
          <Grid item container spacing={0} direction='column'>
            <Grid item>
              <Chip label={intl.formatMessage({ id: 'profileDescription' })} color='primary' />
            </Grid>
            <PaddedFormGrid item>
              <Grid item className={classes.padded}>
                <TextField
                  inputProps={{ className: classes.input }}
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  placeholder={intl.formatMessage({ id: 'descriptionPlaceholder' })}
                  fullWidth
                  multiline
                  rows={7}
                  variant='outlined'
                  name='description'
                  value={about.description}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </PaddedFormGrid>

            <Grid item container spacing={0} direction='column'>
              <Grid item>
                <Chip label={intl.formatMessage({ id: 'tags' })} color='primary' />
              </Grid>
              {/**
               * ABOUT ME TAGS
               */}
              <PaddedFormGrid item>
                <Grid item className={classes.padded}>
                  <TextField
                    inputProps={{ className: classes.input }}
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder={intl.formatMessage({ id: 'tagsPlaceholder' })}
                    fullWidth
                    variant='outlined'
                    name='tagText'
                    value={tagText}
                    onChange={(e) => setTagText(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </Grid>
                <Grid item container spacing={1} direction='row' className={classes.padded}>
                  {about.tags.map((t) => (
                    <Grid item key={t.id}>
                      <Chip
                        label={t.label}
                        variant='outlined'
                        onDelete={() => handleRemoveTag(t.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </PaddedFormGrid>
            </Grid>
          </Grid>
        </form>
  )
}