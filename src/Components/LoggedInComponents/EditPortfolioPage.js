import React, { useEffect, useState } from 'react'

import { loggedInStyles, PaddedFormGrid, CursorTypography } from '../../styles/loggedInStyles'
import CustomDialog from './CustomDialog'
import EditPortfolioDropdown from './EditPortfolioDropdown'

import {
  Grid,
  Paper,
  Fab,
  Divider,
  List,
  // ListItem,
  // ListItemText,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
// import CloseIcon from '@material-ui/icons/Close'
import Sidebar from './Sidebar'

import { getPortfolio, patchPortfolio } from '../../backend/Fetch'

import { useHistory } from 'react-router-dom'

export default function EditPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [portfolio, setPortfolio] = useState({})
  const [paragraph, setParagraph] = useState('')

  /* -------------------------------------------------------------------------- */
  /*                         Fetching Current Portfolio                         */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()
  const portfolioId = window.sessionStorage.getItem('portfolioId')

  // Runs when the component is mounted for the first time, fetches the
  // portfolio using the portfolioId item set in the sessionStorage.
  // The portfolioId is set in the sessionStorage when:
  // - A user clicks on the Add Portfolio button in AddPortfolioPage
  // - A user clicks on the Edit button in PortfolioCard
  useEffect(() => {
    getPortfolio(portfolioId).then((portfolio) => {
      setPortfolio({ ...portfolio })
      setParagraph(portfolio.pages.content || '')
    })
  }, [portfolioId])

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
    patchPortfolio(portfolioId, { title: portfolio.title, description: portfolio.description })
    setOpen(false)
  }

  const handleDelete = () => {
    alert(`Deleted ${dialogContent.target}!`)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function handleSubmit() {
    patchPortfolio(portfolioId, { pages: { content: paragraph } })
    history.push('/portfolios')
  }

  const dialogType = {
    // Contains the contents to be rendered when a dialog is triggered, which is
    // to be sent to the CustomDialog component
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Edit button next to the portfolio title is clicked
    title: (
      <form onSubmit={handleEdit}>
        <DialogTitle id='form-dialog-title'>Edit portfolio</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            margin='dense'
            id='portfolioName'
            label='Title'
            fullWidth
            value={portfolio.title}
            onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
          />
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            margin='dense'
            id='portfolioDesc'
            label='Description'
            fullWidth
            value={portfolio.description}
            onChange={(e) => setPortfolio({ ...portfolio, description: e.target.value })}
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
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Edit button next to a page is clicked (doesn't
    // exist yet)
    page: (
      <form onSubmit={handleEdit}>
        <DialogTitle id='form-dialog-title'>Edit page</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
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
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Delete button next to a page is clicked (doesn't
    // exist yet)
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
    )
  }

  const dialog = (
    <CustomDialog open={open} setOpen={setOpen} content={dialogType[dialogContent.type]} />
  )

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <Grid container direction='column' spacing={0}>
      <EditPortfolioDropdown />
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
                <CursorTypography variant='button'>{portfolio.title}</CursorTypography>
                <Fab
                  color='primary'
                  size='small'
                  onClick={() => handleClick('title', portfolio.title)}
                >
                  <CreateIcon />
                </Fab>
              </Grid>
              <Divider orientation='horizontal' />

              {/*
               * PORTFOLIO PAGES (doesn't exist yet, a portfolio currently only has 1 page)
               */}

              {/* Each Portfolio object in the DB has a pages attribute.
               * This attribute is currently temporarily set as an object.
               */}

              <Grid container direction='column' justify='space-evenly' className={classes.padded}>
                <CursorTypography variant='overline'>Pages</CursorTypography>
                <List>
                  {/*portfolio.pages &&
                    portfolio.pages.map((page, idx) => (
                      <ListItem key={idx} button className={classes.hiddenButtonItem}>
                        <ListItemText onClick={() => {}}>{page.name}</ListItemText>
                        <Fab
                          color='primary'
                          size='small'
                          className={classes.hiddenButton}
                          onClick={() => handleClick('page', page.item)}
                        >
                          <CreateIcon />
                        </Fab>
                        <Fab
                          color='primary'
                          size='small'
                          className={classes.hiddenButton}
                          onClick={() => handleClick('delete', page.item)}
                        >
                          <CloseIcon />
                        </Fab>
                      </ListItem>
                    ))*/}
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
                        shrink: true
                      }}
                      value={paragraph}
                      onChange={(e) => setParagraph(e.target.value)}
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
              <Fab color='primary' variant='extended' onClick={handleSubmit}>
                <CursorTypography variant='button'>Save Changes</CursorTypography>
              </Fab>
            </Grid>
          </Paper>
        </Grid>
        {dialog}
      </Grid>
    </Grid>
  )
  return <Sidebar content={content} />
}
