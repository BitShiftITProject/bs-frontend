import React, { useEffect, useState } from 'react'

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

import SectionsList from '../../Sections/SectionsList'
import SectionsButton from '../../Sections/SectionAdd/SectionsButton'

import { loggedInStyles, CursorTypography } from '../../../Styles/loggedInStyles'
import CustomDialog from '../../CommonComponents/CustomDialog'

import {
  // page related imports
  patchPage,
  getPortfolio,
  patchPortfolio,
  postPageToPortfolio,
  deletePage
} from '../../../Backend/Fetch'

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
  const [portfolioTitle, setPortfolioTitle] = useState('')
  const [pageId, setPageId] = useState(null)
  const [pageTitle, setPageTitle] = useState('')
  const [sections, setSections] = useState({})

  useEffect(() => {
    setSections((currentSections) => {
      const newSections = pages
        .map((page) => {
          if (Object.keys(currentSections).includes(page.id)) {
            return {}
          }
          return { [page.id]: page.content.sections }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr }), currentSections)

      console.log('Sections:', newSections)

      return newSections

      // return Object.assign(
      //   currentSections,
      // ...pages.map((page) => {
      //   if (Object.keys(currentSections).includes(page.id)) {
      //     return {}
      //   }
      //   return { [page.id]: page.content.sections }
      // })
      // )
    })
  }, [pages])

  /* -------------------------------------------------------------------------- */
  /*                                Section Handlers                            */
  /* -------------------------------------------------------------------------- */

  function handleSectionAdd(newSection) {
    // console.log(newSection)
    setSections((currentSections) => {
      const newSections = {
        ...currentSections,
        [pageId]: currentSections[pageId] ? [...currentSections[pageId], newSection] : [newSection]
      }
      console.log(newSections)
      return newSections
    })
  }

  function handleSectionEdit(sectionIndex) {
    console.log(`Editing section ${sectionIndex} in page ${pageId}`)
  }

  function handleSectionDelete(sectionIndex) {
    console.log(`Deleting section ${sectionIndex} in page ${pageId}`)
  }

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
  const [dialogContent, setDialogContent] = useState({ type: '', component: '' })

  const handleClose = () => {
    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                         Dialog Open Event Handlers                         */
  /* -------------------------------------------------------------------------- */

  // These two functions set the type of the event (which matches the key
  // strings of the dialogType object) as well as the target component of the current event.

  /* -------------------------------------------------------------------------- */

  // Portfolio event types include:
  // - editPortfolio: To edit the title and/or description of the portfolio

  function handlePortfolioEvent(name, value) {
    // The name variable must match a dialogType key
    // The value variable is the portfolio title

    setDialogContent({ type: name, component: value })
    setPortfolioTitle(value)
    setOpen(true)
  }

  /* -------------------------------------------------------------------------- */

  // Page event types include:
  // - addPage: To add a page with the user-typed title
  // - editPage: To edit the title of the page
  // - deletePage: To completely delete the page and its contents from the
  //   portfolio

  function handlePageEvent(name, value) {
    // The name variable must match a dialogType key
    // The value variable is the page index

    setDialogContent({ type: name, component: value })

    // Set the page title text field's default value as empty for adding a page,
    // and the to-be-edited page's title for editing a page
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

  /* ---------------------------- Portfolio Events ---------------------------- */

  // Edits the current portfolio's title and description
  async function handlePortfolioEdit(e) {
    e.preventDefault()
    await patchPortfolio(portfolio.id, {
      title: portfolioTitle,
      description: portfolio.description
    })
    // Sets the currently shown portfolio as the updated portfolio
    const updatedPortfolio = await getPortfolio(portfolio.id)
    setPortfolio(updatedPortfolio)
    setOpen(false)
  }

  /* ------------------------------- Page Events ------------------------------ */

  // Updates the page index and page content to be those of the selected page
  function handlePageSelect(id) {
    if (pageId === id) {
      setPageId(null)
    } else {
      setPageId(id)
    }
  }

  /* -------------------------------------------------------------------------- */

  async function handlePageAdd(e) {
    e.preventDefault()

    // Creates a new page with the user-updated pageTitle (basically the content
    // of the text field) as its title and no content
    const postDetails = {
      title: pageTitle,
      content: {
        sections: []
      }
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

  /* -------------------------------------------------------------------------- */

  // Edit the PAGE TITLE of the Page in the DB
  async function handlePageTitleEdit(e) {
    e.preventDefault()

    await patchPage(pages[dialogContent.component].id, { title: pageTitle })

    // Replace the title of the changed page manually to show the change in
    // frontend, to avoid deleting any unsaved changes in the other pages'
    setPages((pages) =>
      pages.map((page) => {
        if (page.id === pages[dialogContent.component].id) {
          return { ...page, title: pageTitle }
        } else {
          return page
        }
      })
    )
    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */

  // Edit the PAGE CONTENT of the Page in the DB
  async function handleSaveSections(e) {
    e.preventDefault()

    await patchPage(pageId, { content: { sections: sections[pageId] } })

    // // Replace the content of the changed page manually to show the change in
    // // frontend, to avoid deleting any unsaved changes in the other pages'
    // setPages((pages) =>
    //   pages.map((page) => {
    //     if (page.id === pageId) {
    //       return { ...page, content: { sections: sections[pageId] } }
    //     } else {
    //       return page
    //     }
    //   })
    // )
    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */

  // Removes a Page (and any reference to it) from the DB
  async function handlePageDelete(e) {
    e.preventDefault()
    const toBeDeletedPageId = pages[dialogContent.component].id

    // Get the new list of page IDs
    const newPageIds = pages.map((pageObj) => pageObj.id).filter((id) => id !== toBeDeletedPageId)

    // Create a temporary Set item for it, used to filter the current pages
    // state array, which consists of the page objects (not just IDs)
    const newPageIdsSet = new Set(newPageIds)
    const newPages = pages.filter((pageObj) => newPageIdsSet.has(pageObj.id))

    // Set the pages state as the new list of page objects, which does
    // not have the to-be-deleted page
    setPages(newPages)

    // Delete the portfolio from the portfolios DB
    await deletePage(toBeDeletedPageId)

    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                               Dialog Content                               */
  /* -------------------------------------------------------------------------- */

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
            value={portfolioTitle}
            onChange={(e) => setPortfolioTitle(e.target.value)}
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

  /* -------------------------------------------------------------------------- */
  /*                                Rendered Page                               */
  /* -------------------------------------------------------------------------- */

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

              {/* EDIT PORTFOLIO BUTTON */}

              <Fab
                color='secondary'
                size='small'
                onClick={() => handlePortfolioEvent('editPortfolio', portfolio.title)}
              >
                <CreateIcon />
              </Fab>
            </Grid>

            <Divider />

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
                      onClick={() => handlePageSelect(page.id)}
                      key={page.id}
                      button
                      selected={page.id === pageId}
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

              <Fab
                color='primary'
                size='small'
                variant='extended'
                onClick={() => handlePageEvent('addPage', '')}
                style={{ marginLeft: 5, marginRight: 5 }}
              >
                {intl.formatMessage({ id: 'addPage' })}
                <AddIcon style={{ paddingLeft: 5 }} />
              </Fab>
            </Grid>

            <Divider />
          </Grid>
        </Paper>
      </Grid>

      {/*
       * PAGE CONTENT
       */}

      <Grid item xs={12} md={8} lg={9} id='page-content'>
        <Paper className={fixedHeightPaper}>
          {/*
           * PAGE SECTIONS
           */}

          {!pageId && (
            <Grid
              item
              xs={10}
              style={{ minWidth: '100%', overflow: 'scroll' }}
              container
              justify='center'
              alignItems='center'
            >
              <CursorTypography variant='subtitle2'>
                Select a page to start editing your portfolio
              </CursorTypography>
            </Grid>
          )}

          {pageId && (
            <Grid
              item
              xs={10}
              style={{ minWidth: '100%', overflow: 'scroll' }}
              container
              direction='column'
              justify='space-between'
            >
              <SectionsList
                sections={sections ? sections[pageId] : []}
                editing
                handleSectionEdit={handleSectionEdit}
                handleSectionDelete={handleSectionDelete}
              />
            </Grid>
          )}

          {/* SAVE CHANGES BUTTON */}

          <Grid
            item
            xs={2}
            style={{ minWidth: '100%' }}
            container
            spacing={2}
            direction='row'
            justify='flex-end'
            alignItems='center'
            className={classes.floatingBottomContainer}
          >
            <Grid item>
              <Fab
                style={!pageId ? { visibility: 'hidden' } : {}}
                color='secondary'
                variant='extended'
                onClick={handleSaveSections}
              >
                <CursorTypography variant='button'>
                  {intl.formatMessage({ id: 'saveSections' })}
                </CursorTypography>
              </Fab>
            </Grid>

            {/* ADD SECTION BUTTON */}
            {/* When a section is clicked, it adds the section to the overall sections component */}
            <Grid item></Grid>
            <SectionsButton pageId={pageId} handleSectionAdd={handleSectionAdd} />
          </Grid>
        </Paper>
      </Grid>
      {dialog}
    </Grid>
  )
}
