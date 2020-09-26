import React, { useState } from 'react'

import { Grid, Paper, TextField, Button, FormControl, FormHelperText } from '@material-ui/core'
import { loggedInStyles, PaddedFormGrid } from '../../Styles/loggedInStyles'
import Sidebar from './Sidebar'

import { getUser, logout, patchUser, postPortfolio } from '../../Backend/Fetch'

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

    const user = await getUser()

    if (!user) {
      logout()
    } else {
      if (!user.username) {
        console.log('No username')
        return
      }

      console.log(user.portfolios)

      const postDetails = {
        title,
        description: description,
        pages: {},
        owner: user.username
      }

      const response = await postPortfolio(postDetails).then((response) => {
        if (response.ok) {
          return response
        } else {
          setHelperText('An error occurred. Try again.')
          setError(true)
          return null
        }
      })

      if (response) {
        const portfolio = await response.json()

        if (portfolio) {
          const user = await getUser()

          if (user) {
            const newPortfolios = user.portfolios
              ? [...user.portfolios, portfolio.id]
              : [portfolio.id]

            const patchDetails = { portfolios: newPortfolios }

            patchUser(patchDetails).then((response) => {
              if (response.ok) {
                console.log('Portfolio added to user!')
                history.push('/portfolios')
              } else {
                setHelperText('An error occurred. Try again.')
                setError(true)
              }
            })
          } else {
            setHelperText('An error occurred. Try again.')
            setError(true)
          }
        }
      }
    }
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
            <Grid item xs={12} sm={8}>
              <form style={{ height: '100%', width: '100%' }} onSubmit={handleSubmit}>
                <FormControl error={error} style={{ width: '100%', height: '100%' }}>
                  <Grid container spacing={2} direction='column' alignItems='stretch'>
                    <PaddedFormGrid item>
                      <TextField
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
                    <PaddedFormGrid item>
                      <TextField
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
                  <FormHelperText>{helperText}</FormHelperText>
                  <PaddedFormGrid>
                    <Button type='submit' variant='contained'>
                      {intl.formatMessage({ id: 'addPortfolio' })}
                    </Button>
                  </PaddedFormGrid>
                </FormControl>
                {/*<Grid container spacing={2} direction='column' alignItems='stretch'>
                  <PaddedFormGrid item>
                    <TextField
                      className={classes.formLabel}
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant='outlined'
                      label='Title'
                      fullWidth
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    ></TextField>
                  </PaddedFormGrid>
                  <PaddedFormGrid item>
                    <TextField
                      className={classes.formLabel}
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant='outlined'
                      label='Description'
                      fullWidth
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></TextField>
                  </PaddedFormGrid>
                </Grid>
                <PaddedFormGrid>
                  <Button type='submit' variant='contained'>
                    Add Portfolio
                  </Button>
                </PaddedFormGrid>*/}
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )

  return <Sidebar content={content} />
}
