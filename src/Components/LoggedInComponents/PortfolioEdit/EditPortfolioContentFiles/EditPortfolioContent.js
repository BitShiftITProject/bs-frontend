import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'

import CustomDialog from '../../../CommonComponents/CustomDialog'
import EditPortfolioPagesGrouped from './EditPortfolioPagesGrouped'
import EditPortfolioSectionsGrouped from './EditPortfolioSectionsGrouped'
import {
  // page related imports
  patchPage,
  getPortfolio,
  patchPortfolio,
  postPageToPortfolio,
  deletePage
} from '../../../../Backend/Fetch'

import { PortfolioContext } from '../../../Contexts/PortfolioContext'
import DialogType from './DialogType'
import { useSnackbar } from 'notistack'

export default function EditPortfolioContent(props) {
  /* -------------------------------------------------------------------------- */
  /*                                  Snackbars                                 */
  /* -------------------------------------------------------------------------- */

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const { portfolio, setPortfolio, pages, setPages } = props
  const [portfolioTitle, setPortfolioTitle] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const [loading, setLoading] = useState(false)

  // PortfolioContext stores all details about:
  // - ID of currently-selected page (pageId) whose sections are shown,
  // - Indexes of currently-editable (non-disabled) sections (editableSections)
  // - Current portfolio's section objects by page ID (sections),
  //   stored like the following example:
  //
  //       {
  //         pageId1: [ {id: headingTitle, data: { title: "Hello" } } ],
  //         pageId2: [ {id} singleText, data: { paragraph: "My name is React" } } ],
  //       }
  //
  // EditPortfolioContent uses pageId and sections to render a selected page's sections,
  // and adds sections via SectionsButton, and edit or delete sections SectionsList.
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
      return newSections
    })
  }, [pages, setSections])

  /* -------------------------------------------------------------------------- */
  /*                                Section Handlers                            */
  /* -------------------------------------------------------------------------- */

  // Adds a new correctly-formatted section object into the current page's list
  // of sections (Note: Does not save to the backend)
  function handleSectionAdd(newSection, sectionName) {
    setSections((currentSections) => {
      // If this is the first section of the page, just set it as [newSection],
      // otherwise just add newSection to the end of the current list of sections
      const newSections = {
        ...currentSections,
        [pageId]: currentSections[pageId] ? [...currentSections[pageId], newSection] : [newSection]
      }
      return newSections
    })

    const pageTitle = pages.filter((page) => page.id === pageId)[0].title

    // Shows a notification that the section has been added
    enqueueSnackbar(`Added ${sectionName} to ${pageTitle}`, {
      variant: 'info',
      hideIconVariant: true
    })
  }

  // Saves all the sections of the currently-selected page
  async function handleSaveSections(e) {
    e.preventDefault()
    const savedPage = { content: { sections: sections[pageId] } }
    // console.log(savedPage)

    // Start showing loading animation
    setLoading(true)

    // Patch the page with the current sections on the screen
    await patchPage(pageId, savedPage)

    setTimeout(() => {
      const pageTitle = pages.filter((page) => page.id === pageId)[0].title

      // Show a notification that all sections have been saved
      enqueueSnackbar(`Saved all sections in ${pageTitle}`, {
        variant: 'success'
      })

      setLoading(false)
    }, 1000)
  }

  // Deletes the section at a given index among the sections of the current page
  function handleSectionDelete(sectionIndex, sectionName) {
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

        // const pageTitle = pages.filter((page) => page.id === pageId)[0].title

        // Show a notification that the section has been deleted from the page
        const key = enqueueSnackbar(`Deleted ${sectionName} from ${pageTitle}`, {
          variant: 'error',
          persist: true
        })

        setTimeout(() => {
          closeSnackbar(key)
        }, 2500)

        return newSections
      }

      return currentSections
    })
  }

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
  const dialogType = DialogType({
    handlePortfolioEdit,
    portfolioTitle,
    setPortfolioTitle,
    setPortfolio,
    portfolio,
    handleClose,
    handlePageAdd,
    pageTitle,
    setPageTitle,
    handlePageTitleEdit,
    handlePageDelete
  })

  /* -------------------------------------------------------------------------- */

  // The following two functions set the type of the event (which matches the key
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

    // console.log(portfolio, newPage)

    await patchPortfolio(portfolio.id, { pageOrder: [...portfolio.pageOrder, newPage.id] })
    // Sets the currently shown portfolio as the updated portfolio
    const updatedPortfolio = await getPortfolio(portfolio.id)
    setPortfolio(updatedPortfolio)
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

  // Removes a Page (and any reference to it) from the DB
  async function handlePageDelete(e) {
    e.preventDefault()
    const toBeDeletedPageId = pages[dialogContent.component].id
    const toBeDeletedPageTitle = pages[dialogContent.component].title

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

    // Removes to-be-deleted page from sections object, which was used
    // to record changes of sections in the page, but now that it is
    // being deleted, we shouldn't need to track it anymore
    setSections((s) => {
      const newSections = s
      delete newSections[toBeDeletedPageId]
      return newSections
    })

    // Delete the portfolio from the portfolios DB
    deletePage(toBeDeletedPageId).then(() => {
      // Show the notification after deleting the page
      enqueueSnackbar(`Deleted ${toBeDeletedPageTitle}`, {
        variant: 'error',
        autoHideDuration: 3000
      })
    })

    await patchPortfolio(portfolio.id, {
      pageOrder: portfolio.pageOrder.filter((pageId) => pageId !== toBeDeletedPageId)
    })
    // Sets the currently shown portfolio as the updated portfolio
    const updatedPortfolio = await getPortfolio(portfolio.id)
    setPortfolio(updatedPortfolio)

    setOpen(false)
  }

  const dialog = (
    <CustomDialog open={open} setOpen={setOpen} content={dialogType[dialogContent.type]} />
  )

  /* -------------------------------------------------------------------------- */
  /*                                Rendered Page                               */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid container direction='row' spacing={0}>
      {/* Pages and adding/removing pages part of the editing portfolio*/}
      <EditPortfolioPagesGrouped
        handlePortfolioEvent={handlePortfolioEvent}
        handlePageSelect={handlePageSelect}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        pages={pages}
        setPages={setPages}
        pageId={pageId}
        handlePageEvent={handlePageEvent}
      />

      {/*
       * PAGE CONTENT (as in, the sections)
       */}
      <EditPortfolioSectionsGrouped
        pageId={pageId}
        handleSectionAdd={handleSectionAdd}
        loading={loading}
        sections={sections}
        handleSaveSections={handleSaveSections}
        handleSectionDelete={handleSectionDelete}
      />
      {dialog}
    </Grid>
  )
}
