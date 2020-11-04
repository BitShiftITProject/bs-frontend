import React from 'react'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import ImageTwoToneIcon from '@material-ui/icons/ImageTwoTone'
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone'
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone'
import HeightIcon from '@material-ui/icons/Height'

import {
  MediaPlayer,
  // YoutubeVideo,
  Image,
  Text,
  File,
  Spacer
} from './SectionElements'

export const sectionElements = {
  text: ['Text', Text, <TextFieldsIcon />],
  image: ['Image', Image, <ImageTwoToneIcon />],
  mediaPlayer: ['Media Player', MediaPlayer, <PlayCircleFilledTwoToneIcon />],
  // video: ["Video", YoutubeVideo],
  file: ['File', File, <AttachmentTwoToneIcon />],
  spacer: ['Spacer', Spacer, <HeightIcon style={{ transform: 'rotate(90deg)' }} />]
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

// Initialise the to-be-added section and its elements
export function ConvertToSection(section) {
  return section.map((element) => ({ ...element, data: element.id === 'spacer' ? 50 : '' }))
}
