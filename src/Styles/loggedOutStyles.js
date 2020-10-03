import { makeStyles } from '@material-ui/core/styles'

const loggedOutStyles = makeStyles((theme) => ({
  // '@global': {
  //   '@keyframes gradient': {
  //     '0%': {
  //       backgroundPosition: '0% 50%'
  //     },
  //     '50%': {
  //       backgroundPosition: '100% 50%'
  //     },
  //     '100%': {
  //       backgroundPosition: '0% 50%'
  //     }
  //   }
  // },
  background: {
    // background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
    // backgroundSize: '400% 400%',
    // animation: 'gradient 15s ease infinite'
  },
  root: {
    width: '100vw',
    height: '100vh',
    textTransform: 'lowercase'

    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column'
  },
  layout: {},
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
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
    },
    boxShadow: `-20px 20px  ${theme.palette.secondary.light}`,
    MozBoxShadow: `-20px 20px  ${theme.palette.secondary.light}`,
    WebkitBoxShadow: `-20px 20px  ${theme.palette.secondary.light}`,
    OBoxShadow: `-20px 20px  ${theme.palette.secondary.light}`
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

  formLabel: {
    '& .Mui-focused': {
      color: theme.palette.text.secondary
    }
  },

  appBar: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    height: '100%',
    maxWidth: '100vw',
    [theme.breakpoints.only('xs')]: {
      paddingTop: theme.spacing(3)
    }
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.primary.contrastText
  },

  appBarTitle: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    '& h1': {
      fontWeight: 900,
      flexGrow: 1,
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '& h2': {
      paddingLeft: theme.spacing(1)
    }
  },
  appBarContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  appBarItems: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'lowercase',
    fontWeight: 'light',
    '& a': {
      boxSizing: 'border-box',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      height: '100%',
      // textDecoration: 'none',
      '&.special': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText

        // backgroundColor: theme.palette.secondary.main,
        // color: theme.palette.secondary.contrastText,
        // '& span::before': {
        //   backgroundColor: theme.palette.secondary.contrastText
        // }
      },
      '&.normal': {
        color: theme.palette.text.primary
      },

      // Outward underline animation

      // Taken from https://codepen.io/kathykato/pen/zYYRGRQ
      // https://css-tricks.com/4-ways-to-animate-the-color-of-a-text-link-on-hover/

      // position: 'relative',
      // transition: 'clip-path 275ms ease',

      // '&:hover span::before, &:focus span::before': {
      //   clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      // },

      // '& span': {
      //   position: 'relative',
      //   display: 'inline-block',
      //   '&::before': {
      //     position: 'absolute',
      //     content: 'attr(data-content)',
      //     textDecoration: 'underline',
      //     clipPath: 'polygon(0 0, 0 0, 0% 100%, 0 100%)',
      //     transition: 'clip-path 275ms ease'
      //   }
      // }

      // Taken from https://tobiasahlin.com/blog/css-trick-animating-link-underlines/

      textDecoration: 'none',
      // display: 'table',

      '& span': {
        // display: 'table-cell',
        // verticalAlign: 'middle',
        position: 'relative',
        '&::before': {
          content: 'attr(data-content)',
          position: 'absolute',
          width: '100%',
          height: '2px',
          bottom: '-10px',
          left: 0,
          backgroundColor: theme.palette.text.primary,
          visibility: 'hidden',
          transform: 'scaleX(0)',
          transition: 'all 0.2s ease-in-out 0s'
        },

        '&:hover::before': {
          visibility: 'visible',
          transform: 'scaleX(1)'
        }
      }
    }
  },
  appBarItemsContainer: {
    // backgroundColor: theme.palette.primary.main,
    // borderRadius: 30,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  appBarIcons: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  input: {
    '&.MuiOutlinedInput-input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px rgba(0,0,0,0.2) inset',
      WebkitTextFillColor: theme.palette.secondary.contrastText
    },
    '&::placeholder': {
      textTransform: 'lowercase'
    }
  },
  links: {
    marginTop: '5%',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  submit: {
    textTransform: 'lowercase'
  }
}))

export { loggedOutStyles }
