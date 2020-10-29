import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'

import CustomDialog from '../../../CommonComponents/CustomDialog'
import EditPortfolioPagesGrouped from './EditPortfolioPagesGrouped'
import EditPortfolioSectionsGrouped from './EditPortfolioSectionsGrouped'

import { PortfolioContext } from '../../../Contexts/PortfolioContext'
import DialogType from './DialogType'
import { useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'
import useEditPortfolio from '../../../../Hooks/useEditPortfolio'
import useAddPage from '../../../../Hooks/useAddPage'
import useEditPage from '../../../../Hooks/useEditPage'
import useDeletePage from '../../../../Hooks/useDeletePage'
import Loading from '../../../CommonComponents/Loading'
import { useQueryCache } from 'react-query'
import usePages from '../../../../Hooks/usePages'
import { useStore } from '../../../../Hooks/Store'
import shallow from 'zustand/shallow'

const portfolioIdSelector = (state) => state.portfolioId
const pageSelector = ({ pageId, setPageId }) => [pageId, setPageId]

export default function EditPortfolioContent() {
  /* -------------------------------------------------------------------------- */
  /*                                  Snackbars                                 */
  /* -------------------------------------------------------------------------- */

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                         Fetching Current Portfolio                         */
  /* -------------------------------------------------------------------------- */

  // Fetches the portfolio using the portfolioId item set in the sessionStorage.
  // The portfolioId is set in the sessionStorage when:
  // - A user clicks on the Add Portfolio button in AddPortfolioPage
  // - A user clicks on the Edit button in PortfolioCard

  const portfolioId = useStore(portfolioIdSelector)
  const [pageId, setPageId] = useStore(useCallback(pageSelector, []), shallow)
  const portfolio = useQueryCache().getQueryData(['portfolios', portfolioId])
  const { data: pages, status: pagesStatus } = usePages(portfolioId)

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [portfolioTitle, setPortfolioTitle] = useState('')
  const [portfolioDescription, setPortfolioDescription] = useState('')
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
  const { resetEditState, sections, setSections } = useContext(PortfolioContext)

  /* -------------------------------------------------------------------------- */
  /*                              React Query Hooks                             */
  /* -------------------------------------------------------------------------- */

  const [editPortfolio] = useEditPortfolio()
  const [addPage] = useAddPage()
  const [editPage] = useEditPage()
  const [deletePage] = useDeletePage()

  /* -------------------------------------------------------------------------- */
  /*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */

  // This is run when the portfolio content editing page is first mounted
  useEffect(() => {
    // Reset the selected page ID, so at first, no page is selected

    setPageId(null)

    if (!portfolioId) {
      window.location.href = '/portfolios'
    }
  }, [setPageId])

  // This is run after the portfolio content editing page is unmounted
  useEffect(() => {
    // Reset the selected page ID and clear the sections whose changes we should keep
    // track of, since if we are unmounting then we don't need keep track of
    // anymore
    return () => {
      setPageId(null)
      // setSections([])
    }
  }, [setPageId, setSections])

  // This is run when pages is first mounted and every time it is updated,
  // such as when a page is added or deleted or when the changes
  // to the sections within it are saved
  // useEffect(() => {
  //   if (pagesStatus === 'success') {
  //     setSections((currentSections) => {
  //       const newSections = pages
  //         .map((page) => {
  //           if (Object.keys(currentSections).includes(page.id)) {
  //             return {}
  //           }
  //           return { [page.id]: page.content.sections }
  //         })
  //         .reduce((prev, curr) => ({ ...prev, ...curr }), currentSections)
  //       // console.log(newSections)
  //       return newSections
  //     })
  //   }
  // }, [pages, pagesStatus, setSections])

  /* -------------------------------------------------------------------------- */
  /*                                Section Handlers                            */
  /* -------------------------------------------------------------------------- */

  // Adds a new correctly-formatted section object into the current page's list
  // of sections (Note: Does not save to the backend)
  function handleSectionAdd(newSection) {
    const currentPage = pages.filter((page) => page.id === pageId)[0]
    const pageTitle = currentPage.title

    const currentSections = currentPage.content.sections
    const patchDetails = {
      content: { sections: currentSections ? [...currentSections, newSection] : [newSection] }
    }

    editPage({ pageId: currentPage.id, patchDetails })

    // Shows a notification that the section has been added
    enqueueSnackbar(intl.formatMessage({ id: 'addedSectionToPage' }, { pageTitle }), {
      variant: 'info'
    })
  }

  // Saves all the sections of the currently-selected page
  async function handleSaveSections(e) {
    e.preventDefault()
    // const savedPage = { content: { sections: sections[pageId] } }

    // Start showing loading animation
    setLoading(true)

    // // Patch the page with the current sections on the screen
    // editPage({ pageId, patchDetails: savedPage })

    setTimeout(() => {
      const pageTitle = pages.filter((page) => page.id === pageId)[0].title

      // Show a notification that all sections have been saved
      enqueueSnackbar(intl.formatMessage({ id: 'savedAllSections' }, { pageTitle }), {
        variant: 'success'
      })

      setLoading(false)
    }, 1000)
  }

  // sets the SPECIFIC PAGES sections
  const handleSetPageSection = (newUnsavedSection) => {
    setSections((currentSections) => {
      // If this is the first section of the page, just set it as [newSection],
      // otherwise just add newSection to the end of the current list of sections
      const newSections = {
        ...currentSections
      }
      newSections[pageId] = newUnsavedSection
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

        // Show a notification that the section has been deleted from the page
        const key = enqueueSnackbar(
          intl.formatMessage({ id: 'deletedSectionFromPage' }, { pageTitle }),
          {
            variant: 'error',
            persist: true
          }
        )

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
    portfolioDescription,
    setPortfolioDescription,
    handleClose,
    handlePageAdd,
    pageTitle,
    setPageTitle,
    handlePageTitleEdit,
    handlePageDelete,
    loading
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
    setPortfolioTitle(value.title)
    setPortfolioDescription(value.description)
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

    setLoading(true)

    editPortfolio({
      portfolioId: portfolio.id,
      patchDetails: {
        title: portfolioTitle,
        description: portfolio.description
      }
    })

    setLoading(false)
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
    setLoading(true)

    // Adds the new page to the Page DB, and saving the actual details of the
    // newly-added page
    addPage({
      portfolioId: portfolio.id,
      postDetails: {
        title: pageTitle,
        content: {
          sections: []
        }
      }
    }).then((response) =>
      response.json().then((newPage) => {
        editPortfolio({
          portfolioId: portfolio.id,
          patchDetails: { pageOrder: [...portfolio.pageOrder, newPage.id] }
        })
      })
    )

    setLoading(false)
    setOpen(false)
  }
  /* -------------------------------------------------------------------------- */

  // Edit the PAGE TITLE of the Page in the DB
  async function handlePageTitleEdit(e) {
    e.preventDefault()
    setLoading(true)

    editPage({ pageId: pages[dialogContent.component].id, title: pageTitle })

    setLoading(false)
    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */

  // Removes a Page (and any reference to it) from the DB
  async function handlePageDelete(e) {
    e.preventDefault()
    setLoading(true)
    const toBeDeletedPageId = pages[dialogContent.component].id
    const toBeDeletedPageTitle = pages[dialogContent.component].title

    if (pageId === toBeDeletedPageId) {
      setPageId(null)
    }

    // Removes to-be-deleted page from sections object, which was used
    // to record changes of sections in the page, but now that it is
    // being deleted, we shouldn't need to track it anymore
    setSections((s) => {
      const newSections = s
      delete newSections[toBeDeletedPageId]
      return newSections
    })

    // Delete the portfolio from the portfolios DB
    deletePage({ pageId: toBeDeletedPageId }).then(() => {
      // Show the notification after deleting the page
      enqueueSnackbar(
        intl.formatMessage({ id: 'deletedPage' }, { pageTitle: toBeDeletedPageTitle }),
        {
          variant: 'error',
          autoHideDuration: 3000
        }
      )
    })

    editPortfolio({
      portfolioId: portfolio.id,
      patchDetails: {
        pageOrder: portfolio.pageOrder.filter((pageId) => pageId !== toBeDeletedPageId)
      }
    })
    setLoading(false)
    setOpen(false)
  }

  const dialog = (
    <CustomDialog open={open} setOpen={setOpen} content={dialogType[dialogContent.type]} />
  )

  /* -------------------------------------------------------------------------- */
  /*                                Rendered Page                               */
  /* -------------------------------------------------------------------------- */

  if (pagesStatus === 'loading') {
    return <Loading vertical />
  }

  return (
    <div>
      {/* {console.log(portfolio, pages)} */}
      {portfolio && pages && (
        <Grid container direction='row' spacing={0}>
          {/* Pages and adding/removing pages part of the editing portfolio*/}
          <EditPortfolioPagesGrouped
            handlePortfolioEvent={handlePortfolioEvent}
            handlePageSelect={handlePageSelect}
            portfolio={portfolio}
            pages={pages}
            pageId={pageId}
            handlePageEvent={handlePageEvent}
          />

          {/*
           * PAGE CONTENT (as in, the sections)
           */}
          <EditPortfolioSectionsGrouped
            loading={loading}
            pages={pages}
            handleSectionAdd={handleSectionAdd}
            handleSaveSections={handleSaveSections}
            handleSectionDelete={handleSectionDelete}
          />
          {dialog}
        </Grid>
      )}
    </div>
  )
}
