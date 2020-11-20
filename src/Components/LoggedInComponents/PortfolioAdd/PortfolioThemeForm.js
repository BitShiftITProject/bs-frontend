import React, { useCallback } from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { themes } from '../../../Themes/themes'
import shallow from 'zustand/shallow'
import { useFormStore } from '../../../Hooks/Store'
import { loggedInStyles } from '../../../Styles/loggedInStyles'
import { useIntl } from 'react-intl'

const portfolioThemeSelector = ({ theme, modifyForm }) => [theme, modifyForm]

export default function PortfolioThemeForm() {
  const style = loggedInStyles()
  const [theme, modifyForm] = useFormStore(useCallback(portfolioThemeSelector, []), shallow)
  const intl = useIntl()

  return (
    <FormControl component='fieldset' className={style.addPortfolioForm}>
      <RadioGroup
        aria-label='theme chooser'
        value={theme}
        onChange={(e) => modifyForm('theme', e.target.value)}
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
  )
}
