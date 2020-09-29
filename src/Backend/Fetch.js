import { BACKEND, AUTHENTICATE, GET_USER, USERS, PORTFOLIOS, PAGES, SIGNUP } from './Endpoints'

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${accessToken}`
}

/* -------------------------------------------------------------------------- */
/*                               Login / Signup                               */
/* -------------------------------------------------------------------------- */

//
export const signupCheck = async (signUpDetails) => {
  const response = await fetch(BACKEND + SIGNUP, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(signUpDetails)
  })
  return response
}

export const authenticate = async (loginDetails) => {
  const response = await fetch(BACKEND + AUTHENTICATE, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(loginDetails)
  })
  return response
}

export const logout = () => {
  sessionStorage.removeItem('accessToken')
  localStorage.removeItem('accessToken')
  window.location.href = '/login'
}

/* -------------------------------------------------------------------------- */
/*                                User Methods                                */
/* -------------------------------------------------------------------------- */

// Fetches the current User object, uses the access token saved in the
// session storage when the user logs in
export const getUser = async () => {
  const response = await fetch(BACKEND + GET_USER, {
    method: 'GET',
    headers
  }).catch(() => {
    return null
  })

  if (response && response.ok) {
    const body = await response.json()
    return body[0]
  } else {
    return null
  }
}

export const patchUser = async (patchDetails) => {
  const user = await getUser()

  if (!user) {
    logout()
    return
  }

  const response = await fetch(BACKEND + USERS + '/' + user.username, {
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
    .then((response) => (response.ok ? response : null))
    .catch(() => {
      return null
    })

  if (!response) return null

  const portfolio = await response.json()

  return portfolio
}

export const getUserPortfolios = async (username) => {
  const response = await fetch(BACKEND + USERS + '/' + username + PORTFOLIOS, {
    method: 'GET',
    headers
  })
    .then((response) => {
      if (response.ok) return response
      return null
    })
    .catch(() => null)

  return response
}

export const postPortfolio = async (postDetails) => {
  const response = await fetch(BACKEND + PORTFOLIOS, {
    method: 'POST',
    headers,
    body: JSON.stringify(postDetails)
  })

  return response
}

export const postPortfolioToUser = async (username, postDetails) => {
  const response = await fetch(BACKEND + USERS + '/' + username + PORTFOLIOS, {
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

export const deleteAllUserPortfolios = async () => {
  const user = await getUser()

  if (!user) {
    logout()
    return
  }

  const response = await fetch(BACKEND + USERS + '/' + user.username + PORTFOLIOS, {
    method: 'DELETE',
    headers
  })

  return response
}

/* -------------------------------------------------------------------------- */
/*                                Pages Methods                               */
/* -------------------------------------------------------------------------- */

export const getPage = async (pageId) => {
  const response = await fetch(BACKEND + PAGES + '/' + pageId, {
    method: 'GET',
    headers
  })
    .then((response) => (response.ok ? response : null))
    .catch(() => {
      return null
    })

  if (!response) return null

  const page = await response.json()

  return page
}

export const getPortfolioPages = async (portfolioId) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId + PAGES, {
    method: 'GET',
    headers
  })

  const pages = await response.json()

  return pages
}

export const postPageToPortfolio = async (portfolioId, postDetails) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId + PAGES, {
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

export const deleteAllPortfolioPages = async (portfolioId) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId + PAGES, {
    method: 'DELETE',
    headers
  })

  return response
}
