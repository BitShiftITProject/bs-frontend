import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { useIntl } from 'react-intl'

import { GetSectionJSX, sectionIdsByCategory } from './SectionsMap'
import SectionContainer from './SectionEdit/SectionContainer'
import SectionTemplate from './SectionAdd/SectionTemplate'

export default function SectionsList({ sections, editing, handleSectionAdd, handleSectionDelete }) {
  const intl = useIntl()

  const sectionList =
    /* -------------------------------------------------------------------------- */
    /*               ACTUAL SECTIONS (Has content from Page object)               */
    /* -------------------------------------------------------------------------- */

    sections ? (
      /* ---------------------------- Editable Sections --------------------------- */

      handleSectionDelete ? (
        <div>
          {sections.map(
            (section, idx) => (
              <SectionContainer
                key={idx}
                sectionId={section.id}
                index={idx}
                handleSectionDelete={handleSectionDelete}
              >
                {GetSectionJSX(section, editing, idx)}
              </SectionContainer>
          ))}
        </div>
      ) : (
        /* ------------------------ Public Portfolio Sections ----------------------- */

        <div>
          {sections.map((section, idx) => (
            <div key={idx}>{GetSectionJSX(section, editing, idx)}</div>
          ))}
        </div>
      )
    ) : (
      /* -------------------------------------------------------------------------- */
      /*                   SECTION TEMPLATES IN ADD SECTIONS MENU                   */
      /* -------------------------------------------------------------------------- */

      <div>
        {Object.keys(sectionIdsByCategory).map((category) => (
          <div key={category}>
            <Grid container style={{ padding: 8 }}>
              <Typography variant='overline'>{intl.formatMessage({ id: category })}</Typography>
            </Grid>
            {sectionIdsByCategory[category].map((id, idx) => {
              const exampleSection = { id }
              const editing = true
              return (
                <SectionTemplate key={id} sectionId={id} handleSectionAdd={handleSectionAdd}>
                  {GetSectionJSX(exampleSection, editing, idx)}
                </SectionTemplate>
              )
            })}
          </div>
        ))}
      </div>
    )

  return sectionList
}
