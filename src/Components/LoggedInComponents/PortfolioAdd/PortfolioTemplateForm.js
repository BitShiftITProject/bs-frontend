import React, { useCallback } from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { templates } from '../../Templates/templates'
import shallow from 'zustand/shallow'
import { useFormStore } from '../../../Hooks/Store'
import { loggedInStyles } from '../../../Styles/loggedInStyles'
import { useIntl } from 'react-intl'

const portfolioTemplateSelector = ({ template, modifyForm }) => [template, modifyForm]

export default function PortfolioTemplateForm() {
  const style = loggedInStyles()
  const [template, modifyForm] = useFormStore(useCallback(portfolioTemplateSelector, []), shallow)
  const intl = useIntl()
  return (
    <FormControl component='fieldset' className={style.addPortfolioForm}>
      <RadioGroup
        aria-label='theme chooser'
        value={template}
        onChange={(e) => modifyForm('template', e.target.value)}
      >
        {Object.keys(templates).map((portfolioTemplate) => {
          return (
            <FormControlLabel
              key={portfolioTemplate}
              value={portfolioTemplate}
              control={<Radio />}
              label={intl.formatMessage({ id: portfolioTemplate })}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
