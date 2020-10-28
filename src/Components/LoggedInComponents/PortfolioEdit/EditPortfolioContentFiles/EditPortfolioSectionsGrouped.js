import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { Grid, Paper, Fab, CircularProgress } from '@material-ui/core'

import { loggedInStyles, CursorTypography } from '../../../../Styles/loggedInStyles'
import SectionsList from '../../../Sections/SectionsList'
import SectionsButton from '../../../Sections/SectionAdd/SectionsButton'
import SectionEditDialog from '../../../Sections/SectionEdit/SectionEditDialog'

/* Pages and adding/removing pages part of the editing portfolio*/
export default function EditPortfolioSectionsGrouped({
  pageId,
  handleSectionAdd,
  sections,
  handleSetPageSection,
  loading,
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

  const [editMode, setEditMode] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(null)
  const [elementIndex, setElementIndex] = useState(0)

  const startSectionEdit = (index) => {
    // console.log('Edit section', index)
    setSectionIndex(index)
    setElementIndex(0)
    setEditMode(true)
  }

  const finishSectionEdit = () => {
    setSectionIndex(null)
    setEditMode(false)
  }

  const handleChange = (event, newValue) => {
    setElementIndex(newValue)
  }

  const dialog = (
    <SectionEditDialog
      sectionIndex={sectionIndex}
      editMode={editMode}
      finishSectionEdit={finishSectionEdit}
      elementIndex={elementIndex}
      sections={sections}
      pageId={pageId}
      handleChange={handleChange}
    />
  )

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  return (
    <Grid item xs={12} md={8} lg={9} id='page-content'>
      <Paper className={fixedHeightPaper}>
        {/*
         * PAGE SECTIONS
         */}

        {!pageId && (
          <Grid
            item
            xs={10}
            style={{ minWidth: '100%', height: '100%' }}
            container
            justify='center'
            alignItems='center'
          >
            <CursorTypography variant='subtitle2'>
              Select a page to start editing your portfolio
            </CursorTypography>
          </Grid>
        )}

        {pageId && sections[pageId].length === 0 && (
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
              To add a section, click on Add Sections and choose a template
            </CursorTypography>
          </Grid>
        )}

        {pageId && sections[pageId].length > 0 && (
          <Grid
            item
            xs={10}
            style={{ minWidth: '100%', overflowY: 'scroll' }}
            container
            direction='column'
            justify='space-between'
          >
            <SectionsList
              sections={sections[pageId]}
              startSectionEdit={startSectionEdit}
              handleSectionDelete={handleSectionDelete}
              handleSetPageSection={handleSetPageSection}
            />
          </Grid>
        )}

        {/* SAVE SECTIONS BUTTON */}
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

          {/* ADD SECTION BUTTON */}
          {/* When a section is clicked, it adds the section to the overall sections component */}
          <Grid item></Grid>
          <SectionsButton pageId={pageId} handleSectionAdd={handleSectionAdd} />
        </Grid>
        {sectionIndex !== null && dialog}
      </Paper>
    </Grid>
  )
}
