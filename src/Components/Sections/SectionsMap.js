import React from 'react'
import { YoutubeVideo, Image, Text, File } from './SectionElements'

export const sectionElements = {
  text: Text,
  image: Image,
  video: YoutubeVideo,
  file: File
}

// Receives section whose data field might be:
// - NON-NULL in the case of mapping sections in public portfolios
//   (editing is false) or editable portfolios (editing is true)
//   and index is not ignored, or
// - NULL to return a section template from the section's ID
//   field (editing is true and index is ignored)
export function GetElementJSX(element, editing, sectionIndex, elementIndex) {
  const sectionElementName = element.id
  const SectionElementComponent = sectionElements[sectionElementName]

  return (
    <SectionElementComponent
      name={sectionElementName}
      editing={editing}
      data={element.data}
      sectionIndex={sectionIndex}
      elementIndex={elementIndex}
    />
  )
}

export function ConvertToSection(section) {
  return section.map((element) => ({ ...element, data: '' }))
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

/* -------------------------------------------------------------------------- */

// Stores the section IDs by the category of sections
// export const sectionIdsByCategory = {
//   headings: ['headingTitle', 'headingSubtitle'],
//   text: ['singleText', 'doubleText', 'singleRichText'],
//   multimedia: ['youtubeVideo', 'singleImage']
// }

// A section ID corresponds to a given arrangement of section elements.
// This stores the section elements formatted as:
//   [{section element name}, {section element component}, {optional grid size}]
// in an array consisting of all the section elements of a section ID.
// export const sectionElementsBySectionId = {
//   headingTitle: [['title', Title]],
//   headingSubtitle: [['subtitle', Subtitle]],
//   singleText: [['paragraph', Paragraph]],
//   doubleText: [
//     ['paragraph1', Paragraph, 6],
//     ['paragraph2', Paragraph, 6]
//   ],
//   youtubeVideo: [['video', YoutubeVideo]],
//   singleImage: [['image', Image]],
//   singleRichText: [['text', Text]],
//   doubleRichText: [
//     ['text', Text, 6],
//     ['text', Text, 6]
//   ],
//   singleFile: [['file', File]]
// }

// Given the section ID, returns a new section object with the correct
// section elements each initialised with empty strings
// export function GetNewSectionObject(sectionId) {
//   // The index of the section element name, stored in sectionElementsBySectionId
//   const name = 0

//   // Initialise the section elements within the section data property with
//   // empty strings
//   const sectionData = sectionElementsBySectionId[sectionId]
//     .map((element) => {
//       return { [element[name]]: '' }
//     })
//     .reduce((prev, curr) => ({ ...prev, ...curr }), {})

//   // Return a new section object with the correct format
//   return { id: sectionId, data: sectionData }
// }
