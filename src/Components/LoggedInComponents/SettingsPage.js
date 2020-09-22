import React, { useContext, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Sidebar from './Sidebar'
import { CustomThemeContext } from '../Contexts/CustomThemeContext'
import { CursorTypography } from '../../Styles/loggedInStyles'

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

  /* ---------------------------- General Settings ---------------------------- */

  const { currentTheme: theme, setTheme } = useContext(CustomThemeContext)

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }

  /* ------------------------------ Personal Data ----------------------------- */

  const content = (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CursorTypography className={classes.heading}>General settings</CursorTypography>
          <CursorTypography className={classes.secondaryHeading}></CursorTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justify='flex-start' alignItems='center'>
            <CursorTypography>Dark Mode</CursorTypography>
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              color='primary'
              name='theme'
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CursorTypography className={classes.heading}>Login data</CursorTypography>
          <CursorTypography className={classes.secondaryHeading}></CursorTypography>
        </AccordionSummary>
        <AccordionDetails>
          <CursorTypography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </CursorTypography>
        </AccordionDetails>
      </Accordion>
    </div>
  )

  return <Sidebar content={content} />
}
