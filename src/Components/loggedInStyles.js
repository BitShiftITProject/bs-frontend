import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const loggedInStyles = makeStyles((theme) => ({
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

  breadcrumbSpacer: {
    height: '20px',
  },
  breadcrumbLink: {
    display: 'flex',
    fontSize: '1.25em',
    fontWeight: '400',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  breadcrumbIcon: {
    marginRight: theme.spacing(1),
    marginBottom: '2px',
    width: 23,
    height: 23,
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: 0,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 700,
    overflow: 'scroll',
    [theme.breakpoints.down('sm')]: {
      height: 500,
    },
    [theme.breakpoints.up('md')]: {
      height: 700,
    },
  },

  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
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
    backgroundColor: 'rgba(190,190,190,0.5)',
  },

  editProfile: {
    width: '75px !important',
  },

  portfolioCard: {
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      height: 300,
    },
    overflow: 'scroll',
  },

  portfolioCardActionArea: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    textAlign: 'justify',
  },

  portfolioCardMedia: {
    height: 200,
    backgroundColor: 'rgb(190,190,190)',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  portfolioCardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingLeft: 16,
  },

  addPortfolioContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  addPortfolioFab: {
    '&:hover': {
      backgroundColor: '#5468dd',
    },
  },
  addPortfolioIcon: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0.5),
    },
  },

  listMenu: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },

  editProfileForm: {
    '& .MuiGrid-root': {
      paddingBottom: theme.spacing(0),
    },
    '& .MuiChip-root': {
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(0),
    },

    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
}))

export { loggedInStyles }
