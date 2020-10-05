import React from 'react'
import { Grid } from '@material-ui/core'
import { Paragraph, Title, Subtitle } from './SectionElements'

function MapSection(section, editing) {
  let sectionId = section.id

  // TODO: Look up Quill.js for Rich-text Editing and React-DnD for modular

  /* -------------------------------------------------------------------------- */
  /*                                  Sections                                  */
  /* -------------------------------------------------------------------------- */
  // Switch statement on the sectionId (no need to break at the end of a case
  // since return ends the switch)

  // Each section is enclosed in a Grid container element whose full width is 12
  // units of width. Its child elements, each enclosed inside a Grid item
  // element, share the 12 units among each other.

  // E.g. Within the same Grid container, two Grid items within can share the 12
  // units as one Grid item can have an attribute of xs={8}, while the other
  // has the attribute xs={4}

  switch (sectionId) {
    /* -------------------------------- Headings -------------------------------- */

    case 'headingTitle':
      return (
        <Grid container alignItems='center'>
          <Title
            editing={editing}
            content={section && section.content ? section.content.title : null}
          />
        </Grid>
      )

    case 'headingSubtitle':
      return (
        <Grid container alignItems='center'>
          <Subtitle
            editing={editing}
            content={section && section.content ? section.content.subtitle : null}
          />
        </Grid>
      )

    /* --------------------------- Text and Multimedia -------------------------- */

    case 'singleText':
      return (
        <Grid container>
          <Paragraph
            editing={editing}
            content={section && section.content ? section.content.paragraph : null}
          />
        </Grid>
      )

    case 'doubleText':
      return (
        <Grid container direction='row' spacing={2} justify='center' alignItems='center'>
          <Grid item xs={6}>
            <Paragraph
              editing={editing}
              content={section && section.content ? section.content.paragraph1 : null}
            />
          </Grid>
          <Grid item xs={6}>
            <Paragraph
              editing={editing}
              content={section && section.content ? section.content.paragraph2 : null}
            />
          </Grid>
        </Grid>
      )

    // TODO: Add more section templates

    /* --------------------- Blank for Unmapped Section IDs --------------------- */

    default:
      // Return blank section
      return <Grid container>Not yet mapped: {section.content}</Grid>
  }
}

export const sectionIdsByCategory = {
  headings: ['headingTitle', 'headingSubtitle'],
  textAndMultimedia: ['singleText', 'doubleText']
}

export default function GetSectionJSX(section, editing) {
  // Might do extra stuff here later on, otherwise can just export MapSection
  return MapSection(section, editing)
}
