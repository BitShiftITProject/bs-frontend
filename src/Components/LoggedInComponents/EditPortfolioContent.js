import React, { useState } from 'react'

import {
  loggedInStyles,
  //PaddedFormGrid,
  CursorTypography
} from '../../Styles/loggedInStyles'
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
  DialogTitle
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import {
  patchPage,
  patchPortfolio,
  postPageToPortfolio,
  deletePage,
  getPortfolioPages
} from '../../Backend/Fetch'

import { useIntl } from 'react-intl'

export default function EditPortfolioContent(props) {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  // TODO: Use setPages when updating a page's contents
  const { portfolio, setPortfolio, pages, setPages } = props
  const [pageIndex, setPageIndex] = useState(0)
  const [pageTitle, setPageTitle] = useState('')
  const [pageContent, setPageContent] = useState(
    pages && pages[pageIndex] ? pages[pageIndex].content : null
  )

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
  const [dialogContent, setDialogContent] = useState({ type: '', item: '' })

  const handleClose = () => {
    setOpen(false)
  }

  /* -------------------------- Dialog Open Handlers -------------------------- */
  // Handlers for when a dialog open event is triggered

  function handlePortfolioEvent(name, value) {
    setDialogContent({ type: name, item: value })
    setOpen(true)
  }

  function handlePageEvent(name, value) {
    setDialogContent({ type: name, item: value })
    if (name !== 'addPage') setPageTitle(pages[value].title)
    setOpen(true)
  }

  /* -------------------------- Dialog Close Handlers ------------------------- */
  // Handlers for when a dialog close event is triggered

  function handlePortfolioEdit(e) {
    e.preventDefault()
    patchPortfolio(portfolio.id, { title: portfolio.title, description: portfolio.description })
    setOpen(false)
  }

  function handlePageSelect(idx) {
    setPageIndex(idx)
    setPageContent(pages[idx].content)
    // console.log('Page', idx, 'selected')
  }

  async function handlePageAdd(e) {
    e.preventDefault()
    const postDetails = {
      title: pageTitle,
      content: {}
    }
    await postPageToPortfolio(portfolio.id, postDetails).then((response) => {
      if (response.ok) {
        console.log('Page added!')
      } else {
        console.log('Page NOT added!')
      }
    })

    await getPortfolioPages(portfolio.id).then((pages) => setPages(pages))
    setOpen(false)
  }

  async function handlePageTitleEdit(e) {
    e.preventDefault()
    await patchPage(pages[dialogContent.item].id, { title: pageTitle }).then((response) => {
      if (response.ok) {
        console.log('Page title edited!')
      } else {
        console.log('Page title NOT edited!')
      }
    })

    await getPortfolioPages(portfolio.id).then((pages) => setPages(pages))
    setOpen(false)
  }

  async function handlePageContentEdit(e) {
    e.preventDefault()
    await patchPage(pages[pageIndex].id, { content: pageContent }).then((response) => {
      if (response.ok) {
        console.log('Page content edited!')
      } else {
        console.log('Page content NOT edited!')
      }
    })

    await getPortfolioPages(portfolio.id).then((pages) => setPages(pages))
    setOpen(false)
  }

  async function handlePageDelete(e) {
    e.preventDefault()
    const pageId = pages[dialogContent.item].id

    // Get the new list of page IDs
    const newPageIds = pages.map((pageObj) => pageObj.id).filter((id) => id !== pageId)

    // Create a temporary Set item for it, used to filter the current pages
    // state array, which consists of the page objects (not just IDs)
    const newPageIdsSet = new Set(newPageIds)
    const newPages = pages.filter((pageObj) => newPageIdsSet.has(pageObj.id))

    // Set the pages state as the new list of page objects, which does
    // not have the to-be-deleted page
    setPages(newPages)

    // Delete the portfolio from the portfolios DB
    await deletePage(pageId).then((response) => {
      if (response.ok) {
        console.log('Page deleted!')
      } else {
        console.log('Page NOT deleted!')
      }
    })

    setOpen(false)
  }

  /* ----------------------------- Dialog Content ----------------------------- */

  const intl = useIntl()

  const dialogType = {
    // Contains the contents to be rendered when a dialog is triggered, which is
    // to be sent to the CustomDialog component
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Edit button next to the portfolio title is clicked
    editPortfolio: (
      <form onSubmit={handlePortfolioEdit}>
        <DialogTitle>{intl.formatMessage({ id: 'editPortfolio' })}</DialogTitle>
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
    // Dialog to show when the (+) button below pages is clicked to add a page
    addPage: (
      <form onSubmit={handlePageAdd}>
        <DialogTitle>{intl.formatMessage({ id: 'addPage' })}</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            margin='dense'
            id='pageName'
            label={intl.formatMessage({ id: 'title' })}
            fullWidth
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button onClick={handlePageAdd} variant='contained'>
            {intl.formatMessage({ id: 'add' })}
          </Button>
        </DialogActions>
      </form>
    ),

    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Edit button next to a page is clicked
    editPage: (
      <form onSubmit={handlePageTitleEdit}>
        <DialogTitle>{intl.formatMessage({ id: 'editPage' })}</DialogTitle>
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
          <Button onClick={handlePageTitleEdit} variant='contained'>
            {intl.formatMessage({ id: 'save' })}
          </Button>
        </DialogActions>
      </form>
    ),
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Delete button next to a page is clicked
    deletePage: (
      <div>
        <DialogTitle id='alert-dialog-title'>
          {intl.formatMessage({ id: 'deletePage' })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {intl.formatMessage(
              { id: 'deletePagePrompt' },
              { page: <span style={{ fontWeight: 'bold' }}>{pageTitle}</span> }
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button onClick={handlePageDelete} variant='contained'>
            {intl.formatMessage({ id: 'delete' })}
          </Button>
        </DialogActions>
      </div>
    )
  }

  const dialog = (
    <CustomDialog open={open} setOpen={setOpen} content={dialogType[dialogContent.type]} />
  )
  return (
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
                onClick={() => handlePortfolioEvent('editPortfolio', portfolio.title)}
              >
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
                {pages &&
                  pages.map((page, idx) => (
                    <ListItem
                      onClick={() => handlePageSelect(idx)}
                      key={idx}
                      button
                      className={classes.hiddenButtonItem}
                    >
                      <ListItemText>{page.title}</ListItemText>
                      <Fab
                        color='primary'
                        size='small'
                        className={classes.hiddenButton}
                        onClick={() => handlePageEvent('editPage', idx)}
                      >
                        <CreateIcon />
                      </Fab>
                      <Fab
                        color='primary'
                        size='small'
                        className={classes.hiddenButton}
                        onClick={() => handlePageEvent('deletePage', idx)}
                      >
                        <CloseIcon />
                      </Fab>
                    </ListItem>
                  ))}
              </List>
              <Fab color='primary' size='small' onClick={() => handlePageEvent('addPage', '')}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/*
       * PAGE CONTENT
       */}

      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          {/*
           * PAGE SECTIONS
           */}
          <Grid
            item
            xs={12}
            container
            direction='column'
            justify='space-between'
            style={{ height: '100%', overflow: 'scroll' }}
          >
            {pages && pages[pageIndex] ? JSON.stringify(pages[pageIndex]) : ''}
          </Grid>
          {/*
           * SAVE CHANGES BUTTON
           */}
          <Grid item className={classes.floatingBottomContainer}>
            <Fab color='primary' variant='extended' onClick={handlePageContentEdit}>
              <CursorTypography variant='button'>Save Changes</CursorTypography>
            </Fab>
          </Grid>
        </Paper>
      </Grid>
      {dialog}
    </Grid>
  )
}
