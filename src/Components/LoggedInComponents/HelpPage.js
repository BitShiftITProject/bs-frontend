import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Sidebar from './Sidebar'
import { CursorTypography } from '../../Styles/loggedInStyles'
import { useIntl } from 'react-intl'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                              List of Help Q&As                             */
  /* -------------------------------------------------------------------------- */

  // Every question is written in the language JS files containing the translations
  const help = {
    [intl.formatMessage({ id: 'faq' })]: [
      { q: intl.formatMessage({ id: 'question1' }), a: intl.formatMessage({ id: 'answer1' }) },
      { q: intl.formatMessage({ id: 'question2' }), a: intl.formatMessage({ id: 'answer2' }) }
    ]
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <div className={classes.root}>
      {Object.keys(help).map((section) => (
        <div key={section}>
          {/*
           * HELP SECTION
           */}
          <Typography variant='h6' component='h6' className={classes.title}>
            {section}
          </Typography>

          {/* ACCORDION: One for each question and answer pair in the section */}

          {help[section].map((question, idx) => (
            <Accordion key={idx}>
              {/*
               * QUESTION
               */}
              <AccordionSummary
                className={classes.heading}
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
              >
                <CursorTypography>{question.q}</CursorTypography>
              </AccordionSummary>
              {/*
               * ANSWER
               */}
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
