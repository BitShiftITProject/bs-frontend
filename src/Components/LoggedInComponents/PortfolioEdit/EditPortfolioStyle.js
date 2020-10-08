import React, {
  useContext
  // useEffect,
  // useState
} from 'react'
import {
  // Button,
  FormControl,
  FormControlLabel,
  // FormHelperText,
  // FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  // Select,
  Typography
} from '@material-ui/core'
import { loggedInStyles } from '../../../Styles/loggedInStyles'
import { PublicThemesContext } from '../../Contexts/PublicThemesContext'
import { themes } from '../../../Themes/themes'

export default function EditPortfolioStyle({ portfolio }) {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                                Public Theme                                */
  /* -------------------------------------------------------------------------- */

  const { publicTheme, setPublicTheme } = useContext(PublicThemesContext)

  function handleThemeChange(e) {
    e.preventDefault()
    // await patchPortfolio({ theme: e.target.value })
    localStorage.setItem('publicTheme', e.target.value)
    setPublicTheme(e.target.value)
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid container direction='row' spacing={0}>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Typography variant='h5'>Theme</Typography>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='theme chooser'
              name='theme'
              value={publicTheme}
              onChange={handleThemeChange}
            >
              {Object.keys(themes).map((theme) => {
                const titleCase = theme.replace(/([A-Z])/g, ' $1')
                const radioLabel = titleCase.charAt(0).toUpperCase() + titleCase.slice(1)
                return (
                  <FormControlLabel
                    key={theme}
                    value={theme}
                    control={<Radio />}
                    label={radioLabel}
                  />
                )
              })}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  )
}
