// Fetches the current User object, temporarily using the emailId item saved in the
// session storage when the user logs in
export const fetchUser = async () => {
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
export const fetchPortfolio = async (portfolioId) => {
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
