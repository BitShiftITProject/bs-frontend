import React, { useCallback } from 'react'
import { FormControl, Grid, TextField } from '@material-ui/core'
import { loggedInStyles, PaddedFormGrid } from '../../../Styles/loggedInStyles'
import { useFormStore } from '../../../Hooks/Store'
import shallow from 'zustand/shallow'
import { useIntl } from 'react-intl'

const portfolioDetailsSelector = ({ title, description, modifyForm }) => [
  title,
  description,
  modifyForm
]

export default function PortfolioDetailsForm() {
  const style = loggedInStyles()
  const intl = useIntl()

  const [title, description, modifyForm] = useFormStore(
    useCallback(portfolioDetailsSelector, []),
    shallow
  )

  return (
    <FormControl className={style.addPortfolioForm}>
      {/*
       * TEXT FIELDS
       */}
      <Grid container spacing={2} direction='column' alignItems='stretch' style={{ width: '100%' }}>
        {/*
         * PORTFOLIO TITLE FIELD
         */}
        <PaddedFormGrid item>
          <TextField
            inputProps={{ className: style.input }}
            className={style.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
            label={intl.formatMessage({ id: 'title' })}
            fullWidth
            value={title}
            onChange={(e) => modifyForm('title', e.target.value)}
            required
          ></TextField>
        </PaddedFormGrid>
        {/*
         * PORTFOLIO DESCRIPTION FIELD
         */}
        <PaddedFormGrid item>
          <TextField
            inputProps={{ className: style.input }}
            className={style.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
            label={intl.formatMessage({ id: 'portfolioDescription' })}
            fullWidth
            name='description'
            value={description}
            onChange={(e) => modifyForm('description', e.target.value)}
          ></TextField>
        </PaddedFormGrid>
      </Grid>
    </FormControl>
  )
}
