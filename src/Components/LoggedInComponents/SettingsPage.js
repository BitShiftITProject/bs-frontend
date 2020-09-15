import React, { useContext, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Sidebar from './Sidebar'
import { CustomThemeContext } from '../Contexts/CustomThemeContext'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
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
          <Typography className={classes.heading}>General settings</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justify='flex-start' alignItems='center'>
            <Typography>Dark Mode</Typography>
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
          <Typography className={classes.heading}>Login Data</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )

  return <Sidebar content={content} />
}
