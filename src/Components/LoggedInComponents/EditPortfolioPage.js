import React, { useState } from 'react'

import { loggedInStyles, PaddedFormGrid, CursorTypography } from '../loggedInStyles'
import CustomDialog from './CustomDialog'

import {
  Grid,
  Paper,
  Fab,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import CloseIcon from '@material-ui/icons/Close'
import Sidebar from './Sidebar'

export default function EditPortfolioPage() {
  // Test Data
  const title = 'My Portfolio'
  const listItems = ['About Me', 'Education', 'Contact']

  /* -------------------------------------------------------------------------- */
  /*                             State and Handlers                             */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   Styles                                   */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper
  const leftPanel = classes.leftPanel

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ type: '', target: '' })

  const handleClick = (name, value) => {
    setDialogContent({ type: name, target: value })
    setOpen(true)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    console.log(dialogContent)
    setOpen(false)
  }

  const handleDelete = () => {
    alert(`Deleted ${dialogContent.target}!`)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const dialogType = {
    title: (
      <form onSubmit={handleEdit}>
        <DialogTitle id='form-dialog-title'>Edit portfolio</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            margin='dense'
            id='portfolioName'
            label='Title'
            fullWidth
          />
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            margin='dense'
            id='portfolioDesc'
            label='Description'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleEdit} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </form>
    ),
    page: (
      <form onSubmit={handleEdit}>
        <DialogTitle id='form-dialog-title'>Edit page</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            label='Title'
            margin='dense'
            id='pageName'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleEdit} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </form>
    ),
    delete: (
      <div>
        <DialogTitle id='alert-dialog-title'>{'Delete this page?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete the{' '}
            <span style={{ fontWeight: 'bold' }}>{dialogContent.target}</span> page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='error' variant='container' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </div>
    ),
  }

  const dialog = (
    <CustomDialog open={open} setOpen={setOpen} content={dialogType[dialogContent.type]} />
  )

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <Grid container direction='row' spacing={0}>
      {/*
       * LIST MENU
       */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={leftPanel}>
          {/*
           * LIST MENU CONTENT
           */}
          <Grid style={{ width: '100%', height: '100%' }}>
            {/*
             * PORTFOLIO TITLE
             */}
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
              className={classes.padded}
            >
              <CursorTypography variant='button'>{title}</CursorTypography>
              <Fab color='primary' size='small' onClick={() => handleClick('title', title)}>
                <CreateIcon />
              </Fab>
            </Grid>
            <Divider orientation='horizontal' />

            {/*
             * PORTFOLIO PAGES
             */}

            <Grid container direction='column' justify='space-evenly' className={classes.padded}>
              <CursorTypography variant='overline'>Pages</CursorTypography>
              <List>
                {listItems.map((item, idx) => (
                  <ListItem key={idx} button className={classes.hiddenButtonItem}>
                    <ListItemText onClick={() => {}}>{item}</ListItemText>
                    <Fab
                      color='primary'
                      size='small'
                      className={classes.hiddenButton}
                      onClick={() => handleClick('page', item)}
                    >
                      <CreateIcon />
                    </Fab>
                    <Fab
                      color='primary'
                      size='small'
                      className={classes.hiddenButton}
                      onClick={() => handleClick('delete', item)}
                    >
                      <CloseIcon />
                    </Fab>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/*
       * PAGE SECTIONS
       */}

      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          {/*
           * PAGE CONTENT
           */}
          <Grid
            item
            xs={12}
            container
            direction='column'
            justify='space-between'
            style={{ height: '100%', overflow: 'scroll' }}
          >
            <form>
              <Grid container direction='column'>
                <PaddedFormGrid item>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='outlined'
                    label='Paragraph'
                    fullWidth
                    multiline
                  ></TextField>
                </PaddedFormGrid>
              </Grid>
            </form>
          </Grid>
          {/*
           * SAVE CHANGES BUTTON
           */}
          <Grid item className={classes.floatingBottomContainer}>
            <Fab color='primary' variant='extended'>
              <CursorTypography variant='button'>Save Changes</CursorTypography>
            </Fab>
          </Grid>
        </Paper>
      </Grid>
      {dialog}
    </Grid>
  )
  return <Sidebar content={content} />
}
