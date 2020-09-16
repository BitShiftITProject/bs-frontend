import React, { useState } from 'react'

import { Grid, Paper, TextField, Button } from '@material-ui/core'
import { loggedInStyles, PaddedFormGrid } from '../loggedInStyles'
import Sidebar from './Sidebar'

export default function AddPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = loggedInStyles().fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Create POST request to add a portfolio
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
                      shrink: true,
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
                      shrink: true,
                    }}
                    variant='outlined'
                    label='Description'
                    fullWidth
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
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
