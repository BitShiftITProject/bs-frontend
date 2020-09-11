import React, { useReducer } from 'react'
import clsx from 'clsx'

import { loggedInStyles } from '../../loggedInStyles'
import { Grid, Paper } from '@material-ui/core'
import PortfolioCard from '../PortfolioCard'
import AddPortfolioCard from '../AddPortfolioCard'
import { useHistory } from 'react-router-dom'

function reducer(state, action) {
  switch (action.type) {
    // case 'addPortfolio':
    //   // return {
    //   //   portfolios: [...state.portfolios, { title: action.title, desc: action.desc }],
    //   // }
    //   history.push('/portfolio/edit')


    //   alert('Added portfolio!')
    //   return state
    default:
      return state
  }
}


export default function PortfolioCardList(props) {
  const classes = loggedInStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const { xs, md, lg } = props
  const history = useHistory()

  const testPortfolios = [
    { title: 'Art Portfolio', desc: 'Hobby portfolio to show case my artworks.' },
    { title: 'Work Portfolio', desc: 'Portfolio to show my personal projects to employers.' },
  ]

  const [{ portfolios }, dispatch] = useReducer(reducer, { portfolios: testPortfolios })

  return (
    <Grid item xs={xs} md={md} lg={lg}>
      <Paper className={fixedHeightPaper}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <AddPortfolioCard />
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
