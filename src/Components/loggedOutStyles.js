import { makeStyles } from '@material-ui/core/styles'

const loggedOutStyles = makeStyles((theme) => ({
  paper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.text.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export { loggedOutStyles }
