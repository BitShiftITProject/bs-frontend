import React, { useContext, useEffect, useState } from 'react'
import { PortfolioContext } from '../Contexts/PortfolioContext'

import { Grid, TextField, Typography, styled, Tooltip, Link } from '@material-ui/core'
import YouTube from 'react-youtube'
import { getMediaItem, getFile, getDataUrl } from '../../Backend/Fetch'
import DropzoneButton from '../../Components/CommonComponents/DropzoneButton'

import ReactHtmlParser from 'react-html-parser'
import TextEditor from '../TextEditor'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius amet error pariatur atque modi necessitatibus numquam. Adipisci quidem ad animi id libero amet itaque numquam, nostrum recusandae dolor quo pariatur possimus quos odit neque perferendis optio repudiandae repellat molestias dolorum sint eligendi atque placeat. Vero eius placeat incidunt sit adipisci?'
// const title = 'Title'
// const subtitle = 'Subtitle'
const text = 'Text'
const youtubeVideo = 'Video'
const image = 'Image'
const fileUpload = 'File'
// const quote = '"Lorem ipsum dolor sit amet, consectetur adipisicing elit." -Lorem Ipsum'

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
      <TextEditor sectionIndex={sectionIndex} elementIndex={elementIndex} name={name} data={data} />
    )
  ) : (
    <div>{ReactHtmlParser(data)}</div>
  )

  return rendered
}

export const YoutubeVideo = ({ name, editing, data, sectionIndex, elementIndex }) => {
  const { sections, pageId, modifySection } = useContext(PortfolioContext)

  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{youtubeVideo}</Typography>
      </ExampleSection>
    ) : (
      <Tooltip placement='top' title='Video ID (See FAQ)'>
        <TextField
          value={sections[pageId][sectionIndex][elementIndex].data}
          onChange={(e) => modifySection(sectionIndex, elementIndex, name, e.target.value)}
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
  const { sections, pageId } = useContext(PortfolioContext)
  const [imageName, setImageName] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    async function getNameOfImage() {
      // console.log(sections[pageId][sectionIndex][elementIndex].data)
      if (sections[pageId][sectionIndex][elementIndex].data === '') {
        return 'No Image Uploaded'
      } else {
        let itemName = await getMediaItem(sections[pageId][sectionIndex][elementIndex].data)
        return itemName.public_name
      }
    }
    async function getUploadedFile() {
      if (editing) {
        if (sections[pageId][sectionIndex][elementIndex].data === '') {
          return null
        } else {
          let file = await getFile(sections[pageId][sectionIndex][elementIndex].data)
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
          setImageName(name)
        })
      }
    }
  }, [data, editing, sectionIndex, elementIndex, name, pageId, sections])

  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{image}</Typography>
      </ExampleSection>
    ) : (
      // Open up file dialog with function related to changing this value
      // Make typography on the right show file name
      // Show button and typography in line
      <Grid container direction='row' spacing={1} justify='flex-start' alignItems='center'>
        <Grid item>
          {file === null ? (
            <p>Loading...</p>
          ) : (
            <DropzoneButton
              img
              sectionIndex={sectionIndex}
              elementIndex={elementIndex}
              elementName={name}
              initialFile={file === '' ? null : file}
            />
          )}
        </Grid>
        <Grid item>
          <Typography variant='h6'>{imageName}</Typography>
        </Grid>
      </Grid>
    )
  ) : (
    // Get image before showing
    <img src={file} alt={file} />
  )

  return rendered
}

export const File = ({ name, editing, data, sectionIndex, elementIndex }) => {
  const { sections, pageId } = useContext(PortfolioContext)
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    async function getNameOfFile() {
      // console.log(sections[pageId][sectionIndex][elementIndex].data)
      if (sections[pageId][sectionIndex][elementIndex].data === '') {
        return 'No File Uploaded'
      } else {
        let itemName = await getMediaItem(sections[pageId][sectionIndex][elementIndex].data)
        return itemName.public_name
      }
    }
    async function getUploadedFile() {
      if (editing) {
        if (sections[pageId][sectionIndex][elementIndex].data === '') {
          return null
        } else {
          let file = await getFile(sections[pageId][sectionIndex][elementIndex].data)
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
        getNameOfFile().then((name) => {
          setFileName(name)
        })
      }
    }
  }, [data, editing, sectionIndex, elementIndex, name, pageId, sections])

  const rendered = editing ? (
    data === null ? (
      <ExampleSection container>
        <Typography variant='h6'>{fileUpload}</Typography>
      </ExampleSection>
    ) : (
      // Open up file dialog with function related to changing this value
      // Make typography on the right show file name
      // Show button and typography in line
      <Grid container direction='row' spacing={1} justify='flex-start' alignItems='center'>
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
    <Link>Download File</Link>
  )

  return rendered
}

// export const Paragraph = ({ name, editing, data, index }) => {
//   const { sections, pageId, modifySection } = useContext(PortfolioContext)

//   const rendered = editing ? (
//     data === null ? (
//       <ExampleSection container>
//         <Typography variant='caption' component='p'>
//           {lorem}
//         </Typography>
//       </ExampleSection>
//     ) : (
//       <TextField
//         value={sections[pageId][index]['data'][name]}
//         onChange={(e) => modifySection(index, name, e.target.value)}
//         fullWidth
//         multiline
//         id={name}
//         variant='outlined'
//       />
//     )
//   ) : (
//     <Typography style={{ whiteSpace: 'pre-line' }} variant='body1'>
//       {data}
//     </Typography>
//   )

//   return rendered
// }

// export const Title = ({ name, editing, data, index }) => {
//   const { sections, pageId, modifySection } = useContext(PortfolioContext)

//   const rendered = editing ? (
//     data === null ? (
//       <ExampleSection container>
//         <Typography variant='h5'>{title}</Typography>
//       </ExampleSection>
//     ) : (
//       <TextField
//         value={sections[pageId][index]['data'][name]}
//         onChange={(e) => modifySection(index, name, e.target.value)}
//         fullWidth
//         multiline
//         id={name}
//         variant='outlined'
//       />
//     )
//   ) : (
//     <Typography component='h2' variant='h3'>
//       {data}
//     </Typography>
//   )

//   return rendered
// }

// export const Subtitle = ({ name, editing, data, index }) => {
//   const { sections, pageId, modifySection } = useContext(PortfolioContext)

//   const rendered = editing ? (
//     data === null ? (
//       <ExampleSection container>
//         <Typography variant='h6'>{subtitle}</Typography>
//       </ExampleSection>
//     ) : (
//       <TextField
//         value={sections[pageId][index]['data'][name]}
//         onChange={(e) => modifySection(index, name, e.target.value)}
//         fullWidth
//         multiline
//         id={name}
//         variant='outlined'
//       />
//     )
//   ) : (
//     <Typography component='h4' variant='h5'>
//       {data}
//     </Typography>
//   )

//   return rendered
// }
