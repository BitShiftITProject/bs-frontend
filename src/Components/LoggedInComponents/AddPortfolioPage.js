import React, { useState } from 'react'

import { Grid, Paper, TextField, Button } from '@material-ui/core'
import { loggedInStyles, PaddedFormGrid } from '../loggedInStyles'
import Sidebar from './Sidebar'

import { BACKEND, PORTFOLIOS, USERS } from '../../Endpoints'
import { useHistory } from 'react-router-dom'

export default function AddPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
        })

        const newPortfolios =
          user.portfolios && user.portfolios.length
            ? [...user.portfolios, portfolio.id]
            : [portfolio.id]

        const patchBody = { portfolios: newPortfolios }

        await fetch(BACKEND + USERS + '/' + emailId, {
          method: 'PATCH',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(patchBody)
        })

        window.sessionStorage.setItem('portfolioId', portfolio.id)
        history.push('/portfolios/edit')
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
              <PaddedFormGrid>
                <Button type='submit' variant='contained'>
                  Add Portfolio
                </Button>
              </PaddedFormGrid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )

  return <Sidebar content={content} />
}
