import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import Login from './Components/LoggedOutComponents/Login'
import Signup from './Components/LoggedOutComponents/Signup'
import ForgotPassword from './Components/LoggedOutComponents/ForgotPassword'
import Landing from './Components/LoggedOutComponents/Landing'

import HomePage from './Components/LoggedInComponents/HomePage'

import { BACKEND, LOGGEDIN } from './Endpoints'
import EditProfilePage from './Components/LoggedInComponents/EditProfilePage/EditProfilePage'
import Sidebar from './Components/LoggedInComponents/Sidebar'

async function loggedIn() {
  // Get access token from session storage
  const accessToken = window.sessionStorage.accessToken

  // If there is no access token in session storage then we are not logged in
  if (accessToken == null) {
    return false
  } else {
    // There is an access token in session storage
    // POST access token to the backend to check if we are logged in
    return fetch(BACKEND + LOGGEDIN, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ access_token: accessToken }),
    }).then((response) => {
      // If we get back status 200 we are logged in
      if (response.ok) {
        return true
      }
      // Otherwise we are not logged in
      else {
        return false
      }
    })
  }
}

// Keep all == as is

class Authentication extends Component {
  state = { loggedIn: false }

  async componentDidMount() {
    // let logincheck = await loggedIn()
    // this.setState({ loggedIn: logincheck })
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
            <Route
              exact
              path='/home/profile'
              render={() => <Sidebar content={<EditProfilePage />} />}
            />
            <Route exact path='/home' render={() => <Sidebar content={<HomePage />} />} />
            <Redirect to='/home' />
          </Switch>
        </BrowserRouter>
      )
    } else if (this.state.loggedIn === false) {
      // Route for pages accessible when not logged in
      return (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/login'
              render={(routeProps) => <Landing content={<Login {...routeProps} />} />}
            />
            <Route
              exact
              path='/signup'
              render={(routeProps) => <Landing content={<Signup {...routeProps} />} />}
            />
            <Route
              exact
              path='/forgotpassword'
              render={() => <Landing content={<ForgotPassword />} />}
            />
            <Route exact path='/landing' render={() => <Landing />} />
            <Route
              exact
              path='/'
              render={() => {
                return (
                  <div>
                    <div>
                      <Link to='/login'>Login</Link>
                    </div>
                    <div>
                      <Link to='/signup'>Signup</Link>
                    </div>
                    <div>
                      <Link to='/forgotpassword'>Forgot Password</Link>
                    </div>
                  </div>
                )
              }}
            />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

export default Authentication
