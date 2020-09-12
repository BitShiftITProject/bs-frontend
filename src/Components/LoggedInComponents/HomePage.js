import React from 'react'
import { Grid } from '@material-ui/core'
import PortfolioCardList from './PortfolioCardList'
import HomeProfile from './HomeProfile'
import Sidebar from './Sidebar'

export default function HomePage() {
  const content = (
    <Grid container direction='row' spacing={0}>
      {/**
       * Breakpoint sizes of each component passed in
       */}
      <HomeProfile xs={12} md={4} lg={3} />
      <PortfolioCardList xs={12} md={8} lg={9} />
    </Grid>
  )

  return <Sidebar content={content} />
}
