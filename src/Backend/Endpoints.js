const BACKEND = 'http://localhost:3000'
// const BACKEND = 'https://bitshift-backend.herokuapp.com'

const AUTHENTICATE = '/cognito/authenticate'
const LOGGEDIN = '/cognito/loggedin'

const SIGNUP = '/addUser'
const GET_USER = '/getUser'
const USERS = '/users'

const PORTFOLIOS = '/portfolios'

const PAGES = '/pages'

module.exports = {
  BACKEND,
  AUTHENTICATE,
  LOGGEDIN,
  SIGNUP,
  PORTFOLIOS,
  GET_USER,
  USERS,
  PAGES
}
