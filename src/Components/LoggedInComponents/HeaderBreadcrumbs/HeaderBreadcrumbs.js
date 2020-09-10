import React from 'react'
import { Typography, Breadcrumbs } from '@material-ui/core'

// const breadcrumbNameMap = {
//   '/home': 'Home',
//   '/profile': 'Profile',
//   '/portfolio': '',
// }

export default function HeaderBreadcrumbs(props) {
  const { crumbs } = props

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {crumbs.map((c) => (
        <Typography key={c}>{c}</Typography>
      ))}
    </Breadcrumbs>
  )
}
