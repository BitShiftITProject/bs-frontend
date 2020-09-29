import React, { useEffect, useState } from 'react'

import {
  loggedInStyles,
  //PaddedFormGrid,
  CursorTypography
} from '../../Styles/loggedInStyles'
import CustomDialog from './CustomDialog'
import EditPortfolioDropdown from './EditPortfolioDropdown'

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
  DialogTitle
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import CloseIcon from '@material-ui/icons/Close'
import Sidebar from './Sidebar'

import { getPortfolio, getPortfolioPages, patchPage, patchPortfolio } from '../../Backend/Fetch'

import { useIntl } from 'react-intl'

export default function EditPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [portfolio, setPortfolio] = useState({})
  const [pages, setPages] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageTitle, setPageTitle] = useState('')

  /* -------------------------------------------------------------------------- */
  /*                         Fetching Current Portfolio                         */
  /* -------------------------------------------------------------------------- */

  const portfolioId = window.sessionStorage.getItem('portfolioId')

  // Runs when the component is mounted for the first time, fetches the
  // portfolio using the portfolioId item set in the sessionStorage.
  // The portfolioId is set in the sessionStorage when:
  // - A user clicks on the Add Portfolio button in AddPortfolioPage
  // - A user clicks on the Edit button in PortfolioCard
  useEffect(() => {
    getPortfolio(portfolioId).then((portfolio) => {
      setPortfolio({ ...portfolio })
      getPortfolioPages(portfolioId).then((pages) => {
        setPages(pages)
      })
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

  const handlePortfolioClick = (name, value) => {
    setDialogContent({ type: name, target: value })
    setOpen(true)
  }

  const handlePageClick = (name, value) => {
    setDialogContent({ type: name, target: value })
    setPageTitle(pages[value].title)
    setOpen(true)
  }

  const handlePortfolioEdit = (e) => {
    e.preventDefault()
    patchPortfolio(portfolioId, { title: portfolio.title, description: portfolio.description })
    setOpen(false)
  }

  const handlePageEdit = (e) => {
    e.preventDefault()
    patchPage(pages[pageIndex], {})
    setOpen(false)
  }

  const handlePageDelete = () => {
    alert(`Deleted ${dialogContent.target}!`)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function handleSubmit() {
    // if((await patchPortfolio(portfolioId, { pages: { content: paragraph } })).ok){
    //     window.location.href = '/portfolios'
    //     console.log("Saved changes success")
    // }
  }

  const intl = useIntl()

  const dialogType = {
    // Contains the contents to be rendered when a dialog is triggered, which is
    // to be sent to the CustomDialog component
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Edit button next to the portfolio title is clicked
    title: (
      <form onSubmit={handlePortfolioEdit}>
        <DialogTitle id='form-dialog-title'>
          {intl.formatMessage({ id: 'editPortfolio' })}
        </DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            margin='dense'
            id='portfolioName'
            label={intl.formatMessage({ id: 'title' })}
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
            label={intl.formatMessage({ id: 'portfolioDescription' })}
            fullWidth
            value={portfolio.description}
            onChange={(e) => setPortfolio({ ...portfolio, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button onClick={handlePortfolioEdit} variant='contained'>
            {intl.formatMessage({ id: 'save' })}
          </Button>
        </DialogActions>
      </form>
    ),
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Edit button next to a page is clicked (doesn't
    // exist yet)
    page: (
      <form onSubmit={handlePageEdit}>
        <DialogTitle id='form-dialog-title'>{intl.formatMessage({ id: 'editPage' })}</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            label={intl.formatMessage({ id: 'title' })}
            margin='dense'
            id='pageName'
            fullWidth
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button onClick={handlePageEdit} variant='contained'>
            {intl.formatMessage({ id: 'save' })}
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
            {intl.formatMessage(
              { id: 'deletePage' },
              { page: <span style={{ fontWeight: 'bold' }}>{pages[dialogContent.target]}</span> }
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='outlined'>
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button onClick={handlePageDelete} color='error' variant='container' autoFocus>
            {intl.formatMessage({ id: 'delete' })}
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
                  onClick={() => handlePortfolioClick('title', portfolio.title)}
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
                  {pages &&
                    pages.map((page, idx) => (
                      <ListItem key={idx} button className={classes.hiddenButtonItem}>
                        <ListItemText onClick={() => setPageIndex(idx)}>{page.title}</ListItemText>
                        <Fab
                          color='primary'
                          size='small'
                          className={classes.hiddenButton}
                          onClick={() => handlePageClick('page', idx)}
                        >
                          <CreateIcon />
                        </Fab>
                        <Fab
                          color='primary'
                          size='small'
                          className={classes.hiddenButton}
                          onClick={() => handlePageClick('delete', idx)}
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
              {JSON.stringify(pages[pageIndex])}
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
