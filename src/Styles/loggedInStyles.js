import { Grid, Typography } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/core/styles'

const CursorTypography = styled(Typography)({
  cursor: 'default'
})

const PaddedFormGrid = styled(Grid)({
  marginTop: '8px',
  marginBottom: '8px'
})

const loggedInStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    borderRadius: 0,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  fixedHeight: {
    height: '73vh',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

  fixedHeightPaper: {
    width: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    borderRadius: 0,
    display: 'flex',
    overflow: 'scroll',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      display: 'none'
    },

    height: '73vh'
  },

  leftPanel: {
    padding: theme.spacing(4),
    borderRadius: 0,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    },

    height: '73vh',
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },

  listMenu: {
    padding: 0,

    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',

    height: '73vh',
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    },

    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

  floatingTopContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },

  floatingBottomContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 30
  },

  padded: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },

  formLabel: {
    '& .Mui-focused': {
      color: theme.palette.text.primary
    }
  },

  hiddenButtonItem: {
    '&:hover button': {
      visibility: 'visible'
    }
  },

  hiddenButton: {
    background: 'none',
    boxShadow: 'none',
    visibility: 'hidden'
  },
  input: {
    '&.MuiOutlinedInput-input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px rgba(0,0,0,0.2) inset',
      WebkitTextFillColor: theme.palette.secondary.contrastText
    }
  },
  share: {
    '&:hover': {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText
    }
  },
  delete: {
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    }
  }
}))

export { loggedInStyles, PaddedFormGrid, CursorTypography }
