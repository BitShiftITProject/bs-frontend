import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loggedInStyles } from '../loggedInStyles'
import { Grid, Paper, Fab, makeStyles } from '@material-ui/core'
import PortfolioCard from './PortfolioCard'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                  Add Portfolio Button (PortfolioCardList)                  */
  /* -------------------------------------------------------------------------- */

  floatingTopContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },

  addPortfolioFab: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  addPortfolioIcon: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0.5),
    },
  },
}))

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
  /* -------------------------------------------------------------------------- */
  /*                       Fetching Initial Portfolio List                      */
  /* -------------------------------------------------------------------------- */

  let portfoliosRef = useRef(testPortfolios)

  // useEffect is run every time a component is updated

  useEffect(() => {
    // TODO: Set up fetch for current user's list of portfolio id's
    let portfolios = portfoliosRef.current

    async function fetchPortfolios() {
      const accessToken = window.sessionStorage.accessToken
      // const response = await fetch().json()
      return []
    }

    portfolios = fetchPortfolios()
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  const handleAdd = (details) => {
    history.push('/portfolios/add')
  }

  const handleView = (portfolioId) => {
    alert(`View: ${portfolioId}`)
  }

  const handleEdit = (portfolioId) => {
    alert(`Edit: ${portfolioId}`)
  }

  const handleDelete = (portfolioId) => {
    alert(`Deleted: ${portfolioId}`)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = useStyles()
  const fixedHeightPaper = loggedInStyles().fixedHeightPaper

  // Breakpoint sizes for portfolio
  const { xs, md, lg } = props

  /* -------------------------------------------------------------------------- */
  /*                               Portfolio List                               */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid item container xs={xs} md={md} lg={lg} direction='row'>
      <Paper className={fixedHeightPaper}>
        <Grid item className={classes.floatingTopContainer}>
          <Fab
            className={classes.addPortfolioFab}
            color='primary'
            variant='extended'
            aria-label='add portfolio'
            onClick={handleAdd}
          >
            Add Portfolio
            <AddIcon className={classes.addPortfolioIcon} />
          </Fab>
        </Grid>
        <Grid container spacing={3} style={{ overflow: 'scroll' }}>
          {portfoliosRef.current.map((p, idx) => (
            <Grid key={idx} item xs={12} lg={6}>
              {/*
               * PORTFOLIO CARD: Need to change portfolioId to appropriate Id
               */}
              <PortfolioCard
                portfolioId={p.title}
                title={p.title}
                desc={p.desc}
                viewPortfolio={handleView}
                editPortfolio={handleEdit}
                deletePortfolio={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  )
}
