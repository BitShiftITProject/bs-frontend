import React from 'react'
import { Dialog } from '@material-ui/core'

export default function CustomDialog(props) {
  const { open, setOpen, content } = props

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
