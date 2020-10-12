import React, { useContext } from 'react'
// import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import LandingContainer from './LandingContainer'
import {Typography, makeStyles, Grid} from '@material-ui/core'
import clsx from 'clsx'
import { ThemesContext } from '../Contexts/ThemesContext'

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
        //backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    image: {
        maxWidth: '60%',
        height: 'auto'
    },
    lightImage: {
        filter:
          'invert(99%) sepia(4%) saturate(239%) hue-rotate(249deg) brightness(117%) contrast(100%)'
    }
  }))

export default function PublicPortfolioFailed(props) {
  const classes = useStyles()
  const { currentTheme: theme } = useContext(ThemesContext)

  const content = (
    <div className={classes.content}>
        <Typography align='center' variant='h4' >Sorry! We could not find the specified portfolio</Typography>
        <Typography align='center' variant='h6' >Please make sure you have the correct portfolio link before trying again</Typography>
        <center>
        <img
            className={theme === 'dark' ? clsx(classes.image, classes.lightImage) : classes.image}
            src={require('../../Images/404.png')}
            alt='not found'
        />
        </center>
    </div>
  )

  return (
    <LandingContainer content={content} />
  )
}
