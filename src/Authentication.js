import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/LoggedOutComponents/Login'
import Signup from './components/LoggedOutComponents/Signup'
import ForgotPassword from './components/LoggedOutComponents/ForgotPassword'
import PublicPortfolio from './components/LoggedOutComponents/PublicPortfolio'
import PublicPortfolioFailed from './components/LoggedOutComponents/PublicPortfolioFailed'

// import HomePage from './components/LoggedInComponents/HomePage'
import EditProfilePage from './components/LoggedInComponents/EditProfilePage'
import PortfolioList from './components/LoggedInComponents/PortfolioList'
import AddPortfolioPage from './components/LoggedInComponents/AddPortfolioPage'
import EditPortfolioPage from './components/LoggedInComponents/EditPortfolioPage'
import SettingsPage from './components/LoggedInComponents/SettingsPage'
import HelpPage from './components/LoggedInComponents/HelpPage'
import Sidebar from './components/LoggedInComponents/Sidebar'
import { getUser, logout } from './backend/Fetch'

async function loggedIn() {
  // Get access token from session storage
  const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')

  // If there is no access token in session storage then we are not logged in
  if (!accessToken || accessToken === 'undefined') {
    sessionStorage.removeItem('accessToken')
    localStorage.removeItem('accessToken')
    return false
  } else {
    /**
     * There is an access token in session storage
     * POST access token to the backend to check if we are logged in
     */

    const user = await getUser()

    if (!user) {
      logout()
      return false
    } else {
      return true
    }
  }
}

class Authentication extends Component {
  state = { loggedIn: false }
  // state = { loggedIn: true }

  async componentDidMount() {
    let logincheck = await loggedIn()
    this.setState({ loggedIn: logincheck })
  }

  render() {
    if (this.state.loggedIn == null) {
      // Route for loading page while getting if the user is logged in
      return <p>Loading</p>
    } else if (this.state.loggedIn === true) {
      // Route for pages accessible when logged in
      console.log('Logged In!')
      return (
        <Switch>
          <Route exact path='/publicfailed' component={PublicPortfolioFailed} />
          <Route exact path='/public/:username/:portfolio/:page' component={PublicPortfolio} />
          <Route exact path='/settings' render={() => <SettingsPage />} />
          <Route exact path='/help' render={() => <HelpPage />} />
          <Route exact path='/portfolios/edit' render={() => <EditPortfolioPage />} />
          <Route exact path='/portfolios/add' render={() => <AddPortfolioPage />} />
          <Route
            exact
            path='/portfolios'
            render={() => <Sidebar content={<PortfolioList xs={12} md={12} lg={12} />} />}
          />
          <Route exact path='/profile' render={() => <EditProfilePage />} />
          {/* <Route exact path='/home' render={() => <HomePage />} /> */}
          <Redirect to='/portfolios' />
        </Switch>
      )
    } else if (this.state.loggedIn === false) {
      // Route for pages accessible when not logged in

      console.log('Not logged in!')
      return (
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route exact path='/publicfailed' component={PublicPortfolioFailed} />
          <Route exact path='/public/:username/:portfolio/:page' component={PublicPortfolio} />
          <Redirect from='/public/:username' to='/public/:username/0/0' />

          <Redirect to='/login' />
        </Switch>
      )
    }
  }
}

export default Authentication
