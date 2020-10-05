import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'

import { loggedInStyles } from '../../Styles/loggedInStyles'
import { Grid, Paper, Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { getUser, getUserPortfolios, patchUser, logout } from '../../Backend/Fetch'

import DraggablePortfolioList from './DraggablePortfolioList'
import arrayMove from 'array-move'
import { useIntl } from 'react-intl'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles()
  const fixedHeightPaper = loggedInStyles().fixedHeightPaper
  const floatingTopContainer = loggedInStyles().floatingTopContainer

  // Breakpoint sizes for portfolio
  const { xs, md, lg } = props

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                     Fetching Initial List of Portfolios                    */
  /* -------------------------------------------------------------------------- */

  const [portfolios, setPortfolios] = useState([])
  const [user, setUser] = useState(null)

  // Since the second argument of useEffect is empty, that means it does not have
  // dependencies and will only run once, therefore functioning just like componentDidMount
  useEffect(() => {
    // To fetch a user's portfolio, we must fetch the user first then iterate
    // through its portfolios array of portfolio ID strings. Each string will be
    // used to fetch the corresponding Portfolio object, which will then be
    // added to the list of portfolios to be rendered.
    async function grabUser() {
      const user = await getUser()
      if (!user) {
        return null
      }
      return user
    }

    grabUser().then((user) => {
      if (user) {
        setUser(user)
        getUserPortfolios(user.username).then((portfolios) => setPortfolios(portfolios))
      } else {
        logout()
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

  const handleAdd = (details) => {
    history.push('/portfolios/add')
  }

  /* -------------------------------------------------------------------------- */
  /*                               Portfolio List                               */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid item container xs={xs} md={md} lg={lg} direction='row'>
      <Paper className={fixedHeightPaper}>
        {/*
         * ADD PORTFOLIO BUTTON
         */}
        <Grid item className={floatingTopContainer}>
          <Fab
            color='secondary'
            variant='extended'
            aria-label={intl.formatMessage({ id: 'addPortfolio' })}
            onClick={handleAdd}
          >
            {intl.formatMessage({ id: 'addPortfolio' })}
            <AddIcon className={classes.addPortfolioIcon} />
          </Fab>
        </Grid>
        {/*
         * PORTFOLIO LIST
         */}
        <DragDropContext onDragEnd={onDragEnd}>
          <DraggablePortfolioList
            user={user}
            portfolios={portfolios}
            setPortfolios={setPortfolios}
          />
        </DragDropContext>
      </Paper>
    </Grid>
  )
}
