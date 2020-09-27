import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Loading({ message }) {
  return (
    <div>
      <CircularProgress color='secondary' />
      <p> {message}</p>
    </div>
  )
}
