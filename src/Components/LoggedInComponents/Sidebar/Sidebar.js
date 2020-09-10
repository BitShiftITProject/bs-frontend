import './Sidebar.css'

import React, { useState } from 'react'
import clsx from 'clsx'
import { useStyles } from '../../useStyles'
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import { useHistory } from 'react-router-dom'
const drawerWidth = 240

export default function Sidebar(props) {
  const history = useHistory()
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const mainListItems = (
    <div>
      <ListItem
        button
        onClick={() => {
          history.push('/home')
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          history.push('/portfolio')
        }}
      >
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary='Portfolios' />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          history.push('/help')
        }}
      >
        <ListItemIcon>
          <HelpOutlineIcon />
        </ListItemIcon>
        <ListItemText primary='Help' />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          history.push('/settings')
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItem>
    </div>
  )

  const { content } = props

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          ></Typography>
          <IconButton color='inherit'>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton color='inherit'>
            <SettingsIcon />
          </IconButton>{' '}
          <IconButton color='inherit'>
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>

      {content}
    </div>
  )
}
