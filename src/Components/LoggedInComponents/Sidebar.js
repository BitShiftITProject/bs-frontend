import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'

import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  Container,
  makeStyles,
  Tooltip
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

// import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import DescriptionIcon from '@material-ui/icons/Description'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import ListSubheader from '@material-ui/core/ListSubheader'
// import AssignmentIcon from '@material-ui/icons/Assignment'

import { CursorTypography } from '../../Styles/loggedInStyles'
import HeaderBreadcrumbs from './HeaderBreadcrumbs'
import { useIntl } from 'react-intl'
import DarkAndLightModeButton from '../CommonComponents/DarkAndLightModeButton'
// import LanguageButton from '../CommonComponents/LanguageButton'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                          Sidebar / AppBar / Paper                          */
  /* -------------------------------------------------------------------------- */

  root: {
    display: 'flex',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appBarIcon: {
    height: 40,
    width: 40,
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },

  sidebarItems: {
    '& ListItem': {
      paddingRight: 0
    }
  },

  breadcrumbSpacer: {
    height: '20px'
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

export default function Sidebar(props) {
  // Used to send a user to some page, using history.push({pathname})
  const history = useHistory()
  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                             States and Handlers                            */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = useStyles()
  const appBarStyle = clsx(classes.appBar, open && classes.appBarShift)
  const toggleMenuIconStyle = clsx(classes.menuButton, open && classes.menuButtonHidden)
  const drawerStyle = clsx(classes.drawerPaper, !open && classes.drawerPaperClose)

  /* -------------------------------------------------------------------------- */
  /*                                AppBar (Top)                                */
  /* -------------------------------------------------------------------------- */

  const appBar = (
    <AppBar position='absolute' className={appBarStyle}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={toggleMenuIconStyle}
        >
          <MenuIcon />
        </IconButton>
        <CursorTypography
          component='h1'
          variant='h6'
          color='inherit'
          className={classes.title}
        ></CursorTypography>
        <DarkAndLightModeButton />
        {/* <LanguageButton /> */}

        <Tooltip title={intl.formatMessage({ id: 'help' })} placement='bottom'>
          <IconButton
            onClick={() => {
              history.push('/help')
            }}
            color='inherit'
            className={classes.appBarIcon}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.formatMessage({ id: 'settings' })} placement='bottom'>
          <IconButton
            onClick={() => {
              history.push('/settings')
            }}
            color='inherit'
            className={classes.appBarIcon}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.formatMessage({ id: 'logout' })} placement='bottom'>
          <IconButton
            onClick={() => {
              sessionStorage.removeItem('accessToken')
              localStorage.removeItem('accessToken')
              window.sessionStorage.removeItem('portfolioId')
              window.location.href = '/'
            }}
            color='inherit'
            className={classes.appBarIcon}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )

  /* -------------------------------------------------------------------------- */
  /*                              Drawer Menu Items                             */
  /* -------------------------------------------------------------------------- */

  const mainListItems = (
    <div className={classes.sidebarList}>
      {/*<ListItem
        button
        onClick={() => {
          history.push('/home')
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({id: 'home'})} />
      </ListItem>*/}

      <ListItem
        button
        onClick={() => {
          history.push('/portfolios')
        }}
      >
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'portfolios' })} />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          history.push('/profile')
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'profile' })} />
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
        <ListItemText primary={intl.formatMessage({ id: 'help' })} />
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
        <ListItemText primary={intl.formatMessage({ id: 'settings' })} />
      </ListItem>
    </div>
  )

  /* -------------------------------------------------------------------------- */
  /*                      Drawer Menu (can open and close)                      */
  /* -------------------------------------------------------------------------- */

  const drawer = (
    <Drawer
      variant='permanent'
      classes={{
        paper: drawerStyle
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
    </Drawer>
  )

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  // Content is the page component that will be rendered (e.g. HomePage, SettingsPage, etc.)
  const { content } = props

  const pageContent = (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth='lg' className={classes.container}>
        <HeaderBreadcrumbs />
        <div className={classes.breadcrumbSpacer} />
        {content}
      </Container>
    </main>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      {appBar}
      {drawer}
      {pageContent}
    </div>
  )
}
