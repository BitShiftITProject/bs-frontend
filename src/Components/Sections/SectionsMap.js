import React from 'react'
import { MediaPlayer, YoutubeVideo, Image, Text, File } from './SectionElements'

export const sectionElements = {
  text: ['Text', Text],
  image: ['Image', Image],
  mediaPlayer: ['Media Player', MediaPlayer],
  video: ['Video', YoutubeVideo],
  file: ['File', File]
}

// Receives section whose data field might be:
// - NON-NULL in the case of mapping sections in public portfolios
//   (editing is false) or editable portfolios (editing is true)
//   and index is not ignored, or
// - NULL to return a section template from the section's ID
//   field (editing is true and index is ignored)
export function GetElementJSX(element, editing) {
  const sectionElementName = element.id
  const SectionElementComponent = sectionElements[sectionElementName][1]

  return <SectionElementComponent editing={editing} data={element.data} />
}

export function ConvertToSection(section) {
  return section.map((element) => ({ ...element, data: element.id === 'spacer' ? 50 : '' }))
}
