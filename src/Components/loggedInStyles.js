import { Grid } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/core/styles'

const drawerWidth = 240

const PaddedFormGrid = styled(Grid)({
  marginTop: '8px',
  marginBottom: '8px',
})

const loggedInStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                          Sidebar / AppBar / Paper                          */
  /* -------------------------------------------------------------------------- */

  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  sidebarItems: {
    '& ListItem': {
      paddingRight: 0,
    },
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(4),
    borderRadius: 0,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  fixedHeight: {
    height: '73vh',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  listMenu: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },

  floatingTopContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },

  floatingBottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },

  changeHeightAtSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },

  padded: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },

  formLabel: {
    '& .Mui-focused': {
      color: theme.palette.info.main,
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                 Breadcrumbs                                */
  /* -------------------------------------------------------------------------- */

  breadcrumbSpacer: {
    height: '20px',
  },
  breadcrumbLink: {
    display: 'flex',
    fontSize: '1.5em',
    fontWeight: '400',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '& a': 'pointer',
  },

  '.MuiLink-root:hover': {
    textDecoration: 'underline',
  },
  breadcrumbIcon: {
    marginRight: theme.spacing(1),
    marginBottom: '2px',
    width: 30,
    height: 27,
  },

  /* -------------------------------------------------------------------------- */
  /*                                Home Profile                                */
  /* -------------------------------------------------------------------------- */

  profileImage: {
    overflow: 'hidden',
    borderRadius: '50%',
    height: 200,
    width: 200,
  },

  profileImg: {
    maxHeight: '100%',
    display: 'block',
  },

  profileName: {
    paddingTop: theme.spacing(3),
    fontWeight: 'lighter',
    paddingBottom: '5%',
    textAlign: 'center',
  },

  profileOccupation: {
    margin: '0 auto',
    textAlign: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
    borderRadius: '20px',
    cursor: 'pointer',
    ...theme.typography.button,
    width: '80%',
    backgroundColor: theme.palette.background.default,
  },

  editProfileButton: {
    width: '75px !important',
  },

  /* -------------------------------------------------------------------------- */
  /*                               Portfolio Card                               */
  /* -------------------------------------------------------------------------- */

  portfolioCard: {
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      height: 350,
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: 0,
    },

    // scrollPadding: '0 0 5px 0',
    // boxSizing: 'border-box',
    // '& .MuiCardContent-root': {
    //   paddingBottom: 0,
    // },
  },

  portfolioContent: {
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      height: 100,
    },
    overflow: 'scroll',
  },

  portfolioCardMedia: {
    height: 200,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                  Add Portfolio Button (PortfolioCardList)                  */
  /* -------------------------------------------------------------------------- */

  addPortfolioFab: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  addPortfolioIcon: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0.5),
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                              Edit Profile Page                             */
  /* -------------------------------------------------------------------------- */

  editProfileForm: {
    // '& .MuiGrid-root': {
    //   paddingBottom: theme.spacing(0),
    // },
    '& .MuiChip-root': {
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(0),
    },

    // '& .MuiTextField-root': {
    //   marginRight: theme.spacing(2),
    // },
    '& .MuiInputLabel-outlined:focus-': {
      overflow: 'hidden',
    },
  },

  singleForm: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },

  /* -------------------------------------------------------------------------- */
  /*                             Edit Portfolio Page                            */
  /* -------------------------------------------------------------------------- */

  hiddenButtonItem: {
    '&:hover button': {
      visibility: 'visible',
    },
  },

  hiddenButton: {
    background: 'none',
    boxShadow: 'none',
    visibility: 'hidden',
  },
}))

export { loggedInStyles, PaddedFormGrid }
