import React, { useState, useCallback } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import CustomDialog from './CustomDialog'
import { postMediaContent, getUser, deleteMediaItem } from '../../Backend/Fetch'
import { useStore } from '../../Hooks/Store'
import useEditPage from '../../Hooks/useEditPage'
import { useQueryCache } from 'react-query'

const useStyles = makeStyles((theme) => ({
  content: {
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

const elementEditFunctions = ({
  startEditingElement,
  editCurrentElement,
  finishEditingElement
}) => [startEditingElement, editCurrentElement, finishEditingElement]

const pageIdSelector = (state) => state.pageId
const currentElementSelector = (state) => state.currentElement

export default function DropzoneButton({ img, initialFile }) {
  const classes = useStyles()

  const user = useQueryCache().getQueryData('user')

  const pageId = useStore(pageIdSelector)
  const currentElement = useStore(currentElementSelector)
  const [startEditingElement, editCurrentElement, finishEditingElement] = useStore(
    useCallback(elementEditFunctions, [])
  )

  const [editPage] = useEditPage()

  // Dialog state
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState(initialFile ? [initialFile] : [])
  const [fileName, setFileName] = useState('')
  const [fileExtension, setFileExtension] = useState('')
  const [loading, setLoading] = useState(false)

  // Max files that can be uploaded
  const filesLimit = 1

  // Upload images only
  const onlyImage = img

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
        if (encoded.length % 4 > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4))
        }
        resolve(encoded)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  function handleClose() {
    if (!loading) {
      setOpen(false)
    }
  }

  async function handleSubmit() {
    setLoading(true)
    if (files.length) {
      const fileType = files[0].type
      if (user) {
        const fileResponse = fileToBase64(files[0]).then((result) => {
          const stream = result.toString().replace(/^.*,/, '')
          const postContent = {
            public_name: fileName + '.' + fileExtension,
            file_type: fileType,
            stream: stream
          }
          return postMediaContent(user.username, postContent)
        })

        const key = await fileResponse.then(async (response) => {
          return await response.json().then((body) => {
            return body.key
          })
        })
        editCurrentElement(key)
      }
    }
    setLoading(false)
    setOpen(false)
  }

  const content = (
    <div>
      <DialogTitle>{onlyImage ? 'Upload image' : 'Upload file'}</DialogTitle>
      <DialogContent className={classes.content}>
        <DropzoneArea
          // File upload settings
          // Either accepts images or any non-media files like PDF, zip, HTML, etc.
          initialFiles={files}
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
          // On current file change (includes change that happens on component mount)
          onChange={(newFiles) => {
            console.log('Files:', newFiles)

            if (newFiles.length) {
              setFiles(newFiles)
              const file = newFiles[0].name
              const filename = file.substring(0, file.lastIndexOf('.'))
              const ext = file.split('.').pop()
              setFileName(filename)
              setFileExtension(ext)
            } else {
              setFileName('')
              setFileExtension('')
            }
          }}
          onAdd={(newFiles) => {
            setFiles(newFiles)
            const file = newFiles[0].name
            const filename = file.substring(0, file.lastIndexOf('.'))
            const ext = file.split('.').pop()
            setFileName(filename)
            setFileExtension(ext)
            handleSubmit()
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
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              required
              variant='standard'
              label='Filename'
              disabled={!files.length}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              fullWidth
            />
          </Grid>
          {/* File extension */}
          <Grid item xs={4}>
            <TextField
              required
              variant='standard'
              label='Extension'
              disabled={!files.length}
              readOnly
              value={!files.length ? '' : '.' + fileExtension}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
    </div>
  )

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        {onlyImage ? 'Add Image' : 'Add File'}
      </Button>
      <Dialog open={open} onClose={handleClose} onBackdropClick={handleClose}>
        {content}
      </Dialog>
    </div>
  )
}
