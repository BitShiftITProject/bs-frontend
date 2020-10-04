import React, { useState } from 'react'

import { loggedInStyles, CursorTypography } from '../../Styles/loggedInStyles'
import CustomDialog from '../CommonComponents/CustomDialog'

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
  getPortfolio,
  patchPortfolio,
  postPageToPortfolio,
  deletePage
} from '../../Backend/Fetch'

import { useIntl } from 'react-intl'

export default function EditPortfolioContent(props) {
  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const { portfolio, setPortfolio, pages, setPages } = props
  const [pageIndex, setPageIndex] = useState(0)
  const [pageTitle, setPageTitle] = useState('')
  const [pageContent, setPageContent] = useState(null)

  /* -------------------------------------------------------------------------- */
  /*                                   Styles                                   */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper
  const leftPanel = classes.leftPanel

  /* -------------------------------------------------------------------------- */
  /*                                Dialog State                                */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ type: '', item: '' })

  const handleClose = () => {
    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                         Dialog Open Event Handlers                         */
  /* -------------------------------------------------------------------------- */

  function handlePortfolioEvent(name, value) {
    setDialogContent({ type: name, item: value })
    setOpen(true)
  }

  function handlePageEvent(name, value) {
    setDialogContent({ type: name, item: value })
    if (name === 'addPage') {
      setPageTitle('')
    } else {
      setPageTitle(pages[value].title)
    }
    setOpen(true)
  }

  /* -------------------------------------------------------------------------- */
  /*                         Dialog Close Event Handlers                        */
  /* -------------------------------------------------------------------------- */

  function handlePortfolioEdit(e) {
    e.preventDefault()
    // Edits the current portfolio's title and description
    patchPortfolio(portfolio.id, { title: portfolio.title, description: portfolio.description })
    // Sets the currently shown portfolio as the updated portfolio
    setPortfolio(getPortfolio(portfolio.id))
    setOpen(false)
  }

  function handlePageSelect(idx) {
    // Updates the page index and page content to be those of the selected page
    setPageIndex(idx)
    setPageContent(pages[idx].content)
  }

  async function handlePageAdd(e) {
    e.preventDefault()

    // Creates a new page with the user-updated pageTitle (basically the content
    // of the text field) as its title and no content
    const postDetails = {
      title: pageTitle,
      content: {}
    }

    // Adds the new page to the Page DB, and saving the actual details of the
    // newly-added page
    const newPage = await postPageToPortfolio(portfolio.id, postDetails).then((response) =>
      response.json()
    )

    // Updates the pages to included the newly added page in the frontend,
    // without messing with the other pages' unsaved changes
    setPages((pages) => [...pages, newPage])

    setOpen(false)
  }

  async function handlePageTitleEdit(e) {
    e.preventDefault()

    // Edit the page title of the Page in the DB
    await patchPage(pages[dialogContent.item].id, { title: pageTitle })

    // Replace the title of the changed page manually to show the change in
    // frontend, to avoid deleting any unsaved changes in the other pages'
    setPages((pages) =>
      pages.map((page) => {
        if (page.id === pages[dialogContent.item].id) {
          return { ...page, title: pageTitle }
        } else {
          return page
        }
      })
    )
    setOpen(false)
  }

  async function handlePageContentEdit(e) {
    e.preventDefault()

    // Edit the page content of the Page in the DB
    await patchPage(pages[pageIndex].id, { content: pageContent })

    // Replace the content of the changed page manually to show the change in
    // frontend, to avoid deleting any unsaved changes in the other pages'
    setPages((pages) =>
      pages.map((page) => {
        if (page.id === pages[pageIndex].id) {
          return { ...page, content: pageContent }
        } else {
          return page
        }
      })
    )
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
    await deletePage(pageId)

    setOpen(false)
  }

  /* ----------------------------- Dialog Content ----------------------------- */

  const dialogType = {
    // Contains the contents to be rendered when a dialog is triggered, which is
    // to be sent to the CustomDialog component
    /* -------------------------------------------------------------------------- */
    // Dialog to show when the Edit button next to the portfolio title is clicked
    editPortfolio: (
      <form onSubmit={handlePortfolioEdit}>
        {/*
         * TITLE
         */}
        <DialogTitle>{intl.formatMessage({ id: 'editPortfolio' })}</DialogTitle>
        {/*
         * TEXT FIELDS
         */}
        <DialogContent>
          <TextField
            inputProps={{ className: classes.input }}
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
            inputProps={{ className: classes.input }}
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
        {/*
         * BUTTONS
         */}
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
        {/*
         * TITLE
         */}
        <DialogTitle>{intl.formatMessage({ id: 'addPage' })}</DialogTitle>
        {/*
         * TEXT FIELDS
         */}
        <DialogContent>
          <TextField
            inputProps={{ className: classes.input }}
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
        {/*
         * BUTTONS
         */}
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
        {/*
         * TITLE
         */}
        <DialogTitle>{intl.formatMessage({ id: 'editPage' })}</DialogTitle>
        {/*
         * TEXT FIELDS
         */}
        <DialogContent>
          <TextField
            inputProps={{ className: classes.input }}
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
        {/*
         * BUTTONS
         */}
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
        {/*
         * TITLE
         */}
        <DialogTitle id='alert-dialog-title'>
          {intl.formatMessage({ id: 'deletePage' })}
        </DialogTitle>
        {/*
         * CONTENT
         */}
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {intl.formatMessage(
              { id: 'deletePagePrompt' },
              { page: <span style={{ fontWeight: 'bold' }}>{pageTitle}</span> }
            )}
          </DialogContentText>
        </DialogContent>
        {/*
         * BUTTONS
         */}
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

            {/* PORTFOLIO PAGES (List) */}

            <Grid container direction='column' justify='space-evenly' className={classes.padded}>
              <CursorTypography variant='overline'>
                {intl.formatMessage({ id: 'pages' })}
              </CursorTypography>

              {/* Each list item corresponds to a page. It shows the page's title, and when
               * hovered has an edit button (Pen icon) and a delete button (Trash icon). */}

              <List>
                {pages &&
                  pages.map((page, idx) => (
                    <ListItem
                      onClick={() => handlePageSelect(idx)}
                      key={idx}
                      button
                      className={classes.hiddenButtonItem}
                    >
                      {/* PAGE TITLE */}
                      <ListItemText>{page.title}</ListItemText>
                      {/* EDIT PAGE BUTTON */}
                      <Fab
                        color='primary'
                        size='small'
                        className={classes.hiddenButton}
                        onClick={() => handlePageEvent('editPage', idx)}
                      >
                        <CreateIcon />
                      </Fab>
                      {/* DELETE PAGE BUTTON */}
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

              {/* ADD PAGE BUTTON */}

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

          {/* SAVE CHANGES BUTTON */}

          <Grid item className={classes.floatingBottomContainer}>
            <Fab color='secondary' variant='extended' onClick={handlePageContentEdit}>
              <CursorTypography variant='button'>
                {intl.formatMessage({ id: 'saveChanges' })}
              </CursorTypography>
            </Fab>
          </Grid>
        </Paper>
      </Grid>
      {dialog}
    </Grid>
  )
}
