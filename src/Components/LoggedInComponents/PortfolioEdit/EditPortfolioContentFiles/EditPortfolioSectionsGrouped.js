import React from 'react'
import { useIntl } from 'react-intl'

import { Grid, Paper, Fab, CircularProgress, Dialog } from '@material-ui/core'

import { loggedInStyles, CursorTypography } from '../../../../Styles/loggedInStyles'
import SectionsList from '../../../Sections/SectionsList'
import SectionsButton from '../../../Sections/SectionAdd/SectionsButton'
import { useStore } from '../../../../Hooks/Store'
import EditSectionPage from '../../../Sections/SectionEdit/EditSectionPage'
import useEditPage from '../../../../Hooks/useEditPage'

const pageIdSelector = (state) => state.pageId
const currentElementSelector = (state) => state.currentElement
const finishEditingSelector = (state) => state.finishEditingSelector

/* Pages and adding/removing pages part of the editing portfolio*/
export default function EditPortfolioSectionsGrouped({
  loading,
  pages,
  handleSectionAdd,
  handleSaveSections,
  handleSectionDelete
}) {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                           Edit Mode for a Section                          */
  /* -------------------------------------------------------------------------- */

  const pageId = useStore(pageIdSelector)
  const currentPage = pages.find((page) => page.id === pageId)
  const currentElement = useStore(currentElementSelector)

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

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
      <SectionsButton pageId={pageId} handleSectionAdd={handleSectionAdd} />
    </Grid>
  )

  /* -------------------------------------------------------------------------- */
  /*                        Edit Section Elements Dialog                        */
  /* -------------------------------------------------------------------------- */

  const [editPage] = useEditPage()
  const finishEditingElement = useStore(finishEditingSelector)

  const handleFinishEditingElement = () => {
    finishEditingElement(currentPage, editPage)
  }

  return (
    <Grid item xs={12} md={8} lg={9} id='page-content'>
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
            {currentPage.content.sections ? (
              <Grid
                item
                xs={10}
                style={{ minWidth: '100%', overflowY: 'scroll' }}
                container
                direction='column'
                justify='space-between'
              >
                <SectionsList
                  sections={currentPage.content.sections}
                  handleSectionDelete={handleSectionDelete}
                />
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
            <Dialog open={!!currentElement} onClose={handleFinishEditingElement}>
              <EditSectionPage handleFinishEditingElement={handleFinishEditingElement} />
            </Dialog>
          </div>
        )}
      </Paper>
    </Grid>
  )
}
