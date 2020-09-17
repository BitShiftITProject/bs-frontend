import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Sidebar from './Sidebar'
import { CursorTypography } from '../loggedInStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    paddingBottom: '15px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.info.main,
    },
  },
}))

const help = {
  General: [
    { q: 'Question 1', a: 'Answer 1' },
    { q: 'Question 2', a: 'Answer 2' },
  ],
}

export default function HelpPage() {
  const classes = useStyles()

  const content = (
    <div className={classes.root}>
      {Object.keys(help).map((section) => (
        <div key={section}>
          <Typography variant='h6' component='h6' className={classes.title}>
            {section}
          </Typography>
          {help[section].map((question) => (
            <Accordion key={question.q}>
              <AccordionSummary
                className={classes.heading}
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
              >
                <CursorTypography>{question.q}</CursorTypography>
              </AccordionSummary>
              <AccordionDetails>
                <CursorTypography>{question.a}</CursorTypography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}
    </div>
  )

  return <Sidebar content={content} />
}
