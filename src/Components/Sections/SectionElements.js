import React, { useCallback, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import YouTube from 'react-youtube'
import { Grid, TextField, Typography, styled, Tooltip, Link, makeStyles } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'

import { getMediaItem, getFile, getDataUrl, getPage } from '../../Backend/Fetch'
import DropzoneButton from '../../Components/CommonComponents/DropzoneButton'

import TextEditor from '../TextEditor'
import { useQueryCache } from 'react-query'
import { useStore } from '../../Hooks/Store'
import shallow from 'zustand/shallow'

const text = 'Text'
const youtubeVideo = 'Video'
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

const editElementFunction = (state) => state.editCurrentElement
const pageIdSelector = (state) => state.pageId
const currentSectionDetails = ({ pageId, currentElement }) => [pageId, currentElement]

/* -------------------------------------------------------------------------- */
/*                              Section Elements                              */
/* -------------------------------------------------------------------------- */

// A section element is a single element within a section. For example, a
// section may be comprised of a Paragraph section element and a Title section
// element.

// Section elements are rendered in the MapSection function in SectionsMap.js,
// which maps section IDs to the corresponding components that makes up that
// section.

// For example, a section with the section ID 'headingTitle'  is mapped to
// a single Title section element:
//
// - If it was rendered in the non-editing mode (i.e. in a public portfolio),
//   it is shown as a Typography component with the section's data.
//
// - If it was rendered in the editing mode, it may either be shown as:
//   - An actual section with the actual datas from the Page object
//     such that the 'data' attribute is non-null
//   - A section template, wrapped in the ExampleSection, where the 'data'
//     attribute is null

export const Text = ({ name, editing, data, sectionIndex, elementIndex }) => {
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
}

export const YoutubeVideo = ({ name, editing, data, sectionIndex, elementIndex }) => {
  const editCurrentElement = useStore(useCallback(editElementFunction, []))

  const [pageId, currentElement] = useStore(useCallback(currentSectionDetails, []), shallow)

  const currentPage = useQueryCache().getQueryData(['pages', pageId])

  const handleChange = (e) => {
    console.log('Youtube video changed to:', e.target.value)
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
          value={currentPage.content.sections[sectionIndex][elementIndex].data}
          onChange={handleChange}
          fullWidth
          multiline
          id={name}
          variant='outlined'
        />
      </Tooltip>
    )
  ) : (
    <YouTube videoId={data} opts={{ width: '100%' }} />
  )

  return rendered
}

export const Image = ({ name, editing, data, sectionIndex, elementIndex }) => {
  const [pageId, currentElement] = useStore(useCallback(currentSectionDetails, []), shallow)

  const currentPage = useQueryCache().getQueryData(['pages', pageId])

  const [imageName, setImageName] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    async function getNameOfImage() {
      if (currentPage.content.sections[sectionIndex][elementIndex].data === '') {
        return 'No Image Uploaded'
      } else {
        const file = await getMediaItem(
          currentPage.content.sections[pageId][sectionIndex][elementIndex].data
        )
        if (!file) return 'No Image Uploaded'
        return file.public_name
      }
    }
    async function getUploadedFile() {
      if (editing) {
        if (currentPage.content.sections[sectionIndex][elementIndex].data === '') {
          return null
        } else {
          let file = await getFile(currentPage.content.sections[sectionIndex][elementIndex].data)
          return file
        }
      } else {
        if (data === '') {
          return null
        } else {
          let file = await getDataUrl(data)
          return file
        }
      }
    }

    if (data != null) {
      getUploadedFile().then((file) => {
        file != null ? setFile(file) : setFile('')
      })
      if (editing) {
        getNameOfImage().then((name) => {
          console.log('Image Name:', name)
          setImageName(name)
        })
      }
    }
  }, [data, editing, sectionIndex, elementIndex, name, pageId])

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
        <Grid item>
          {file === null ? (
            <p>Loading...</p>
          ) : (
            <DropzoneButton img initialFile={file === '' ? null : file} />
          )}
        </Grid>
        <Grid item>
          <Typography variant='h6'>{imageName}</Typography>
        </Grid>
      </Grid>
    )
  ) : (
    // Get image before showing
    <img
      style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
      src={file}
      alt={imageName}
    />
  )

  return rendered
}

export const File = ({ name, editing, data, sectionIndex, elementIndex }) => {
  const [pageId, currentElement] = useStore(useCallback(currentSectionDetails, []), shallow)

  const currentPage = useQueryCache().getQueryData(['pages', pageId])

  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState(null)
  const [page, setPage] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    async function getCurrentPage(pageId) {
      const currentPage = await getPage(pageId)
      return currentPage
    }

    if (pageId) {
      getCurrentPage(pageId).then((currentPage) => {
        setPage(currentPage)
      })
    }
  }, [pageId])

  const getFileName = async () => {
    // In EditPortfolioSectionsGrouped

    if (currentPage.content.sections) {
      if (currentPage.content.sections[sectionIndex][elementIndex].data === '') {
        return 'No File Uploaded'
      } else {
        const file = await getMediaItem(
          currentPage.content.sections[sectionIndex][elementIndex].data
        )
        if (!file) return 'No File Uploaded'
        return file.public_name
      }
    } else if (
      page &&
      page.content.sections[sectionIndex] &&
      page.content.sections[sectionIndex][elementIndex] &&
      page.content.sections[sectionIndex][elementIndex].id === 'file'
    ) {
      if (page.content.sections[sectionIndex][elementIndex].data === '') {
        return 'No File Uploaded'
      } else {
        const file = await getMediaItem(page.content.sections[sectionIndex][elementIndex].data)
        if (!file) return 'No File Uploaded'
        return file.public_name
      }
    } else {
      return 'Loading...'
    }
  }

  useEffect(() => {
    async function getNameOfFile() {
      return await getFileName()
    }

    async function getUploadedFile() {
      if (editing) {
        if (currentPage.content.sections[sectionIndex][elementIndex].data === '') {
          return null
        } else {
          let file = await getFile(currentPage.content.sections[sectionIndex][elementIndex].data)
          return file
        }
      } else {
        if (data === '') {
          return null
        } else {
          let file = await getDataUrl(data)
          return file
        }
      }
    }

    if (data != null) {
      getUploadedFile().then((file) => {
        file != null ? setFile(file) : setFile('')
      })
      getNameOfFile().then((name) => {
        setFileName(name)
      })
    }
  }, [data, editing, sectionIndex, elementIndex, name, page])

  const handleClick = async () => {
    if (file) {
      const fileBlob = await (await fetch(file)).blob()
      const blobURL = URL.createObjectURL(fileBlob)

      const a = document.createElement('a')

      a.href = blobURL
      a.download = fileName
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
        <Grid item>
          {file === null ? (
            <p>Loading...</p>
          ) : (
            <DropzoneButton
              sectionIndex={sectionIndex}
              elementIndex={elementIndex}
              elementName={name}
              initialFile={file === '' ? null : file}
            />
          )}
        </Grid>
        <Grid item>
          <Typography variant='h6'>{fileName}</Typography>
        </Grid>
      </Grid>
    )
  ) : (
    // Get file before showing
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justify: 'center',
        alignItems: 'center'
      }}
    >
      <span
        onClick={handleClick}
        style={{ display: 'flex', justify: 'center', alignItems: 'center' }}
      >
        <GetAppIcon className={classes.fileUploadIcon} />
        <Link className={classes.fileUpload}>{page !== null && fileName !== null && fileName}</Link>
      </span>
    </div>
  )

  return rendered
}
