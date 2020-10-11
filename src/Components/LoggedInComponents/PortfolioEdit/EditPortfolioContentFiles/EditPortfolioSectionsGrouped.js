import React from 'react'
import { useIntl } from 'react-intl'

import {
    Grid,
    Paper,
    Fab
  } from '@material-ui/core'


import { loggedInStyles, CursorTypography } from '../../../../Styles/loggedInStyles'
import SectionsList from '../../../Sections/SectionsList'
import SectionsButton from '../../../Sections/SectionAdd/SectionsButton'
/* Pages and adding/removing pages part of the editing portfolio*/
export default function EditPortfolioSectionsGrouped({pageId,handleSectionAdd, sections, handleSaveSections,handleSectionDelete }) {
    const classes = loggedInStyles()    
    const fixedHeightPaper = classes.fixedHeightPaper

    // Locale
    const intl = useIntl()

  return (
    //  LIST MENU
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

          {pageId && sections[pageId] && (
            <Grid
              item
              xs={10}
              style={{ minWidth: '100%', overflow: 'scroll' }}
              container
              direction='column'
              justify='space-between'
            >
              <SectionsList
                sections={sections[pageId]}
                editing
                handleSectionDelete={handleSectionDelete}
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
            <Grid item>
              <Fab
                // disabled
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
  )
}
