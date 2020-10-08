import React from 'react'
// import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import LandingContainer from './LandingContainer'
import {Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
  }))

export default function PublicPortfolioFailed(props) {
  const classes = useStyles()

  const content = (
    <div className={classes.content}>
      <Typography align='center' variant='h3' >Sorry! We could not find the specified portfolio</Typography>
      <Typography align='center' variant='h5' >Please make sure you have the correct portfolio link before trying again</Typography>
    </div>
  )

  return (
    <LandingContainer content={content} />
  )
}
