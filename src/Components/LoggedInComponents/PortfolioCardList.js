import React from 'react'
import clsx from 'clsx'

import { loggedInStyles } from '../loggedInStyles'
import { Grid, Paper } from '@material-ui/core'
import PortfolioCard from './PortfolioCard'
import AddPortfolioCard from './AddPortfolioCard'

// Some test portfolios as visual guide
const testPortfolios = [
  { title: 'Art Portfolio', desc: 'Hobby portfolio to show case my artworks.' },
  { title: 'Work Portfolio', desc: 'Portfolio to show my personal projects to employers.' },
]

export default function PortfolioCardList(props) {
  // TODO: Grab and store user portfolio
  const portfolios = testPortfolios

  const addPortfolio = (details) => {
    alert('Added portfolio!')
  }

  // Contains all styling
  const classes = loggedInStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  // Breakpoint sizes for portfolio
  const { xs, md, lg } = props
  return (
    <Grid item xs={xs} md={md} lg={lg}>
      <Paper className={fixedHeightPaper}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <AddPortfolioCard handleClick={addPortfolio} />
          </Grid>
          {portfolios.map((p) => (
            <Grid item xs={12} lg={6}>
              <PortfolioCard key={p.title} title={p.title} desc={p.desc} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  )
}
