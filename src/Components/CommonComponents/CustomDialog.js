import React from 'react'
import { Dialog } from '@material-ui/core'

export default function CustomDialog(props) {
  // Passing down the content from a parent makes this dialog reusable.
  // Passing down the open/closed state from a parent makes it follow
  // the React downward flow of information
  const { open, setOpen, content } = props

  // Closes the dialog, called on the Close event of the dialog
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {content}
    </Dialog>
  )
}
