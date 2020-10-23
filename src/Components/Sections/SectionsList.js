import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { useIntl } from 'react-intl'

import { GetElementJSX } from './SectionsMap'
import SectionContainer from './SectionEdit/SectionContainer'

export default function SectionsList({ sections, editing, startSectionEdit, handleSectionDelete }) {
  const intl = useIntl()

  const sectionList =
    /* -------------------------------------------------------------------------- */
    /*               ACTUAL SECTIONS (Has content from Page object)               */
    /* -------------------------------------------------------------------------- */

    /* ---------------------------- Editable Sections --------------------------- */

    handleSectionDelete ? (
      <div>
        {sections.map((section, sectionIndex) => {
          return (
            <SectionContainer
              key={sectionIndex}
              sectionIndex={sectionIndex}
              startSectionEdit={startSectionEdit}
              handleSectionDelete={handleSectionDelete}
            >
              <Grid container direction='row' spacing={2}>
                {section.map((element, elementIndex) => (
                  <Grid item key={elementIndex} xs={12 / section.length}>
                    {GetElementJSX(element, editing, sectionIndex, elementIndex)}
                  </Grid>
                ))}
              </Grid>
            </SectionContainer>
          )
        })}
      </div>
    ) : (
      /* ------------------------ Public Portfolio Sections ----------------------- */

      <div>
        {sections.map((section, sectionIndex) => {
          return (
            <div key={sectionIndex}>
              <Grid container direction='row' spacing={2}>
                {section.map((element, elementIndex) => (
                  <Grid item key={elementIndex} xs={12 / section.length}>
                    {GetElementJSX(element, editing, sectionIndex, elementIndex)}
                  </Grid>
                ))}
              </Grid>
            </div>
          )
        })}
      </div>
    )

  return sectionList
}
