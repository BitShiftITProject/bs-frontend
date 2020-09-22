import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'

import { loggedInStyles } from '../../Styles/loggedInStyles'
import { Grid, Paper, Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { getUser, getPortfolio, patchUser } from '../../Backend/Fetch'

import DraggablePortfolioList from './DraggablePortfolioList'
import arrayMove from 'array-move'

const useStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                  Add Portfolio Button (PortfolioList)                  */
  /* -------------------------------------------------------------------------- */

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

export default function PortfolioList(props) {
  /* -------------------------------------------------------------------------- */
  /*                       Fetching Initial Portfolio List                      */
  /* -------------------------------------------------------------------------- */

  const [portfolios, setPortfolios] = useState([])

  // Since the second argument of useEffect is empty, that means it does not have
  // dependencies and will only run once, therefore functioning just like componentDidMount
  useEffect(() => {
    // To fetch a user's portfolio, we must fetch the user first then iterate
    // through its portfolios array of portfolio ID strings. Each string will be
    // used to fetch the corresponding Portfolio object, which will then be
    // added to the list of portfolios to be rendered.
    getUser().then((user) => {
      if (user.portfolios) {
        for (let i = 0; i < user.portfolios.length; i++) {
          const portfolioId = user.portfolios[i]
          getPortfolio(portfolioId).then((portfolio) => {
            setPortfolios((p) => [...p, portfolio])
          })
        }
      }
    })
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                                Drag and Drop                               */
  /* -------------------------------------------------------------------------- */

  // Needed for react-beautiful-dnd to work, passed to the DragDropContext
  // enclosing the DraggablePortfolioList component
  const onDragEnd = ({ source, destination }) => {
    if (portfolios.length > 1) {
      // Update the portfolios state with the new order
      const newPortfolios = arrayMove(portfolios, source.index, destination.index)
      setPortfolios(newPortfolios)

      // Patch the current user's portfolios array with the newly ordered portfolios array

      const patchDetails = { portfolios: newPortfolios.map((p) => p.id) }

      patchUser(patchDetails)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  const handleAdd = (details) => {
    history.push('/portfolios/add')
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = useStyles()
  const fixedHeightPaper = loggedInStyles().fixedHeightPaper
  const floatingTopContainer = loggedInStyles().floatingTopContainer

  // Breakpoint sizes for portfolio
  const { xs, md, lg } = props

  /* -------------------------------------------------------------------------- */
  /*                               Portfolio List                               */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid item container xs={xs} md={md} lg={lg} direction='row'>
      <Paper className={fixedHeightPaper}>
        <Grid item className={floatingTopContainer}>
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

        <DragDropContext onDragEnd={onDragEnd}>
          <DraggablePortfolioList portfolios={portfolios} setPortfolios={setPortfolios} />
        </DragDropContext>
      </Paper>
    </Grid>
  )
}
