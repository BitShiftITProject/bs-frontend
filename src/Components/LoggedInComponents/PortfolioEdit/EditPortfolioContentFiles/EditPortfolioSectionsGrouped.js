import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { Grid, Paper, Fab, CircularProgress, Dialog } from '@material-ui/core'

import { loggedInStyles, CursorTypography } from '../../../../Styles/loggedInStyles'
import SectionsList from '../../../Sections/SectionsList'
import SectionsButton from '../../../Sections/SectionAdd/SectionsButton'
import { useStore } from '../../../../Hooks/Store'
import EditSectionPage from '../../../Sections/SectionEdit/EditSectionPage'
import useEditPage from '../../../../Hooks/useEditPage'
import usePage from '../../../../Hooks/usePage'
import shallow from 'zustand/shallow'
import { useSnackbar } from 'notistack'

const pageIdSelector = (state) => state.pageId
const currentElementSelector = (state) => state.currentElement
const finishEditingSelector = (state) => state.finishEditingElement
const loadingSelector = ({ loading, setLoading }) => [loading, setLoading]

/* Pages and adding/removing pages part of the editing portfolio*/
function EditPortfolioSectionsGrouped() {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                           Edit Mode for a Section                          */
  /* -------------------------------------------------------------------------- */

  const pageId = useStore(pageIdSelector)
  const { data: currentPage } = usePage(pageId)
  // console.log('Current page in sections grouped:', currentPage)
  const [loading, setLoading] = useStore(useCallback(loadingSelector, []), shallow)
  const { enqueueSnackbar } = useSnackbar()

  const currentElement = useStore(currentElementSelector)

  const handleSaveSections = useCallback(() => {
    setLoading(true)

    // // Patch the page with the current sections on the screen
    // editPage({ pageId, patchDetails: savedPage })

    setTimeout(() => {
      const pageTitle = currentPage.title

      // Show a notification that all sections have been saved
      enqueueSnackbar(intl.formatMessage({ id: 'savedAllSections' }, { pageTitle }), {
        variant: 'success'
      })

      setLoading(false)
    }, 1000)
  }, [currentPage, enqueueSnackbar, intl, setLoading])

  /* -------------------------------------------------------------------------- */
  /*                               Action Buttons                               */
  /* -------------------------------------------------------------------------- */

  const sectionButtons = (
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
      <Grid item className={classes.fabProgressContainer}>
        <Fab
          disabled={loading}
          style={!pageId ? { visibility: 'hidden' } : {}}
          color='secondary'
          variant='extended'
          onClick={handleSaveSections}
        >
          <CursorTypography variant='button'>
            {intl.formatMessage({ id: 'saveSections' })}
          </CursorTypography>
        </Fab>
        {loading && <CircularProgress size={24} className={classes.fabProgress} />}
      </Grid>

      <Grid item></Grid>
      <SectionsButton />
    </Grid>
  )

  /* -------------------------------------------------------------------------- */
  /*                        Edit Section Elements Dialog                        */
  /* -------------------------------------------------------------------------- */

  const [editPage] = useEditPage()
  const finishEditingElement = useStore(useCallback(finishEditingSelector, []))

  const handleFinishEditingElement = useCallback(() => {
    finishEditingElement(currentPage, editPage)
    handleSaveSections()
  }, [currentPage, editPage, finishEditingElement, handleSaveSections])

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper className={fixedHeightPaper}>
        {/*
         * PAGE SECTIONS
         */}

        {!pageId ? (
          <Grid
            item
            xs={12}
            style={{ minWidth: '100%', height: '100%' }}
            container
            justify='center'
            alignItems='center'
          >
            <CursorTypography variant='subtitle2'>
              Select a page to start editing your portfolio
            </CursorTypography>
          </Grid>
        ) : (
          <div style={{ minHeight: '100%' }}>
            {/* If not currently editing an element from any section, show the sections of the current page */}

            {/* If there are sections in the current page, show the sections list */}
            {/* If there are NO sections in the current page, show the instruction on how to add a section */}
            {currentPage && currentPage.content && currentPage.content.sections ? (
              <Grid
                item
                xs={10}
                style={{ minWidth: '100%', overflowY: 'scroll' }}
                container
                direction='column'
                justify='space-between'
              >
                <SectionsList sections={currentPage.content.sections} />
              </Grid>
            ) : (
              <Grid
                item
                xs={10}
                style={{ minWidth: '100%', height: '100%' }}
                container
                direction='column'
                justify='center'
                alignItems='center'
              >
                <CursorTypography variant='subtitle2'>
                  To add a section, click on Add Section and choose a template
                </CursorTypography>
              </Grid>
            )}
            {sectionButtons}
          </div>
        )}
        <Dialog open={currentElement !== null} onClose={handleFinishEditingElement}>
          <EditSectionPage handleFinishEditingElement={handleFinishEditingElement} />
        </Dialog>
      </Paper>
    </Grid>
  )
}

export default EditPortfolioSectionsGrouped
