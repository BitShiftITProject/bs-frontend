import {
  BACKEND,
  FORGOTPASSWORD,
  CHANGEPASSWORD,
  AUTHENTICATE,
  GET_USER,
  USERS,
  PORTFOLIOS,
  PAGES,
  SIGNUP,
  MEDIA_ITEM,
  BUCKETS
} from './Endpoints'

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
/*                        Login / Signup / Forgot Password                    */
/* -------------------------------------------------------------------------- */

// Creates a user in Cognito and in the database using the user details
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

// Authenticates a user in Cognito
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

// Sends a confirmation code to the given user's email
export const sendConfirmationCode = async (email) => {
  const body = {
    Email: email
  }
  const response = await fetch(BACKEND + FORGOTPASSWORD, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(body)
  })
  return response
}

// Resets password given a confirmation code
export const resetPassword = async (authDetails) => {
  const response = await fetch(BACKEND + CHANGEPASSWORD, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify(authDetails)
  })
  return response
}

// "Logs out" a user by clearing the access token and redirecting the user to
// the landing page
export const logout = () => {
  sessionStorage.removeItem('accessToken')
  localStorage.removeItem('accessToken')
  window.location.href = '/'
}

/* -------------------------------------------------------------------------- */
/*                                User Methods                                */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- GET ---------------------------------- */

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

/* ---------------------------------- PATCH --------------------------------- */

// Patches the currently logged-in user with the details to patch the user with
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

/* ----------------------------------- GET ---------------------------------- */

// Fetches a single Portfolio object given its portfolio ID, already JSON-parsed
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

// Given the username of a user, returns a list of that user's Portfolio
// objects, already JSON-parsed
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

  // Returns null if there was an error
  if (!response) return null

  const portfolios = await response.json()

  // Returns the list of portfolios otherwise
  return portfolios
}

/* ---------------------------------- POST ---------------------------------- */

// Adds a portfolio to the database, where the portfolio's details are inside postDetails
export const postPortfolio = async (postDetails) => {
  const response = await fetch(BACKEND + PORTFOLIOS, {
    method: 'POST',
    headers,
    body: JSON.stringify(postDetails)
  })

  return response
}

// Adds a portfolio to be owned by a user
export const postPortfolioToUser = async (username, postDetails) => {
  const response = await fetch(BACKEND + USERS + '/' + username + PORTFOLIOS, {
    method: 'POST',
    headers,
    body: JSON.stringify(postDetails)
  })

  return response
}

/* ---------------------------------- PATCH --------------------------------- */

// Changes a portfolio with the portfolioId, where the changes are outlined in patchDetails
export const patchPortfolio = async (portfolioId, patchDetails) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(patchDetails)
  })

  return response
}

/* --------------------------------- DELETE --------------------------------- */

// Deletes a portfolio from the Portfolio DB. Since a user is related to the
// portfolios in a hasMany relationship, deleting the portfolio from the DB will
// immediately delete any "reference" the user has to the portfolio.
export const deletePortfolio = async (portfolioId) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
    method: 'DELETE',
    headers
  })

  return response
}

// Deletes all portfolios whose owner is the current logged-in user
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

/* ----------------------------------- GET ---------------------------------- */

// Gets a single Page object from the Page DB, already JSON-parsed
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

// Returns a list of all the Page objects belonging to a portfolio
// whose ID is the portfolioId argument
export const getPortfolioPages = async (portfolioId) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId + PAGES, {
    method: 'GET',
    headers
  })

  const pages = await response.json()

  return pages
}

/* ---------------------------------- POST ---------------------------------- */

// Adds a page to a portfolio whose ID is portfolioId. The page's details
// are outlined in the postDetails argument.
export const postPageToPortfolio = async (portfolioId, postDetails) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId + PAGES, {
    method: 'POST',
    headers,
    body: JSON.stringify(postDetails)
  })

  return response
}

/* ---------------------------------- PATCH --------------------------------- */

// Edits a page whose ID is pageId, with changes outlined in patchDetails
export const patchPage = async (pageId, patchDetails) => {
  const response = await fetch(BACKEND + PAGES + '/' + pageId, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(patchDetails)
  })

  return response
}

/* --------------------------------- DELETE --------------------------------- */

// Deletes the page whose ID is pageId from the DB. Automatically deletes any
// reference to this page in the portfolio that it belongs to.
export const deletePage = async (pageId) => {
  const response = await fetch(BACKEND + PAGES + '/' + pageId, {
    method: 'DELETE',
    headers
  })

  return response
}

// Deletes all pages belonging to a portfolio whose ID is portfolioId
export const deleteAllPortfolioPages = async (portfolioId) => {
  const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId + PAGES, {
    method: 'DELETE',
    headers
  })

  return response
}

/* -------------------------------------------------------------------------- */
/*                                Media Methods                               */
/* -------------------------------------------------------------------------- */

/* ----------------------------------- GET ---------------------------------- */
// gets all the Media Items for a given user
export const getMediaItems = async (username) => {
  const response = await fetch(BACKEND + USERS + '/' + username + MEDIA_ITEM, {
    method: 'GET',
    headers
  })
    .then((response) => (response.ok ? response : null))
    .catch(() => {
      return null
    })

  if (!response) return null

  const mediaItems = await response.json()

  return mediaItems
}

// gets specific Media Items for a given user
export const getMediaItem = async (key) => {
  const response = await fetch(BACKEND + MEDIA_ITEM + '/' + key, {
    method: 'GET',
    headers
  })
    .then((response) => (response.ok ? response : null))
    .catch(() => {
      return null
    })

  if (!response) return null

  const mediaItem = await response.json()

  return mediaItem
}

// gets all the Media Items for a given user
export const getDataUrl = async (key) => {
  const response = await fetch(BACKEND + BUCKETS + '/' + key, {
    method: 'GET',
    headers
  })
    .then((response) => (response.ok ? response : null))
    .catch(() => {
      return null
    })

  if (!response) return null

  return await getMediaItem(key).then(async (item) => {
    const file = await response.json().then((response) => {
      if (item != null) {
        let buf = Buffer.from(response.Body.data)
        let base64 = buf.toString()

        return 'data:' + item.file_type + ';base64,' + base64
      } else {
        return null
      }
    })
    return file
  })
}

export const getFile = async (key) => {
  const response = await fetch(BACKEND + BUCKETS + '/' + key, {
    method: 'GET',
    headers
  })
    .then((response) => (response.ok ? response : null))
    .catch(() => {
      return null
    })

  if (!response) return null

  return await getMediaItem(key).then(async (item) => {
    if (item != null) {
      const file = await response.json().then(async (response) => {
        let buf = Buffer.from(response.Body.data)
        let base64 = buf.toString()

        return await fetch('data:' + item.file_type + ';base64,' + base64)
          .then((res) => res.blob())
          .then((blob) => {
            return new File([blob], item.public_name, { type: item.file_type })
          })
      })
      return file
    } else {
      return null
    }
  })
}

/* ----------------------------------- POST ---------------------------------- */
// Adds a media item to a user
export const postMediaContent = async (username, postDetails) => {
  const response = await fetch(BACKEND + USERS + '/' + username + MEDIA_ITEM, {
    method: 'POST',
    headers,
    body: JSON.stringify(postDetails)
  })

  return response
}

/* ----------------------------------- DELETE ---------------------------------- */

export const deleteMediaItem = async (key) => {
  const response = await fetch(BACKEND + MEDIA_ITEM + '/' + key, {
    method: 'DELETE',
    headers
  })

  return response
}
