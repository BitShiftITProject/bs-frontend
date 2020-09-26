const BACKEND = `${process.env.BACKEND}`

const AUTHENTICATE = '/cognito/authenticate'
const SIGNUP = '/addUser'
const LOGGEDIN = '/cognito/loggedin'

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
