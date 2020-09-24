import React, { useContext, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Select,
  Switch
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { ThemesContext } from '../Contexts/ThemesContext'
import Sidebar from './Sidebar'
import { CursorTypography } from '../../styles/loggedInStyles'
import languages from '../../lang/languages'
import { LocaleContext } from '../Contexts/LocaleContext'
import { useIntl } from 'react-intl'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}))

export default function SettingsPage() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState('panel1')

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  /* -------------------------------------------------------------------------- */
  /*                              General Settings                              */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------------- Theme --------------------------------- */

  const { currentTheme: theme, setTheme } = useContext(ThemesContext)

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  /* ---------------------------- Locale / Language --------------------------- */

  const intl = useIntl()
  const { currentLocale: locale, setLocale } = useContext(LocaleContext)

  function handleLocaleChange(event) {
    setLocale(event.target.value)
  }

  /* -------------------------------------------------------------------------- */
  /*                                Personal Data                               */
  /* -------------------------------------------------------------------------- */

  const content = (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CursorTypography className={classes.heading}>
            {intl.formatMessage({ id: 'generalSettings' })}
          </CursorTypography>
          <CursorTypography className={classes.secondaryHeading}></CursorTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container style={{ width: '100%', height: '100%' }}>
            <Grid item xs={12} container justify='flex-start' alignItems='center'>
              <CursorTypography>{intl.formatMessage({ id: 'theme' })}</CursorTypography>
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                color='primary'
                name='theme'
              />
            </Grid>
            <Grid item xs={12} container justify='flex-start' alignItems='center'>
              <CursorTypography>{intl.formatMessage({ id: 'language' })}</CursorTypography>
              <Select native variant='outlined' value={locale} onChange={handleLocaleChange}>
                {Object.keys(languages).map((lang) => (
                  <option key={lang} value={lang}>
                    {languages[lang]}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CursorTypography className={classes.heading}>
            {intl.formatMessage({ id: 'personalData' })}
          </CursorTypography>
          <CursorTypography className={classes.secondaryHeading}></CursorTypography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  )

  return <Sidebar content={content} />
}
