import React from 'react'

import {
  Button,
  Grid,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 25
  },
  paper: {
    marginRight: theme.spacing(2)
  },

  button: {
    width: '100%'
  },
  popper: {
    width: '85.5%'
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export default function EditPortfolioDropdown({ setEditMode }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      console.log("When you close the menu ")
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    event.preventDefault()

    if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <Grid item xs={12} md={12} lg={12} className={classes.root}>
      <Paper>
        <Button
          className={classes.button}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          color='primary'
          variant='contained'
        >
          Editing Options
        </Button>
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                    <MenuItem className={classes.menuItem} onClick={() => { setEditMode("styles") }}>
                      <span>Style</span>
                    </MenuItem>
                    <MenuItem className={classes.menuItem} onClick={() => { setEditMode("content") }}>
                      <span>Content</span>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Paper>
    </Grid>
  )
}
