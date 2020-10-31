import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { makeStyles } from '@material-ui/core/styles'

import Loading from './Components/CommonComponents/Loading'

import LandingPage from './Components/LoggedOutComponents/LandingPage'
import Login from './Components/LoggedOutComponents/Login'
import Signup from './Components/LoggedOutComponents/Signup'
import ForgotPassword from './Components/LoggedOutComponents/ForgotPassword'

import EditProfilePage from './Components/LoggedInComponents/Profile/EditProfilePage'
import PortfolioListPage from './Components/LoggedInComponents/PortfolioList/PortfolioListPage'
import AddPortfolioPage from './Components/LoggedInComponents/PortfolioList/AddPortfolioPage'
import EditPortfolioPage from './Components/LoggedInComponents/PortfolioEdit/EditPortfolioPage'
import SettingsPage from './Components/LoggedInComponents/SettingsPage'
import HelpPage from './Components/LoggedInComponents/HelpPage'
import Sidebar from './Components/LoggedInComponents/Sidebar'

import { logout } from './Backend/Fetch'
import useUser from './Hooks/useUser'

// async function isLoggedIn() {
//   // Get access token from session storage
//   const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')

//   // If there is no access token in session storage then we are not logged in
//   if (!accessToken || accessToken === 'undefined') {
//     sessionStorage.removeItem('accessToken')
//     localStorage.removeItem('accessToken')
//     return false
//   } else {
//     /**
//      * There is an access token in session storage
//      * POST access token to the backend to check if we are logged in
//      */

//     const user = await getUser()

//     if (!user) {
//       logout()
//       return false
//     } else {
//       return true
//     }
//   }
// }

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: `${theme.palette.success.main} !important`,
    color: `${theme.palette.success.contrastText} !important`
  },
  error: {
    backgroundColor: `${theme.palette.error.main} !important`,
    color: `${theme.palette.error.contrastText} !important`
  },
  warning: {
    backgroundColor: `${theme.palette.warning.main} !important`,
    color: `${theme.palette.warning.contrastText} !important`
  },
  info: {
    backgroundColor: `${theme.palette.info.main} !important`,
    color: `${theme.palette.info.contrastText} !important`
  }
}))

function Authentication() {
  /* -------------------------------------------------------------------------- */
  /*                             Current Login State                            */
  /* -------------------------------------------------------------------------- */

  const [loggedIn, setLoggedIn] = useState(null)
  const { status: userStatus } = useUser()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')

    if (userStatus === 'loading') {
      setLoggedIn(null)
      // console.log('User LOADING')
    } else if (userStatus === 'error' || !accessToken || accessToken === 'undefined') {
      setLoggedIn(false)
      logout({ noReload: true })
      // console.log('User FAILED')
    } else if (userStatus === 'success') {
      setLoggedIn(true)
      // console.log('User SUCCESS')
    }

    // console.log('End of useEffect')
  }, [userStatus])

  /* -------------------------------------------------------------------------- */
  /*                               Snackbar Styles                              */
  /* -------------------------------------------------------------------------- */

  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Routes                                   */
  /* -------------------------------------------------------------------------- */

  if (loggedIn == null) {
    // Route for loading page while getting if the user is logged in
    return (
      <div style={{ height: '100vh' }}>
        <Loading vertical />
      </div>
    )
  } else if (loggedIn === true) {
    // Route for pages accessible when logged in
    return (
      <SnackbarProvider
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
          variantInfo: classes.info
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={1750}
      >
        <Switch>
          <Route exact path='/settings' render={() => <SettingsPage />} />
          <Route exact path='/help' render={() => <HelpPage />} />
          <Route exact path='/portfolios/edit' render={() => <EditPortfolioPage />} />
          <Route exact path='/portfolios/add' render={() => <AddPortfolioPage />} />

          <Route
            exact
            path='/portfolios'
            render={() => <Sidebar content={<PortfolioListPage xs={12} md={12} lg={12} />} />}
          />
          <Route exact path='/profile' render={() => <EditProfilePage />} />
          {/* <Route exact path='/home' render={() => <HomePage />} /> */}
          <Redirect to='/portfolios' />
        </Switch>
      </SnackbarProvider>
    )
  } else if (loggedIn === false) {
    // Route for pages accessible when not logged in

    return (
      <SnackbarProvider
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
          variantInfo: classes.info
        }}
      >
        <Switch>
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/signup' render={() => <Signup />} />
          <Route exact path='/forgotpassword' render={() => <ForgotPassword />} />
          <Route exact path='/' render={() => <LandingPage />} />
          <Redirect to='/' />
        </Switch>
      </SnackbarProvider>
    )
  }
}

export default Authentication
