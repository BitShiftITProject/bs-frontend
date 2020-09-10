import React from 'react'
import clsx from 'clsx'
import { useStyles } from '../../useStyles'
import Sidebar from '../Sidebar'
import { Container, Grid } from '@material-ui/core'
import HeaderBreadcrumbs from '../HeaderBreadcrumbs'

export default function EditProfilePage(props) {
  const classes = useStyles()
  const crumbs = ['Home', 'Edit Profile']

  const content = (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth='lg' className={classes.container}>
        <HeaderBreadcrumbs crumbs={crumbs} />
        <div className={classes.breadcrumbSpacer} />

        <Grid container direction='row' spacing={0}></Grid>
      </Container>
    </main>
  )
  return <Sidebar content={content} />
}
