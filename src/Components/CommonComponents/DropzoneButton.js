import React, { useState } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import CustomDialog from './CustomDialog'

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

export default function DropzoneButton({ img, initialFile }) {
  const classes = useStyles()

  // Dialog state
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([initialFile] || [])
  const [fileName, setFileName] = useState('')
  const [fileExtension, setFileExtension] = useState('')

  // Max files that can be uploaded
  const filesLimit = 1

  // Upload images only
  const onlyImage = img

  // TODO: Handle submit button with correct file upload endpoint
  function handleSubmit() {
    console.log(`File uploaded: ${fileName}.${fileExtension}`)
    setOpen(false)
  }

  const content = (
    <div>
      <DialogTitle>{onlyImage ? 'Upload image' : 'Upload file'}</DialogTitle>
      <DialogContent className={classes.content}>
        <DropzoneArea
          // File upload settings
          // Either accepts images or any non-media files like PDF, zip, HTML, etc.
          acceptedFiles={onlyImage ? ['image/*'] : ['application/*', 'text/*']}
          filesLimit={filesLimit}
          maxFileSize={5000000}
          // On current file change (includes change that happens on component mount)
          onChange={(files) => {
            console.log('Files:', files)
            setFiles(files)
            if (files.length) {
              const file = files[0].name
              const filename = file.substring(0, file.lastIndexOf('.'))
              const ext = file.split('.').pop()
              setFileName(filename)
              setFileExtension(ext)
            } else {
              setFileName('')
              setFileExtension('')
            }
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
      {/* Cancel or Submit file upload */}
      <DialogActions>
        <Button variant='text' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant='text' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </div>
  )

  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        {onlyImage ? 'Add Image' : 'Add File'}
      </Button>
      <CustomDialog open={open} setOpen={setOpen} content={content} />
    </div>
  )
}
