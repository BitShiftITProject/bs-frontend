import React, { useState } from 'react'
import { Grid, Fab, Typography, Divider, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { useIntl } from 'react-intl'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import SectionsList from '../SectionsList'

const contentStyle = {
  borderRadius: 15,
  padding: 15,
  minWidth: 300,
  overflowY: 'scroll',
  border: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(10px)'
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  closeIcon: {
    boxShadow: 'none',
    minHeight: theme.spacing(4),
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.lightest,
      transition: 'background-color 0.2s ease-in-out'
    },
    '&:active': {
      boxShadow: 'none'
    }
  }
}))

export default function SectionsButton({ pageId, handleSectionAdd }) {
  const classes = useStyles()

  const intl = useIntl()

  const [open, setOpen] = useState(false)

  function handleToggle() {
    setOpen((o) => !o)
  }
  function handleClose() {
    setOpen(false)
  }

  // function handleToggle() {
  //   setOpen((o) => !o)
  // }

  /* -------------------------------------------------------------------------- */
  /*                        Section Templates Popup Menu                        */
  /* -------------------------------------------------------------------------- */

  // Clicking on the Add Section button toggles a menu, whereby the user can
  // choose to add a template by clicking on the SectionTemplate component within the
  // SectionsList component

  const popup = (
    <Popup
      trigger={<span></span>}
      open={open}
      position='top right'
      contentStyle={contentStyle}
      offsetY={20}
      arrow={false}
    >
      {/* SECTIONS */}

      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={classes.container}
      >
        <div>
          <Typography variant='h6' component='h4'>
            {intl.formatMessage({ id: 'chooseATemplate' })}
          </Typography>
        </div>
        <div>
          <Fab size='small' className={classes.closeIcon} onClick={handleClose}>
            <CloseIcon />
          </Fab>
        </div>
      </Grid>

      <Divider />

      <SectionsList editing handleSectionAdd={handleSectionAdd} />
    </Popup>
  )
  return (
    <Grid>
      <div>
        <Fab
          style={!pageId ? { visibility: 'hidden' } : {}}
          variant='extended'
          onClick={handleToggle}
        >
          <AddIcon style={{ paddingRight: 5 }} />
          {intl.formatMessage({ id: 'addSection' })}
        </Fab>
        {popup}
      </div>
    </Grid>
  )
}
