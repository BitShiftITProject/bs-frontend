import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { BACKEND, LOGGEDIN } from './Endpoints'

import Login from './Components/LoggedOutComponents/Login'
import Signup from './Components/LoggedOutComponents/Signup'
import ForgotPassword from './Components/LoggedOutComponents/ForgotPassword'

import HomePage from './Components/LoggedInComponents/HomePage'
import EditProfilePage from './Components/LoggedInComponents/EditProfilePage'
import PortfolioCardList from './Components/LoggedInComponents/PortfolioCardList'
import AddPortfolioPage from './Components/LoggedInComponents/AddPortfolioPage'
import EditPortfolioPage from './Components/LoggedInComponents/EditPortfolioPage'
import SettingsPage from './Components/LoggedInComponents/SettingsPage'
import HelpPage from './Components/LoggedInComponents/HelpPage'
import Sidebar from './Components/LoggedInComponents/Sidebar'

async function loggedIn() {
  // Get access token from session storage
  // const accessToken = window.sessionStorage.getItem('accessToken')

  // // If there is no access token in session storage then we are not logged in
  // if (accessToken == null) {
  //   return false
  // } else {
  //   /**
  //    * There is an access token in session storage
  //    * POST access token to the backend to check if we are logged in
  //    */
  //   return fetch(BACKEND + LOGGEDIN, {
  //     method: 'POST',
  //     headers: { 'Content-type': 'application/json' },
  //     body: JSON.stringify({ access_token: accessToken })
  //   }).then((response) => {
  //     // If we get back status 200 we are logged in
  //     if (response.ok) {
  //       return true
  //     }
  //     // Otherwise we are not logged in
  //     else {
  //       return false
  //     }
  //   })
  // }

  const emailId = window.sessionStorage.getItem('emailId') || null
  return emailId ? true : false
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
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/settings' render={() => <SettingsPage />} />
            <Route exact path='/help' render={() => <HelpPage />} />
            <Route exact path='/portfolios/edit' render={() => <EditPortfolioPage />} />
            <Route exact path='/portfolios/add' render={() => <AddPortfolioPage />} />
            <Route
              exact
              path='/portfolios'
              render={() => <Sidebar content={<PortfolioCardList xs={12} md={12} lg={12} />} />}
            />
            <Route exact path='/profile' render={() => <EditProfilePage />} />
            <Route exact path='/home' render={() => <HomePage />} />
            <Redirect to='/home' />
          </Switch>
        </BrowserRouter>
      )
    } else if (this.state.loggedIn === false) {
      // Route for pages accessible when not logged in
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />

            <Redirect to='/login' />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

export default Authentication
