import { makeStyles } from '@material-ui/core/styles'

const loggedOutStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  layout: {},
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    width: '40vw',
    [theme.breakpoints.down('md', 'md')]: {
      width: '50vw'
    },
    [theme.breakpoints.between('sm', 'sm')]: {
      width: '70vw'
    },
    [theme.breakpoints.between('xs', 'xs')]: {
      width: '100vw',
      height: '100vh'
    }
  },
  modal: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.text.main
  },
  form: {
    padding: theme.spacing(4),
    width: '100%' // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formLabel: {
    '& .Mui-focused': {
      color: theme.palette.info.main
    }
  }
}))

export { loggedOutStyles }
