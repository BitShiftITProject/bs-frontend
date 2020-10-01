import React from 'react'

import {
  TextField,
  Typography
  //   Grid,
  //   Paper,
  //   Fab,
  //   Divider,
  //   List,
  //   Button,
  //   DialogActions,
  //   DialogContent,
  //   DialogContentText,
  //   DialogTitle
} from '@material-ui/core'

export const Paragraph = ({ editing, content }) => {
  return <div>{editing ? <TextField value={content} /> : <p>{content}</p>}</div>
}

export const Title = ({ editing, content }) => {
  return (
    <div>
      {editing ? (
        <TextField value={content} />
      ) : (
        <Typography component='h1' variant='h3'>
          {content}
        </Typography>
      )}
    </div>
  )
}

export const Subtitle = ({ editing, content }) => {
  return (
    <div>
      {editing ? (
        <TextField value={content} />
      ) : (
        <Typography component='h1' variant='h5'>
          {content}
        </Typography>
      )}
    </div>
  )
}

// TODO: Add Media section element
