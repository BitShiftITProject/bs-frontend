import React from 'react'
import clsx from 'clsx'
import Sidebar from '../Sidebar'
import { useStyles } from '../../useStyles'
import { Container, Grid } from '@material-ui/core'
import PortfolioCardList from '../../PortfolioList/PortfolioCardList'
import HomeProfile from '../HomeProfile'
import HeaderBreadcrumbs from '../HeaderBreadcrumbs'
import { useHistory } from 'react-router-dom'

export default function HomePage() {
  const classes = useStyles()
  const history = useHistory()
  const crumbs = ['Home']

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth='lg' className={classes.container}>
        <HeaderBreadcrumbs crumbs={crumbs} />
        <div className={classes.breadcrumbSpacer} />
        <Grid container direction='row' spacing={0}>
          <HomeProfile xs={12} md={4} lg={3} />
          <PortfolioCardList xs={12} md={8} lg={9} />
        </Grid>
      </Container>
    </main>
  )
}
