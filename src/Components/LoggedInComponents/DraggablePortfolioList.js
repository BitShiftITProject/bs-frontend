import React from 'react'
import { Grid } from '@material-ui/core'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PortfolioCard from './PortfolioCard'
import { BACKEND, USERS, PORTFOLIOS } from '../../Backend/Endpoints'
import { useHistory } from 'react-router-dom'

const DraggablePortfolioList = ({ portfolios, setPortfolios }) => {
  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  async function handleView(portfolioId) {
    let portfolioIndex = 0
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

    while (portfolioId !== user.portfolios[portfolioIndex]) {
      portfolioIndex++
    }

    history.push(`/public/${emailId}/${portfolioIndex}/0`)
  }

  function handleEdit(portfolioId) {
    // Set portfolioId in session storage so EditPortfolioPage will fetch
    // portfolio from DB based on this ID
    window.sessionStorage.setItem('portfolioId', portfolioId)
    history.push('/portfolios/edit')
  }

  async function handleDelete(portfolioId) {
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

    const newPortfolios = user.portfolios.filter((p) => p !== portfolioId)
    const patchDetails = { portfolios: newPortfolios }

    fetch(BACKEND + USERS + '/' + emailId, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(patchDetails)
    })
      .then((response) => {
        if (response.ok) {
          setPortfolios(newPortfolios)
          fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
            method: 'DELETE',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
              'Content-type': 'application/json'
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
