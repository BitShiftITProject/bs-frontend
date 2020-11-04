import React, { useCallback } from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { templates } from '../../Templates/templates'
import shallow from 'zustand/shallow'
import { useFormStore } from '../../../Hooks/Store'
import { loggedInStyles } from '../../../Styles/loggedInStyles'

const portfolioTemplateSelector = ({ template, modifyForm }) => [template, modifyForm]

export default function PortfolioTemplateForm() {
  const style = loggedInStyles()
  const [template, modifyForm] = useFormStore(useCallback(portfolioTemplateSelector, []), shallow)

  return (
    <FormControl component='fieldset' className={style.addPortfolioForm}>
      <RadioGroup
        aria-label='theme chooser'
        value={template}
        onChange={(e) => modifyForm('template', e.target.value)}
      >
        {Object.keys(templates).map((portfolioTemplate) => {
          const titleCase = portfolioTemplate.replace(/([A-Z])/g, ' $1')
          const radioLabel = titleCase.charAt(0).toUpperCase() + titleCase.slice(1)
          return (
            <FormControlLabel
              key={portfolioTemplate}
              value={portfolioTemplate}
              control={<Radio />}
              label={radioLabel}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
