import React, { useCallback } from 'react'
import ReactHtmlParser from 'react-html-parser'
import YouTube from 'react-youtube'
import { Grid, TextField, Typography, styled, Tooltip, Link, makeStyles } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'

// import { getMediaItem, getFile, getDataUrl } from '../../Backend/Fetch'
import Dropzone from '../CommonComponents/Dropzone'

import TextEditor from '../TextEditor'
import { useStore } from '../../Hooks/Store'
// import usePage from '../../Hooks/usePage'
import useFile from '../../Hooks/useFile'
import useMediaItem from '../../Hooks/useMediaItem'
import ReactPlayer from 'react-player'
import shallow from 'zustand/shallow'

const text = 'Text'
const youtubeVideo = 'Video'
const mediaPlayer = 'Media Player'
const image = 'Image'
const fileUpload = 'File'

const ExampleSection = styled(Grid)({
  overflowY: 'hidden',
  height: '100%',
  border: '0.5px solid rgba(0,0,0,0.05)',
  backgroundColor: '#F1F1F1',
  color: '#000',
  cursor: 'default',
  '& p': {
    lineHeight: 'auto'
  },
  justifyContent: 'center',
  alignItems: 'center'
})

const useStyles = makeStyles((theme) => ({
  fileUploadIcon: {
    transform: 'scale(0.8)',
    color: theme.palette.info.main
  },
  fileUpload: {
    cursor: 'pointer',
    fontWeight: 'bold',
    color: theme.palette.info.main
  }
}))

const currentElementSelector = ({ currentElement, editCurrentElement }) => [
  currentElement,
  editCurrentElement
]
// const pageIdSelector = (state) => state.pageId

/* -------------------------------------------------------------------------- */
/*                              Section Elements                              */
/* -------------------------------------------------------------------------- */

// A section element is a single element within a section. For example, a
// section may be comprised of a Paragraph section element and a Title section
// element.

// Section elements are rendered in the MapSectionToJSX function in SectionsMap.js,
// which maps section IDs to the corresponding components that makes up that
// section.

// - If it was rendered in the non-editing mode (i.e. in a public portfolio),
//   it is shown as a Typography component with the section's data.
//
// - If it was rendered in the editing mode, it may either be shown as:
//   - An actual section with the actual datas from the Page object
//     such that the 'data' attribute is non-null
//   - A section template, wrapped in the ExampleSection, where the 'data'
//     attribute is null

export const Text = React.memo(({ editing, data }) => {
  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{text}</Typography>
      </ExampleSection>
    ) : (
      <TextEditor data={data} />
    )
  ) : (
    <div>{ReactHtmlParser(data)}</div>
  )

  return rendered
})

export const MediaPlayer = React.memo(({ editing, data }) => {
  const [currentElement, editCurrentElement] = useStore(
    useCallback(currentElementSelector, []),
    shallow
  )

  const handleChange = (e) => {
    editCurrentElement(e.target.value)
  }

  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{mediaPlayer}</Typography>
      </ExampleSection>
    ) : (
      <TextField
        value={currentElement.data}
        onChange={handleChange}
        fullWidth
        multiline
        variant='outlined'
        label='Media URL'
        helperText={
          'Supports YouTube, Facebook, Soundcloud, Vimeo, Dailymotion, and any URL linking to a video or audio file'
        }
      />
    )
  ) : data !== '' ? (
    <ReactPlayer url={data} controls width='100%' />
  ) : (
    <div style={{ height: 0 }}></div>
  )

  return rendered
})

export const YoutubeVideo = React.memo(({ editing, data }) => {
  const [currentElement, editCurrentElement] = useStore(
    useCallback(currentElementSelector, []),
    shallow
  )

  const handleChange = (e) => {
    editCurrentElement(e.target.value)
  }

  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{youtubeVideo}</Typography>
      </ExampleSection>
    ) : (
      <Tooltip placement='top' title='Video ID (See FAQ)'>
        <TextField
          value={currentElement.data}
          onChange={handleChange}
          fullWidth
          multiline
          variant='outlined'
        />
      </Tooltip>
    )
  ) : (
    <YouTube videoId={data} opts={{ width: '100%' }} />
  )

  return rendered
})

export const Image = React.memo(({ editing, data }) => {
  // The data being passed to the useMediaItem functions is the S3 key of the
  // image
  const { data: mediaItem } = useMediaItem(data)
  const { data: file } = useFile(data, editing)

  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{image}</Typography>
      </ExampleSection>
    ) : (
      // Open up file dialog with function related to changing this value
      // Make typography on the right show file name
      // Show button and typography in line
      <Grid container direction='row' spacing={2} justify='center' alignItems='center'>
        <Dropzone
          img
          initialFile={
            !file || file === ''
              ? null
              : {
                  data: file,
                  file: {
                    name: mediaItem.public_name,
                    path: mediaItem.public_name,
                    type: mediaItem.file_type
                  }
                }
          }
        />
      </Grid>
    )
  ) : (
    // Get image before showing
    <div>
      {file && (
        <img
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
          src={file}
          alt={mediaItem ? mediaItem.public_name : 'No File Uploaded'}
        />
      )}
    </div>
  )

  return rendered
})

export const File = React.memo(({ editing, data }) => {
  // The data being passed to the useMediaItem functions is the S3 key of the
  // file
  const { data: mediaItem } = useMediaItem(data)
  const { data: file } = useFile(data, editing)

  const classes = useStyles()

  const handleClick = async () => {
    if (file) {
      const fileBlob = await (await fetch(file)).blob()
      const blobURL = URL.createObjectURL(fileBlob)

      const a = document.createElement('a')

      a.href = blobURL
      a.download = mediaItem.public_name
      a.click()
    }
  }

  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{fileUpload}</Typography>
      </ExampleSection>
    ) : (
      // Open up file dialog with function related to changing this value
      // Make typography on the right show file name
      // Show button and typography in line
      <Grid container direction='row' spacing={2} justify='center' alignItems='center'>
        <Dropzone
          initialFile={
            !file || file === ''
              ? null
              : {
                  data: file,
                  file: {
                    name: mediaItem.public_name,
                    path: mediaItem.public_name,
                    type: mediaItem.file_type
                  }
                }
          }
        />
      </Grid>
    )
  ) : (
    // Get file before showing
    <div>
      {file && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <span
            onClick={handleClick}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 100
            }}
          >
            <GetAppIcon className={classes.fileUploadIcon} />
            <Link className={classes.fileUpload}>
              {mediaItem && mediaItem.public_name ? mediaItem.public_name : 'No File Uploaded'}
            </Link>
          </span>
        </div>
      )}
    </div>
  )

  return rendered
})
