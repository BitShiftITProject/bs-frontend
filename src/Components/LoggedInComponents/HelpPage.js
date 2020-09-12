import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Sidebar from './Sidebar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    paddingBottom: '15px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.info.main,
    },
  },
}))

export default function HelpPage() {
  const classes = useStyles()

  const content = (
    <div className={classes.root}>
      <Typography variant='h6' component='h6' className={classes.title}>
        General
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )

  return <Sidebar content={content} />
}
