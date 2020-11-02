import React, { useState } from 'react'
import { Grid, makeStyles, TextField } from '@material-ui/core'
import { DropzoneAreaBase } from 'material-ui-dropzone'
import { useStore } from '../../Hooks/Store'
// import useAddMediaItem from '../../Hooks/useAddMediaItem'
import useDeleteMediaItem from '../../Hooks/useDeleteMediaItem'
import Loading from './Loading'
import { postMediaContent } from '../../Backend/Fetch'
import useUser from '../../Hooks/useUser'

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    '& .MuiDropzoneArea-text': {
      fontSize: '1.2rem',
      margin: theme.spacing(3)
    },
    '& div.MuiDropzonePreviewList-imageContainer': {
      maxWidth: 'unset'
    },
    '& img.MuiDropzonePreviewList-image': {
      maxWidth: 'unset',
      '&:hover': {
        opacity: 0.8
      }
    },
    '& .MuiDropzonePreviewList-removeButton': {
      top: 0,
      right: 'none',
      bottom: 'none',
      left: 'none',
      transform: 'translate(-50%,25%) scale(0.9)'
    },
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }
}))

const editElementFunction = (state) => state.editCurrentElement
const currentElementSelector = (state) => state.currentElement

function Dropzone({ img, initialFile }) {
  const classes = useStyles()

  const user = useUser()

  const currentElement = useStore(currentElementSelector)
  const editCurrentElement = useStore(editElementFunction)

  // const [addMediaItem] = useAddMediaItem()
  const [deleteMediaItem] = useDeleteMediaItem()

  // Dialog state
  const [files, setFiles] = useState(initialFile ? [initialFile] : [])
  const [fileName, setFileName] = useState(
    initialFile ? initialFile.file.name.substring(0, initialFile.file.name.lastIndexOf('.')) : ''
  )
  const [fileExtension, setFileExtension] = useState(
    initialFile ? initialFile.file.name.split('.').pop() : ''
  )
  const [loading, setLoading] = useState(false)

  // Max files that can be uploaded
  const filesLimit = 1

  // Option to Upload images only
  const onlyImage = img

  // function fileToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => {
  //       let encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
  //       if (encoded.length % 4 > 0) {
  //         encoded += '='.repeat(4 - (encoded.length % 4))
  //       }
  //       resolve(encoded)
  //     }
  //     reader.onerror = (error) => reject(error)
  //   })
  // }

  async function handleSubmit(fileObject) {
    setLoading(true)

    if (user) {
      const file = fileObject.file.name
      const filename = file.substring(0, file.lastIndexOf('.'))
      const ext = file.split('.').pop()
      setFileName(filename)
      setFileExtension(ext)

      const fileType = fileObject.file.type

      // const fileResponse = fileToBase64(files[0]).then((result) => {
      //   const stream = result.toString().replace(/^.*,/, '')
      //   const postContent = {
      //     public_name: fileName + '.' + fileExtension,
      //     file_type: fileType,
      //     stream: stream
      //   }
      //   return postMediaContent(user.username, postContent)
      // })
      /* -------------------------------------------------------------------------- */
      const stream = fileObject.data.toString().replace(/^.*,/, '')
      const postContent = {
        public_name: filename + '.' + ext,
        file_type: fileType,
        stream: stream
      }

      const key = await postMediaContent(user.username, postContent).then(async (response) => {
        return await response.json().then((body) => {
          return body.key
        })
      })
      editCurrentElement(key)
    }

    setLoading(false)
  }

  return (
    <div className={classes.content}>
      <DropzoneAreaBase
        // File upload settings
        // Either accepts images or any non-media files like PDF, zip, HTML, etc.
        fileObjects={files}
        acceptedFiles={onlyImage ? ['image/*'] : ['application/*', 'text/*']}
        filesLimit={filesLimit}
        maxFileSize={5000000}
        onDelete={() => {
          deleteMediaItem(currentElement.data)
          editCurrentElement('')
          setFileName('')
          setFileExtension('')
          setFiles([])
        }}
        onAdd={(newFiles) => {
          const fileObject = newFiles[0]
          setFiles(newFiles)
          handleSubmit(fileObject)
        }}
        // Dropzone settings
        disableRejectionFeedback={true}
        dropzoneText={`Drag and drop or click to add ${onlyImage ? 'an image' : 'a file'}`}
        dropzoneProps={{
          multiple: false,
          disabled: files.length >= filesLimit
        }}
        previewGridProps={{
          container: {
            justify: 'center',
            alignItems: 'center'
          },
          item: {}
        }}
        showAlerts={false}
      />

      {/* File name */}
      {!loading ? (
        <Grid container spacing={1} justify='center' alignItems='center'>
          <Grid item xs={8}>
            <TextField
              variant='standard'
              label='Filename'
              disabled={!files.length}
              readOnly
              value={fileName}
              // onChange={(e) => setFileName(e.target.value)}
              fullWidth
            />
          </Grid>
          {/* File extension */}
          <Grid item xs={4}>
            <TextField
              variant='standard'
              label='Extension'
              disabled={!files.length}
              readOnly
              value={!files.length ? '' : '.' + fileExtension}
              fullWidth
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container justify='center' alignItems='center'>
          <Loading message='Uploading...' />
        </Grid>
      )}
    </div>
  )
}

export default Dropzone
