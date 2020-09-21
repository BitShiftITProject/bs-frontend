import React, { useState } from 'react'

import { Grid, Paper, TextField, Button, FormControl, FormHelperText } from '@material-ui/core'
import { loggedInStyles, PaddedFormGrid } from '../../Styles/loggedInStyles'
import Sidebar from './Sidebar'

import { BACKEND, PORTFOLIOS, USERS } from '../../Backend/Endpoints'
import { useHistory } from 'react-router-dom'

export default function AddPortfolioPage() {
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

  const emailId = window.sessionStorage.getItem('emailId')
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!emailId) history.push('/login')

    const details = {
      title,
      description: description,
      pages: {},
      owner: emailId
    }

    const response = await fetch(BACKEND + PORTFOLIOS, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(details)
    }).then((response) => {
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
        console.log(portfolio)

        const user = await fetch(BACKEND + USERS + '/' + emailId, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-type': 'application/json'
          }
        }).then((response) => response.json())

        const newPortfolios = [...user.portfolios, portfolio.id]
        console.log(newPortfolios)

        const patchDetails = { portfolios: newPortfolios }

        await fetch(BACKEND + USERS + '/' + emailId, {
          method: 'PATCH',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(patchDetails)
        }).then((response) => {
          if (response.ok) {
            console.log('Portfolio added to user!')
            history.push('/home')
          } else {
            setHelperText('An error occurred. Try again.')
            setError(true)
          }
        })
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <Grid container direction='row' spacing={0}>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Grid
            style={{ height: '100%' }}
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <form style={{ width: '40%' }} onSubmit={handleSubmit}>
              <FormControl error={error} style={{ width: '100%', height: '100%' }}>
                <Grid container spacing={2} direction='column' alignItems='stretch'>
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
                <FormHelperText>{helperText}</FormHelperText>
                <PaddedFormGrid>
                  <Button type='submit' variant='contained'>
                    Add Portfolio
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
        </Paper>
      </Grid>
    </Grid>
  )

  return <Sidebar content={content} />
}
