import { Grid, Typography } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/core/styles'

const CursorTypography = styled(Typography)({
  cursor: 'default',
})

const PaddedFormGrid = styled(Grid)({
  marginTop: '8px',
  marginBottom: '8px',
})

const loggedInStyles = makeStyles((theme) => ({
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

  fixedHeightPaper: {
    padding: theme.spacing(4),
    borderRadius: 0,
    display: 'flex',
    overflow: 'scroll',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      display: 'none',
    },

    height: '73vh',
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
      display: 'none',
    },

    height: '73vh',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },

  listMenu: {
    padding: 0,

    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',

    height: '73vh',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },

    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
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

  padded: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },

  formLabel: {
    '& .Mui-focused': {
      color: theme.palette.info.main,
    },
  },

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

export { loggedInStyles, PaddedFormGrid, CursorTypography }
