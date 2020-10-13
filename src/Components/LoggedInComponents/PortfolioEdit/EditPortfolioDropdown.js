import React, { useState, useRef, useEffect } from 'react'

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

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { makeStyles } from '@material-ui/core/styles'

import { useIntl } from 'react-intl'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

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
    width: '100%'
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export default function EditPortfolioDropdown({ setEditMode }) {
  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                    Popper/Button State and its Handlers                    */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  // Toggles it to false if true, and vice versa
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
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
  const prevOpen = useRef(open)
  useEffect(() => {
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
          {intl.formatMessage({ id: 'editingOptions' })} <ArrowDropDownIcon />
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
                    <MenuItem
                      className={classes.menuItem}
                      onClick={(e) => {
                        setEditMode('styles')
                        handleClose(e)
                      }}
                    >
                      <span>{intl.formatMessage({ id: 'style' })}</span>
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      onClick={(e) => {
                        setEditMode('content')
                        handleClose(e)
                      }}
                    >
                      <span>{intl.formatMessage({ id: 'content' })}</span>
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
