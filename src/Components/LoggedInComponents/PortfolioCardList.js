import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { loggedInStyles } from '../loggedInStyles'
import { Grid, Paper, Fab, makeStyles } from '@material-ui/core'
import PortfolioCard from './PortfolioCard'
import AddIcon from '@material-ui/icons/Add'

import { BACKEND, USERS, PORTFOLIOS } from '../../Endpoints'

const useStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                  Add Portfolio Button (PortfolioCardList)                  */
  /* -------------------------------------------------------------------------- */

  floatingTopContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },

  addPortfolioFab: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  addPortfolioIcon: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0.5)
    }
  }
}))

export default function PortfolioCardList(props) {
  /* -------------------------------------------------------------------------- */
  /*                       Fetching Initial Portfolio List                      */
  /* -------------------------------------------------------------------------- */

  const [portfolios, setPortfolios] = useState([])

  // Since the second argument of useEffect is empty, that means it does not have
  // dependencies and will only run once, therefore functioning just like componentDidMount
  useEffect(() => {
    // TODO: Need to make compatible with token saved in session storage after auth
    // Fetches the current User object, temporarily using the emailId item saved in the
    // session storage when the user logs in
    async function fetchUser() {
      const emailId = window.sessionStorage.getItem('emailId')
      const response = await fetch(BACKEND + USERS + '/' + emailId, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-type': 'application/json'
        }
      })
      const user = await response.json()
      return user
    }

    // Fetches a single Portfolio object given its portfolio ID
    async function fetchPortfolio(portfolioId) {
      const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-type': 'application/json'
        }
      })

      const portfolio = await response.json()

      return portfolio
    }

    // To fetch a user's portfolio, we must fetch the user first then iterate
    // through its portfolios array of portfolio ID strings. Each string will be
    // used to fetch the corresponding Portfolio object, which will then be
    // added to the list of portfolios to be rendered.
    fetchUser().then((user) => {
      if (user.portfolios) {
        for (let i = 0; i < user.portfolios.length; i++) {
          const portfolioId = user.portfolios[i]
          fetchPortfolio(portfolioId).then((portfolio) => {
            portfolios ? setPortfolios([...portfolios, portfolio]) : setPortfolios([portfolio])
          })
        }
      }
    })
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  const handleAdd = (details) => {
    history.push('/portfolios/add')
  }

  function handleView(portfolioId) {
    alert(`View: ${portfolioId}`)
  }

  function handleEdit(portfolioId) {
    // Set portfolioId in session storage so EditPortfolioPage will fetch
    // portfolio from DB based on this ID
    window.sessionStorage.setItem('portfolioId', portfolioId)
    history.push('/portfolios/edit')
  }

  async function handleDelete(portfolioId) {
    // Delete portfolio from /portfolios DB
    const portfolioDelete = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        const emailId = window.sessionStorage.getItem('emailId')
        fetch(BACKEND + USERS + '/' + emailId, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-type': 'application/json'
          }
        })
          .then((user) => {
            return user.json()
          })
          .then((user) => {
            const newPortfolios = user.portfolios.filter((p) => p !== portfolioId)
            const patchBody = { portfolios: newPortfolios }

            fetch(BACKEND + USERS + '/' + emailId, {
              method: 'PATCH',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Content-type': 'application/json'
              },
              body: JSON.stringify(patchBody)
            })
              .then((response) => {
                if (response.ok) {
                  setPortfolios(newPortfolios)
                }
              })
              .catch((error) => {
                console.log(error)
              })
          })
      }
    })
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
          {portfolios.map((p) => (
            <Grid key={p.id} item xs={12} lg={6}>
              {/*
               * PORTFOLIO CARD: Need to change portfolioId to appropriate Id
               */}
              <PortfolioCard
                portfolioId={p.id}
                title={p.title}
                description={p.description}
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
