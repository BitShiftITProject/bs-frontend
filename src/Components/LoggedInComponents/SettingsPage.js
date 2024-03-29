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
import { CursorTypography } from '../../Styles/loggedInStyles'
import languages from '../../lang/languages'
import { LocaleContext } from '../Contexts/LocaleContext'
import { useIntl } from 'react-intl'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

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
  },
  details: {
    width: '100%',
    height: '100%'
  },
  setting: {
    padding: theme.spacing(1)
  }
}))

export default function SettingsPage() {
  const classes = useStyles()
  const settingNameSize = 3
  const settingOptionSize = 6

  /* -------------------------------------------------------------------------- */
  /*                               Setting Panels                               */
  /* -------------------------------------------------------------------------- */

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
      {/* -------------------------------------------------------------------------- */}

      {/* GENERAL SETTINGS */}

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CursorTypography className={classes.heading}>
            {intl.formatMessage({ id: 'generalSettings' })}
          </CursorTypography>
          <CursorTypography className={classes.secondaryHeading}></CursorTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid className={classes.details} container justify='center' alignItems='center'>
            <Grid
              className={classes.setting}
              item
              xs={12}
              container
              justify='flex-start'
              alignItems='center'
            >
              <Grid item xs={settingNameSize}>
                <CursorTypography>{intl.formatMessage({ id: 'darkMode' })}</CursorTypography>
              </Grid>
              <Grid item xs={settingOptionSize}>
                <Switch
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  color='primary'
                  name='theme'
                />
              </Grid>
            </Grid>
            <Grid
              className={classes.setting}
              item
              xs={12}
              container
              justify='flex-start'
              alignItems='center'
            >
              <Grid item xs={settingNameSize}>
                <CursorTypography>{intl.formatMessage({ id: 'language' })}</CursorTypography>
              </Grid>
              <Grid item xs={settingOptionSize}>
                <Select native variant='outlined' value={locale} onChange={handleLocaleChange}>
                  {Object.keys(languages).map((lang) => (
                    <option key={lang} value={lang}>
                      {languages[lang].name}
                    </option>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* -------------------------------------------------------------------------- */}

      {/* LOGIN DATA */}

      {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CursorTypography className={classes.heading}>
            {intl.formatMessage({ id: 'loginData' })}
          </CursorTypography>
          <CursorTypography className={classes.secondaryHeading}></CursorTypography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion> */}
    </div>
  )

  return <Sidebar content={content} />
}
