import React from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'

import { loggedInStyles } from '../loggedInStyles'
import { Grid, Paper, Fab } from '@material-ui/core'
import PortfolioCard from './PortfolioCard'
import AddIcon from '@material-ui/icons/Add'

// Some test portfolios as visual guide
const testPortfolios = [
  { title: 'Art Portfolio', desc: 'Hobby portfolio to show case my artworks.' },
  {
    title: 'Work Portfolio',
    desc:
      'Portfolio to show my personal projects to employers. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit porro dolore facilis tempore, quasi magni quaerat nam laudantium ut perferendis vitae animi illum natus, illo voluptatibus eveniet assumenda fuga dolorum?',
  },
  { title: 'Art Portfolio', desc: 'Hobby portfolio to show case my artworks.' },
]

export default function PortfolioCardList(props) {
  // TODO: Grab and store user portfolio
  const portfolios = testPortfolios
  const history = useHistory()

  const addPortfolio = (details) => {
    history.push('/portfolios/edit')
  }

  // Contains all styling
  const classes = loggedInStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  // Breakpoint sizes for portfolio
  const { xs, md, lg } = props
  return (
    <Grid item xs={xs} md={md} lg={lg} direction='row'>
      <Paper className={fixedHeightPaper}>
        <Grid container className={classes.addPortfolioContainer}>
          <Fab
            className={classes.addPortfolioFab}
            color='primary'
            variant='extended'
            aria-label='add portfolio'
            onClick={addPortfolio}
          >
            Add Portfolio
            <AddIcon className={classes.addPortfolioIcon} />
          </Fab>
        </Grid>
        <Grid container spacing={3} style={{ overflow: 'scroll' }}>
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
