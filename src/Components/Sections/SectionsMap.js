import React from 'react'
import { Grid } from '@material-ui/core'
import { Paragraph, Title, Subtitle } from './SectionElements'

// function MapSection(section, editing) {
//   let sectionId = section.id
//   const isSection = section && section.data

// TODO: Look up Quill.js for Rich-text Editing and React-DnD for modular

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

export const sectionIdsByCategory = {
  headings: ['headingTitle', 'headingSubtitle'],
  textAndMultimedia: ['singleText', 'doubleText']
}

export const sectionElementsBySectionId = {
  headingTitle: [['title', Title]],
  headingSubtitle: [['subtitle', Subtitle]],
  singleText: [['paragraph', Paragraph]],
  doubleText: [
    ['paragraph1', Paragraph, 6],
    ['paragraph2', Paragraph, 6]
  ]
}

export function GetNewSectionObject(sectionId) {
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

export function GetSectionJSX(section, editing) {
  // Might do extra stuff here later on, otherwise can just export MapSection
  return MapSectionToJSX(section, editing)
}

export function MapSectionToJSX(section, editing) {
  const sectionElements = sectionElementsBySectionId[section.id]
  const isSection = section && section.data

  return (
    <Grid container direction='row' spacing={2} justify='center' alignItems='center'>
      {sectionElements.map((element) => {
        const sectionElementName = element[0]
        const SectionElementComponent = element[1]
        const sectionElementGridSize = element.length > 2 ? element[2] : 12

        return (
          <Grid key={sectionElementName} item xs={sectionElementGridSize}>
            <SectionElementComponent
              name={sectionElementName}
              editing={editing}
              data={isSection ? section.data[sectionElementName] : null}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
