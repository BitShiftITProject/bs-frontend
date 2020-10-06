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
  Tooltip,
  Grid
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
import LanguageButton from '../CommonComponents/LanguageButton'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    width: '100vw'
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
    border: 'none',
    boxShadow: theme.shadows[50],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    border: 'none',
    boxShadow: theme.shadows[50],
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

  // AppBar, MenuIcon, and Drawer styles are different depending on if
  // the drawer is open or closed
  const appBarStyle = clsx(classes.appBar, open && classes.appBarShift)
  const toggleMenuIconStyle = clsx(classes.menuButton, open && classes.menuButtonHidden)
  const drawerStyle = clsx(classes.drawerPaper, !open && classes.drawerPaperClose)

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  // Used to send a user to some page, using history.push({pathname})
  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                                AppBar (Top)                                */
  /* -------------------------------------------------------------------------- */

  // When logged in, the page has this appbar at all times (except when viewing
  // public portfolio

  const appBar = (
    <AppBar position='absolute' className={appBarStyle}>
      <Toolbar className={classes.toolbar}>
        {/*
         * TOP-LEFT MENU ICON: To open the drawer
         */}
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={toggleMenuIconStyle}
        >
          <MenuIcon />
        </IconButton>

        {/*
         * TITLE (Currently empty)
         */}

        <CursorTypography
          component='h1'
          variant='h6'
          color='inherit'
          className={classes.title}
        ></CursorTypography>

        {/* -------------------------------------------------------------------------- */}

        {/* TOP-RIGHT APPBAR ICONS: Language, Theme, Help, Settings, Log Out Buttons (in that order) */}

        <Grid container spacing={1} justify='flex-end'>
          <Grid item>
            <LanguageButton />
          </Grid>

          <Grid item>
            <DarkAndLightModeButton />
          </Grid>
        </Grid>

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
      {/*
       * SIDEBAR CONTENT
       */}

      {/* -------------------------------------------------------------------------- */}

      {/* Portfolios */}
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

      {/* -------------------------------------------------------------------------- */}

      {/* Profile */}
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

      {/* -------------------------------------------------------------------------- */}

      {/* Help */}
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

      {/* -------------------------------------------------------------------------- */}

      {/* Settings */}
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
      {/*
       * DRAWER ICON BUTTON: To close the drawer
       */}
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      {/* SIDEBAR CONTENT: Goes here */}

      <List>{mainListItems}</List>

      <Divider />
    </Drawer>
  )

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  // Content is the page component that will be rendered (e.g. PortfolioList, SettingsPage, etc.)
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
