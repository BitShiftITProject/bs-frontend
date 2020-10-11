import React, { useContext, useEffect, useState } from 'react'

import {
  Grid,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

import { loggedInStyles } from '../../../../Styles/loggedInStyles'
import CustomDialog from '../../../CommonComponents/CustomDialog'
import EditPortfolioPagesGrouped from "./EditPortfolioPagesGrouped"
import EditPortfolioSectionsGrouped from "./EditPortfolioSectionsGrouped"

import {
  // page related imports
  patchPage,
  getPortfolio,
  patchPortfolio,
  postPageToPortfolio,
  deletePage
} from '../../../../Backend/Fetch'

import { useIntl } from 'react-intl'
import { PortfolioContext } from '../../../Contexts/PortfolioContext'

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
  const [pageTitle, setPageTitle] = useState('')

  // The PortfolioContext stores all details about:
  // - The ID of the currently-selected page (pageId) whose sections are shown,
  // - The indexes of the currently-editable (non-disabled) sections (editableSections)
  // - The current portfolio's section objects by page ID (sections),
  //   stored like the following example:
  //
  //       {
  //         pageId1: [ {id: headingTitle, data: { title: "Hello" } } ],
  //         pageId2: [ {id} singleText, data: { paragraph: "My name is React" } } ],
  //       }
  //
  // EditPortfolioContent uses pageId and sections to render a selected page's sections,
  // as well as to add sections via SectionsButton, and edit or delete sections
  // SectionsList.
  const { pageId, setPageId, resetEditState, sections, setSections } = useContext(PortfolioContext)

  /* -------------------------------------------------------------------------- */
  /*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */

  // This is run when the portfolio content editing page is first mounted
  useEffect(() => {
    // Reset the selected page ID, so at first, no page is selected

    setPageId(null)
  }, [setPageId])

  // This is run after the portfolio content editing page is unmounted
  useEffect(() => {
    // Reset the selected page ID and clear the sections whose changes we should keep
    // track of, since if we are unmounting then we don't need keep track of
    // anymore

    return () => {
      setPageId(null)
      setSections([])
    }
  }, [setPageId, setSections])

  // This is run when pages is first mounted and every time it is updated,
  // such as when a page is added or deleted or when the changes
  // to the sections within it are saved
  useEffect(() => {
    // console.log('Pages:', pages)

    setSections((currentSections) => {
      //
      const newSections = pages
        .map((page) => {
          if (Object.keys(currentSections).includes(page.id)) {
            return {}
          }
          return { [page.id]: page.content.sections }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr }), currentSections)
      // console.log('Sections:', newSections)

      return newSections
    })
  }, [pages, setSections])

  /* -------------------------------------------------------------------------- */
  /*                                Section Handlers                            */
  /* -------------------------------------------------------------------------- */

  // Adds a new correctly-formatted section object into the current page's list
  // of sections (Note: Does not save to the backend)
  function handleSectionAdd(newSection) {
    setSections((currentSections) => {
      // If this is the first section of the page, just set it as [newSection],
      // otherwise just add newSection to the end of the current list of sections
      const newSections = {
        ...currentSections,
        [pageId]: currentSections[pageId] ? [...currentSections[pageId], newSection] : [newSection]
      }
      return newSections
    })
  }

  // Deletes the section at a given index among the sections of the current page
  function handleSectionDelete(sectionIndex) {
    setSections((currentSections) => {
      // Ensure that the current page has a section at the specified index
      if (currentSections[pageId].length >= sectionIndex + 1) {
        // Remove the section at the given index
        const pageIdSections = currentSections[pageId]
        pageIdSections.splice(sectionIndex, 1)

        // Update the list of sections of the current page
        const newSections = {
          ...currentSections,
          [pageId]: pageIdSections
        }

        return newSections
      }

      return currentSections
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styles                                   */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper

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
    resetEditState()
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
    const savedPage = { content: { sections: sections[pageId] } }
    // console.log(savedPage)
    await patchPage(pageId, savedPage)
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

    if (pageId === toBeDeletedPageId) {
      setPageId(null)
    }

    // Set the pages state as the new list of page objects, which does
    // not have the to-be-deleted page
    setPages(newPages)

    // Remove the to-be-deleted page from the sections object, which was used
    // to record the changes of the sections within the page, but now that it is
    // being deleted, we shouldn't need to track it anymore
    setSections((s) => {
      const newSections = s
      delete newSections[toBeDeletedPageId]
      return newSections
    })

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
      {/* Pages and adding/removing pages part of the editing portfolio*/ }
      <EditPortfolioPagesGrouped 
        handlePortfolioEvent ={handlePortfolioEvent}
        handlePageSelect = {handlePageSelect}
        portfolio={portfolio}
        pages={pages}
        pageId={ pageId}
        handlePageEvent ={handlePageEvent}
        />
    
      {/*
       * PAGE CONTENT (as in, the sections)
       */}
      <EditPortfolioSectionsGrouped
      pageId ={pageId}
      handleSectionAdd={handleSectionAdd}
      sections={sections}
      handleSaveSections={handleSaveSections}
      handleSectionDelete={handleSectionDelete}
      />
      {dialog}
    </Grid>
  )
}
