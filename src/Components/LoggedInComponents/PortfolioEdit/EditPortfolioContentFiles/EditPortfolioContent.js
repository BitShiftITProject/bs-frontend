import React, { useCallback, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'

import CustomDialog from '../../../CommonComponents/CustomDialog'
import EditPortfolioPagesGrouped from './EditPortfolioPagesGrouped'
import EditPortfolioSectionsGrouped from './EditPortfolioSectionsGrouped'

import DialogType from './DialogType'
import { useSnackbar } from 'notistack'
import { useIntl } from 'react-intl'
import useEditPortfolio from '../../../../Hooks/useEditPortfolio'
import useAddPage from '../../../../Hooks/useAddPage'
import useEditPage from '../../../../Hooks/useEditPage'
import useDeletePage from '../../../../Hooks/useDeletePage'
import Loading from '../../../CommonComponents/Loading'
import usePages from '../../../../Hooks/usePages'
import { useStore } from '../../../../Hooks/Store'
import shallow from 'zustand/shallow'
import usePortfolio from '../../../../Hooks/usePortfolio'

const portfolioIdSelector = (state) => state.portfolioId
const pageSelector = ({ pageId, setPageId }) => [pageId, setPageId]
const loadingSelector = ({ loading, setLoading }) => [loading, setLoading]

function EditPortfolioContent() {
  /* -------------------------------------------------------------------------- */
  /*                                  Snackbars                                 */
  /* -------------------------------------------------------------------------- */

  const { enqueueSnackbar } = useSnackbar()

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
  const { data: portfolio } = usePortfolio(portfolioId)
  const { data: pages, status: pagesStatus } = usePages(portfolioId)
  const [loading, setLoading] = useStore(useCallback(loadingSelector, []), shallow)

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [portfolioTitle, setPortfolioTitle] = useState('')
  const [portfolioDescription, setPortfolioDescription] = useState('')
  const [pageTitle, setPageTitle] = useState('')

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
  }, [setPageId, portfolioId])

  // This is run after the portfolio content editing page is unmounted
  useEffect(() => {
    // Reset the selected page ID and clear the sections whose changes we should keep
    // track of, since if we are unmounting then we don't need keep track of
    // anymore
    return () => {
      setPageId(null)
      // setSections([])
    }
  }, [setPageId])

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
        description: portfolioDescription
      }
    })

    setLoading(false)
    setOpen(false)
  }

  /* ------------------------------- Page Events ------------------------------ */

  // Updates the page index and page content to be those of the selected page
  function handlePageSelect(id) {
    setPageId(id)
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

    editPage({ pageId: pages[dialogContent.component].id, patchDetails: { title: pageTitle } })

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
      {portfolio && pages && (
        <Grid container direction='row' spacing={0}>
          {/* Pages and adding/removing pages part of the editing portfolio*/}
          <EditPortfolioPagesGrouped
            handlePortfolioEvent={handlePortfolioEvent}
            handlePageSelect={handlePageSelect}
            handlePageEvent={handlePageEvent}
          />

          {/*
           * PAGE CONTENT (as in, the sections)
           */}
          <EditPortfolioSectionsGrouped />
          {dialog}
        </Grid>
      )}
    </div>
  )
}

export default EditPortfolioContent
