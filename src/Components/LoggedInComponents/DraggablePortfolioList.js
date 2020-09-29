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
// import { Droppable, Draggable } from 'react-beautiful-dnd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import transitions from '../../Styles/transitions'
import PortfolioCard from './PortfolioCard'
import CustomDialog from './CustomDialog'
import { getUser, getUserPortfolios, deletePortfolio, logout } from '../../Backend/Fetch'
import { useIntl } from 'react-intl'

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
    const user = await getUser()

    if (!user) logout()

    const portfolios = await getUserPortfolios(user.username).then((response) => response.json())

    // Get the portfolio from the user's portfolios array whose index === portfolioIndex
    let portfolioIndex = 0
    while (portfolioId !== portfolios[portfolioIndex].id) {
      portfolioIndex++
    }

    // Go to the designated route for public portfolios
    history.push(`/public/${user.username}/${portfolioIndex}/0`)
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

      // Delete the portfolio from the portfolios DB
      await deletePortfolio(portfolioId).then((response) => {
        if (response.ok) {
          console.log('Portfolio deleted!')
        } else {
          console.log('Portfolio NOT deleted!')
        }
      })
    }

    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [toBeDeleted, setToBeDeleted] = useState({ id: '', title: '' })
  const intl = useIntl()

  function handleClick(id, title) {
    setToBeDeleted({ id, title })
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const deleteContent = (
    <form onSubmit={() => handleDelete(toBeDeleted.id)}>
      <DialogTitle id='form-dialog-title'>
        {intl.formatMessage({ id: 'deletePortfolio' })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {intl.formatMessage(
            { id: 'deletePortfolioPrompt' },
            { portfolio: <span style={{ fontWeight: 'bold' }}>{toBeDeleted.title}</span> }
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          {intl.formatMessage({ id: 'cancel' })}
        </Button>
        <Button onClick={() => handleDelete(toBeDeleted.id)} variant='contained'>
          {intl.formatMessage({ id: 'delete' })}
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

  // const draggable = (
  //   <Grid item>
  //     <Droppable droppableId='portfoliosDroppable'>
  //       {(provided, snapshot) => (
  //         <Grid {...provided.droppableProps} ref={provided.innerRef} container>
  //           <TransitionGroup style={{ width: '100%', height: '100%' }}>
  //             {portfolios.map((portfolio, idx) => (
  //               <CSSTransition key={portfolio.id} classNames='fade' timeout={500}>
  //                 <Draggable draggableId={portfolio.id} index={idx}>
  //                   {(provided, snapshot) => (
  //                     <Grid
  //                       ref={provided.innerRef}
  //                       {...provided.draggableProps}
  //                       {...provided.dragHandleProps}
  //                       item
  //                       xs={12}
  //                       className={classes.portfolio}
  //                     >
  //                       {/*
  //                        * PORTFOLIO CARD: Need to change portfolioId to appropriate Id
  //                        */}
  //                       <PortfolioCard
  //                         portfolioId={portfolio.id}
  //                         title={portfolio.title}
  //                         description={portfolio.description}
  //                         viewPortfolio={handleView}
  //                         editPortfolio={handleEdit}
  //                         deletePortfolio={handleClick}
  //                       />
  //                     </Grid>
  //                   )}
  //                 </Draggable>
  //               </CSSTransition>
  //             ))}
  //           </TransitionGroup>
  //           {provided.placeholder}
  //         </Grid>
  //       )}
  //     </Droppable>
  //     {deleteDialog}
  //   </Grid>
  // )

  return (
    <Grid item>
      <Grid container>
        <TransitionGroup style={{ width: '100%', height: '100%' }}>
          {portfolios.map((portfolio, idx) => (
            <CSSTransition key={portfolio.id} classNames='fade' timeout={500}>
              <Grid key={idx} item xs={12} className={classes.portfolio}>
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
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Grid>
      {deleteDialog}
    </Grid>
  )
}

export default withStyles(transitions)(DraggablePortfolioList)
