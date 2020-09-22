import { BACKEND, USERS, PORTFOLIOS, PAGES } from './Endpoints'

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

// TODO: Make compatible with JWT
const emailId = window.sessionStorage.getItem('emailId')
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-type': 'application/json'
}

/* -------------------------------------------------------------------------- */
/*                                User Methods                                */
/* -------------------------------------------------------------------------- */

// Fetches the current User object, temporarily using the emailId item saved in the
// session storage when the user logs in
export const getUser = async () => {
  const response = await fetch(BACKEND + USERS + '/' + emailId, {
    method: 'GET',
    headers
  })
  const user = await response.json()
  return user
}

// Fetches
export const patchUser = async (patchDetails) => {
  const response = await fetch(BACKEND + USERS + '/' + emailId, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(patchDetails)
  })

  return response
}

/* -------------------------------------------------------------------------- */
/*                              Portfolio Methods                             */
/* -------------------------------------------------------------------------- */

// Fetches a single Portfolio object given its portfolio ID
export const getPortfolio = async (portfolioId) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
    method: 'GET',
    headers
  })

  const portfolio = await response.json()

  return portfolio
}

export const postPortfolio = async (postDetails) => {
  const response = await fetch(BACKEND + PORTFOLIOS, {
    method: 'POST',
    headers,
    body: JSON.stringify(postDetails)
  })

  return response
}

export const patchPortfolio = async (portfolioId, patchDetails) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(patchDetails)
  })

  return response
}

export const deletePortfolio = async (portfolioId) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
    method: 'DELETE',
    headers
  })

  return response
}

/* -------------------------------------------------------------------------- */
/*                                Pages Methods                               */
/* -------------------------------------------------------------------------- */

// TODO: Use actual endpoints for pages (not created yet)

export const getPage = async (pageId) => {
  const response = await fetch(BACKEND + PAGES + '/' + pageId, {
    method: 'GET',
    headers
  })

  const page = await response.json()

  return page
}

export const postPage = async (postDetails) => {
  const response = await fetch(BACKEND + PAGES, {
    method: 'POST',
    headers,
    body: JSON.stringify(postDetails)
  })

  return response
}
export const patchPage = async (pageId, patchDetails) => {
  const response = await fetch(BACKEND + PAGES + '/' + pageId, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(patchDetails)
  })

  return response
}

export const deletePage = async (pageId) => {
  const response = await fetch(BACKEND + PAGES + '/' + pageId, {
    method: 'DELETE',
    headers
  })

  return response
}
