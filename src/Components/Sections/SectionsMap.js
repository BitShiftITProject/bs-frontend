import React from 'react'
import { Grid } from '@material-ui/core'
import { Paragraph, Title, Subtitle } from './SectionElements'

// Stores the section IDs by the category of sections
export const sectionIdsByCategory = {
  headings: ['headingTitle', 'headingSubtitle'],
  textAndMultimedia: ['singleText', 'doubleText']
}

// A section ID corresponds to a given arrangement of section elements.
// This stores the section elements formatted as:
//   [{section element name}, {section element component}, {optional grid size}]
// in an array consisting of all the section elements of a section ID.
export const sectionElementsBySectionId = {
  headingTitle: [['title', Title]],
  headingSubtitle: [['subtitle', Subtitle]],
  singleText: [['paragraph', Paragraph]],
  doubleText: [
    ['paragraph1', Paragraph, 6],
    ['paragraph2', Paragraph, 6]
  ],
}

// Given the section ID, returns a new section object with the correct
// section elements each initialised with empty strings
export function GetNewSectionObject(sectionId) {
  // The index of the section element name, stored in sectionElementsBySectionId
  const name = 0

  // Initialise the section elements within the section data property with
  // empty strings
  const sectionData = sectionElementsBySectionId[sectionId]
    .map((element) => {
      return { [element[name]]: '' }
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {})

  // Return a new section object with the correct format
  return { id: sectionId, data: sectionData }
}

// Receives section whose data field might be:
// - NON-NULL in the case of mapping sections in public portfolios
//   (editing is false) or editable portfolios (editing is true)
//   and index is not ignored, or
// - NULL to return a section template from the section's ID
//   field (editing is true and index is ignored)
export function GetSectionJSX(section, editing, index) {
  // Might do extra stuff here later on, otherwise can just export MapSection
  return MapSectionToJSX(section, editing, index)
}

// Structures a section via Material-UI's Grid, and:
// - Renders the correct components of the data fields within the section
//   by using sectionElementsBySectionId (if it is an actual section), or
// - Renders a section template if it isn't an actual section
export function MapSectionToJSX(section, editing, index) {
  const sectionElements = sectionElementsBySectionId[section.id]
  const isActualSection = section && section.data

  return (
    <Grid container direction='row' spacing={2} justify='center' alignItems='flex-start'>
      {sectionElements.map((element) => {
        const sectionElementName = element[0]
        const SectionElementComponent = element[1]
        const sectionElementGridSize = element.length > 2 ? element[2] : 12

        return (
          <Grid key={sectionElementName} item xs={sectionElementGridSize}>
            <SectionElementComponent
              name={sectionElementName}
              editing={editing}
              data={isActualSection ? section.data[sectionElementName] : null}
              index={index}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

/* -------------------------------------------------------------------------- */
/*                     Previous Method of Section Mapping                     */
/* -------------------------------------------------------------------------- */

// function MapSection(section, editing) {
//   let sectionId = section.id
//   const isSection = section && section.data

// /* -------------------------------------------------------------------------- */
// /*                                  Sections                                  */
// /* -------------------------------------------------------------------------- */
// Switch statement on the sectionId (no need to break at the end of a case
// since return ends the switch)

// Each section is enclosed in a Grid container element whose full width is 12
// units of width. Its child elements, each enclosed inside a Grid item
// element, share the 12 units among each other.

// E.g. Within the same Grid container, two Grid items within can share the 12
// units as one Grid item can have an attribute of xs={8}, while the other
// has the attribute xs={4}

//   switch (sectionId) {
//     /* -------------------------------- Headings -------------------------------- */

//     case 'headingTitle':
//       return (
//         <Grid container alignItems='center'>
//           <Title editing={editing} name='title' data={isSection ? section.data.title : null} />
//         </Grid>
//       )

//     case 'headingSubtitle':
//       return (
//         <Grid container alignItems='center'>
//           <Subtitle
//             editing={editing}
//             name='subtitle'
//             data={isSection ? section.data.subtitle : null}
//           />
//         </Grid>
//       )

//     /* --------------------------- Text and Multimedia -------------------------- */

//     case 'singleText':
//       return (
//         <Grid container>
//           <Paragraph
//             editing={editing}
//             name='paragraph'
//             data={isSection ? section.data.paragraph : null}
//           />
//         </Grid>
//       )

//     case 'doubleText':
//       return (
//         <Grid container direction='row' spacing={2} justify='center' alignItems='center'>
//           <Grid item xs={6}>
//             <Paragraph
//               editing={editing}
//               name='paragraph1'
//               data={isSection ? section.data.paragraph1 : null}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <Paragraph
//               editing={editing}
//               name='paragraph2'
//               data={isSection ? section.data.paragraph2 : null}
//             />
//           </Grid>
//         </Grid>
//       )

//     /* --------------------- Blank for Unmapped Section IDs --------------------- */

//     default:
//       return <Grid container>Not yet mapped: {section.data}</Grid>
//   }
// }
