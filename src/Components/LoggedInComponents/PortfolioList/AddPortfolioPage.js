import React, { useState } from 'react'

import { Grid, Paper, TextField, Button, FormControl, FormHelperText } from '@material-ui/core'
import { loggedInStyles, PaddedFormGrid } from '../../../Styles/loggedInStyles'
import Sidebar from '../Sidebar'

import { getUser, logout, postPortfolioToUser } from '../../../Backend/Fetch'

import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

export default function AddPortfolioPage() {
  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState(' ')

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = loggedInStyles().fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // Reset error state to false to not show the helper text right after
    // clicking Add Portfolio button
    setError(false)

    // Gets the currently logged-in User object from access token
    const user = await getUser()

    // Logs out if access token is no longer valid
    if (!user) {
      logout()
      return
    }

    // Format the to-be-stringified details that will be
    // passed into the portfolio creation endpoint
    const postDetails = {
      title: title,
      description: description
    }

    // Creates a portfolio belonging to the currently logged-in user,
    // if error, show an error helper text.
    await postPortfolioToUser(user.username, postDetails).then((response) => {
      if (response.ok) {
        history.push('/portfolios')
      } else {
        setHelperText('An error occurred. Try again.')
        setError(true)
        return null
      }
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <Grid container direction='row' spacing={0}>
      <Grid item xs={12} container direction='column' justify='center' alignItems='center'>
        <Paper className={fixedHeightPaper}>
          <Grid
            style={{ height: '100%', width: '100%' }}
            container
            justify='center'
            alignItems='center'
          >
            {/*
             * FORM GRID
             */}
            <Grid item xs={12} sm={8}>
              <form style={{ height: '100%', width: '100%' }} onSubmit={handleSubmit}>
                <FormControl error={error} style={{ width: '100%', height: '100%' }}>
                  {/*
                   * TEXT FIELDS
                   */}
                  <Grid container spacing={2} direction='column' alignItems='stretch'>
                    {/*
                     * PORTFOLIO TITLE FIELD
                     */}
                    <PaddedFormGrid item>
                      <TextField
                        inputProps={{ className: classes.input }}
                        className={classes.formLabel}
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant='outlined'
                        label={intl.formatMessage({ id: 'title' })}
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      ></TextField>
                    </PaddedFormGrid>
                    {/*
                     * PORTFOLIO DESCRIPTION FIELD
                     */}
                    <PaddedFormGrid item>
                      <TextField
                        inputProps={{ className: classes.input }}
                        className={classes.formLabel}
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant='outlined'
                        label={intl.formatMessage({ id: 'portfolioDescription' })}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></TextField>
                    </PaddedFormGrid>
                  </Grid>

                  {/* HELPER TEXT (For Errors, Warnings, etc.) */}

                  <FormHelperText>{helperText}</FormHelperText>

                  {/* ADD PORTFOLIO BUTTON */}

                  <PaddedFormGrid>
                    <Button type='submit' variant='contained'>
                      {intl.formatMessage({ id: 'addPortfolio' })}
                    </Button>
                  </PaddedFormGrid>
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )

  return <Sidebar content={content} />
}
