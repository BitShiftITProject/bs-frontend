//const BACKEND = "http://localhost:3000";
const BACKEND = 'https://bitshift-backend.herokuapp.com'

const FORGOTPASSWORD = '/cognito/forgotpassword'
const CHANGEPASSWORD = '/cognito/changepassword'
const AUTHENTICATE = '/cognito/authenticate'
const LOGGEDIN = '/cognito/loggedin'

const SIGNUP = '/addUser'
const GET_USER = '/getUser'
const USERS = '/users'

const PORTFOLIOS = '/portfolios'

const PAGES = '/pages'
const MEDIA_ITEM = '/media-items'
const BUCKETS = '/buckets'

module.exports = {
  BACKEND,
  FORGOTPASSWORD,
  CHANGEPASSWORD,
  AUTHENTICATE,
  LOGGEDIN,
  SIGNUP,
  PORTFOLIOS,
  GET_USER,
  USERS,
  PAGES,
  MEDIA_ITEM,
  BUCKETS
}
