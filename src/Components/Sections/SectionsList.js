import React from 'react'
import { Typography, Container, Grid } from '@material-ui/core'
import { useIntl } from 'react-intl'

import GetSectionJSX, { sectionIdsByCategory } from './SectionsMap'
import SectionTemplate from './SectionAdd/SectionTemplate'

export default function SectionsList({ sections, editing, handleSectionClick }) {
  const intl = useIntl()
  const sectionList = sections ? (
    /* -------------------------------------------------------------------------- */
    /*               ACTUAL SECTIONS (Has content from Page object)               */
    /* -------------------------------------------------------------------------- */

    <div>
      {sections.map((section, idx) => (
        <Container key={idx}>{GetSectionJSX(section, editing)}</Container>
      ))}
    </div>
  ) : (
    /* -------------------------------------------------------------------------- */
    /*                              SECTION TEMPLATES                             */
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
              <SectionTemplate key={id} sectionId={id} handleSectionClick={handleSectionClick}>
                {GetSectionJSX(exampleSection, editing)}
              </SectionTemplate>
            )
          })}
        </div>
      ))}
    </div>
  )

  return sectionList
}
