import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Sidebar from './Sidebar'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { useIntl } from 'react-intl'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  title: {
    paddingBottom: '15px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.info.main
    }
  }
}))

export default function HelpPage() {
  const classes = useStyles()
  const intl = useIntl()

  const help = {
    [intl.formatMessage({ id: 'faq' })]: [
      { q: intl.formatMessage({ id: 'question1' }), a: intl.formatMessage({ id: 'answer1' }) },
      { q: intl.formatMessage({ id: 'question2' }), a: intl.formatMessage({ id: 'answer2' }) }
    ]
  }

  const content = (
    <div className={classes.root}>
      {Object.keys(help).map((section) => (
        <div key={section}>
          <Typography variant='h6' component='h6' className={classes.title}>
            {section}
          </Typography>
          {help[section].map((question, idx) => (
            <Accordion key={idx}>
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
