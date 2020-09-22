import React, { useState } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  withStyles,
  makeStyles
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import transitions from '../../Styles/transitions'
import PortfolioCard from './PortfolioCard'
import CustomDialog from './CustomDialog'
import { getUser, patchUser, deletePortfolio } from '../../Backend/Fetch'

const useStyles = makeStyles((theme) => ({
  portfolio: {
    margin: theme.spacing(3)
  }
}))

const DraggablePortfolioList = ({ portfolios, setPortfolios }) => {
  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  async function handleView(portfolioId) {
    // Get the current user
    const emailId = window.sessionStorage.getItem('emailId')

    const user = await getUser()

    // Get the portfolio from the user's portfolios array whose index === portfolioIndex
    let portfolioIndex = 0
    while (portfolioId !== user.portfolios[portfolioIndex]) {
      portfolioIndex++
    }

    // Go to the designated route for public portfolios
    history.push(`/public/${emailId}/${portfolioIndex}/0`)
  }

  function handleEdit(portfolioId) {
    // Set portfolioId in session storage so EditPortfolioPage will fetch
    // portfolio from DB based on this ID
    window.sessionStorage.setItem('portfolioId', portfolioId)
    history.push('/portfolios/edit')
  }

  async function handleDelete(portfolioId) {
    if (portfolioId) {
      // Get the new list of portfolio IDs to be used in PATCH request
      const newPortfolioIds = portfolios
        .map((portfolioObj) => portfolioObj.id)
        .filter((id) => id !== portfolioId)

      // Create a temporary Set item for it, used to filter the current portfolios
      // state array, which consists of the portfolio objects (not just IDs)
      const newPortfolioIdsSet = new Set(newPortfolioIds)
      const newPortfolios = portfolios.filter((portfolioObj) =>
        newPortfolioIdsSet.has(portfolioObj.id)
      )

      // Set the portfolios state as the new list of portfolio objects, which does
      // not have the to-be-deleted portfolio
      setPortfolios(newPortfolios)

      // Delete the portfolio from the user's portfolios property
      const patchDetails = { portfolios: newPortfolioIds }
      const patchResponse = patchUser(patchDetails).catch((error) =>
        console.log('Error: User portfolios NOT patched!')
      )

      if (patchResponse.ok) {
        // Delete the portfolio from the portfolio DB
        deletePortfolio(portfolioId).catch((error) =>
          console.log('Error: Portfolio NOT deleted!', error)
        )
      }
    }

    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [toBeDeleted, setToBeDeleted] = useState({ id: '', title: '' })

  function handleClick(id, title) {
    setToBeDeleted({ id, title })
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const deleteContent = (
    <form onSubmit={() => handleDelete(toBeDeleted.id)}>
      <DialogTitle id='form-dialog-title'>Delete Portfolio</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete the portfolio{' '}
          <span style={{ fontWeight: 'bold' }}>{toBeDeleted.title}</span>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={() => handleDelete(toBeDeleted.id)} variant='contained'>
          Delete
        </Button>
      </DialogActions>
    </form>
  )

  const deleteDialog = <CustomDialog open={open} setOpen={setOpen} content={deleteContent} />

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid item>
      <Droppable droppableId='portfoliosDroppable'>
        {(provided, snapshot) => (
          <Grid {...provided.droppableProps} ref={provided.innerRef} container>
            <TransitionGroup style={{ width: '100%', height: '100%' }}>
              {portfolios.map((portfolio, idx) => (
                <CSSTransition key={portfolio.id} classNames='fade' timeout={500}>
                  <Draggable draggableId={portfolio.id} index={idx}>
                    {(provided, snapshot) => (
                      <Grid
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        item
                        xs={12}
                        className={classes.portfolio}
                      >
                        {/*
                         * PORTFOLIO CARD: Need to change portfolioId to appropriate Id
                         */}
                        <PortfolioCard
                          portfolioId={portfolio.id}
                          title={portfolio.title}
                          description={portfolio.description}
                          viewPortfolio={handleView}
                          editPortfolio={handleEdit}
                          deletePortfolio={handleClick}
                        />
                      </Grid>
                    )}
                  </Draggable>
                </CSSTransition>
              ))}
            </TransitionGroup>
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
      {deleteDialog}
    </Grid>
  )
}

export default withStyles(transitions)(DraggablePortfolioList)
