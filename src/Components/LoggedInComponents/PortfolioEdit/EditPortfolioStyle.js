import React, { useContext } from 'react'
import {
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core'
import { loggedInStyles } from '../../../Styles/loggedInStyles'
import { PublicThemesContext } from '../../Contexts/PublicThemesContext'
import { themes } from '../../../Themes/themes'
import { useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'
import useEditPortfolio from '../../../Hooks/useEditPortfolio'
import { useStore } from '../../../Hooks/Store'

const portfolioIdSelector = (state) => state.portfolioId

export default function EditPortfolioStyle() {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                                  Snackbar                                  */
  /* -------------------------------------------------------------------------- */

  const { enqueueSnackbar } = useSnackbar()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                Public Theme                                */
  /* -------------------------------------------------------------------------- */

  const { publicTheme, setPublicTheme } = useContext(PublicThemesContext)

  const portfolioId = useStore(portfolioIdSelector)
  // const portfolio = usePortfolio(portfolioId)
  const [editPortfolio] = useEditPortfolio()

  function handleThemeChange(e) {
    e.preventDefault()
    window.sessionStorage.setItem('publicTheme', e.target.value)
    setPublicTheme(e.target.value)

    const patchDetails = { theme: e.target.value }

    const titleCase = e.target.value.replace(/([A-Z])/g, ' $1')
    const themeName = titleCase.charAt(0).toUpperCase() + titleCase.slice(1)

    editPortfolio({ portfolioId: portfolioId, patchDetails })

    enqueueSnackbar(intl.formatMessage({ id: 'changedPortfolioTheme' }, { themeName }), {})
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid container direction='row' spacing={0}>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Typography variant='h5'>{intl.formatMessage({ id: 'theme' })}</Typography>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='theme chooser'
              name='theme'
              value={publicTheme}
              onChange={handleThemeChange}
            >
              {Object.keys(themes).map((theme) => {
                return (
                  <FormControlLabel
                    key={theme}
                    value={theme}
                    control={<Radio />}
                    label={intl.formatMessage({ id: theme })}
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
