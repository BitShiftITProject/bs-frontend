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
