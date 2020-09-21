import React from 'react'
import { Grid } from '@material-ui/core'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PortfolioCard from './PortfolioCard'
import { BACKEND, USERS, PORTFOLIOS } from '../../Backend/Endpoints'
import { fetchPortfolio } from '../../Backend/fetch'
import { useHistory } from 'react-router-dom'

const DraggablePortfolioList = ({ portfolios, setPortfolios }) => {
  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  async function handleView(portfolioId) {
    // Get the current user
    const emailId = window.sessionStorage.getItem('emailId')

    const user = await fetch(BACKEND + USERS + '/' + emailId, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .catch((error) => {
        console.log(error)
      })

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
    const emailId = window.sessionStorage.getItem('emailId')
    const patchDetails = { portfolios: newPortfolioIds }
    const patchResponse = await fetch(BACKEND + USERS + '/' + emailId, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(patchDetails)
    }).catch((error) => console.log('Error: User portfolios NOT patched!'))

    if (patchResponse.ok) {
      // Delete the portfolio from the portfolio DB
      const deleteResponse = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-type': 'application/json'
        }
      }).catch((error) => console.log('Error: Portfolio NOT deleted!', error))
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  return (
    <Droppable droppableId='portfoliosDroppable'>
      {(provided, snapshot) => (
        <Grid {...provided.droppableProps} ref={provided.innerRef} container spacing={3}>
          {portfolios.map((portfolio, idx) => (
            <Draggable key={portfolio.id} draggableId={portfolio.id} index={idx}>
              {(provided, snapshot) => (
                <Grid
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  item
                  xs={12}
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
                    deletePortfolio={handleDelete}
                  />
                </Grid>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  )
}

export default DraggablePortfolioList
